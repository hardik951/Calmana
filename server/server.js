// ================= MULTER =================
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ================= CORE =================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= DB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ Mongo error", err);
    process.exit(1);
  });

// ================= MODELS =================
const Doctor = require("./models/doctor.model");
const User = require("./models/user.model");
const Appointment = require("./models/appointment.model");

// ================= AUTH MIDDLEWARE =================
const authenticate = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = user;
    next();
  });
};

// ================= DEFAULT =================
app.get("/", (req, res) => {
  res.send("✅ CALMANA backend running");
});


// =======================================================
// ================= PATIENT AUTH ========================
// =======================================================

// PATIENT SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      role: "patient",
    });

    const token = jwt.sign(
      { id: user._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATIENT LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================================
// ================= DOCTOR AUTH =========================
// =======================================================

app.post(
  "/api/doctor/signup",
  upload.fields([
    { name: "aadhaarImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, email, password, specialization, license, aadhaar } =
        req.body;

      if (
        !name ||
        !email ||
        !password ||
        !specialization ||
        !license ||
        !aadhaar
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const exists = await Doctor.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Doctor already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      await Doctor.create({
        name,
        email,
        password: hashedPassword,
        specialization,
        license,
        aadhaar,
        aadhaarImage: req.files.aadhaarImage[0].path,
        licenseImage: req.files.licenseImage[0].path,
        isVerified: true,
      });

      res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

app.post("/api/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, doctor.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================================================
// ================= PATIENT VIEW ========================
// =======================================================

app.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find(
    { isVerified: true },
    "-password -aadhaar -aadhaarImage"
  );
  res.json(doctors);
});


// =======================================================
// ================= APPOINTMENTS ========================
// =======================================================

// PATIENT SENDS REQUEST
app.post(
  "/api/appointments",
  authenticate(["patient"]),
  async (req, res) => {
    const { doctorId, date, time } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });

    res.status(201).json(appointment);
  }
);

// DOCTOR VIEWS REQUESTS
app.get(
  "/api/doctor/appointments",
  authenticate(["doctor"]),
  async (req, res) => {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient", "username email")
      .sort({ createdAt: -1 });

    res.json(appointments);
  }
);

// DOCTOR ACCEPT / REJECT
app.patch(
  "/api/appointments/:id",
  authenticate(["doctor"]),
  async (req, res) => {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(appointment);
  }
);

// PATIENT VIEWS THEIR APPOINTMENTS
app.get(
  "/api/patient/appointments",
  authenticate(["patient"]),
  async (req, res) => {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.json(appointments);
  }
);

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
