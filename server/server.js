// ================= MULTER =================
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= CORE IMPORTS =================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

// ================= APP SETUP =================
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB CONNECTION =================
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
})();

// ================= MODELS =================

// Patient
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "patient" },
});
const User = mongoose.model("User", userSchema);

// Doctor
const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  license: String,
  aadhaar: String,
  aadhaarImage: String,
  licenseImage: String,
  role: { type: String, default: "doctor" },
  isVerified: { type: Boolean, default: false },
});
const Doctor = mongoose.model("Doctor", doctorSchema);

// ================= AUTH MIDDLEWARE =================
const authenticateToken = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ message: "Access denied" });
    req.user = decoded;
    next();
  });
};

// ================= DEFAULT =================
app.get("/", (req, res) => {
  res.send("✅ CALMANA backend running");
});

// ================= PATIENT AUTH =================
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists." });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  const token = jwt.sign({ id: user._id, role: "patient" }, JWT_SECRET);
  res.json({ token });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials." });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials." });

  const token = jwt.sign({ id: user._id, role: "patient" }, JWT_SECRET);
  res.json({ token });
});

// ================= 🔥 DOCTOR SIGNUP (FIXED) =================
app.post(
  "/api/doctor/signup",
  upload.fields([
    { name: "aadhaarImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

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
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!req.files?.aadhaarImage || !req.files?.licenseImage) {
        return res
          .status(400)
          .json({ message: "Documents are required." });
      }

      const exists = await Doctor.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Doctor exists." });

      const hashed = await bcrypt.hash(password, 10);

      await Doctor.create({
        name,
        email,
        password: hashed,
        specialization,
        license,
        aadhaar,
        aadhaarImage: req.files.aadhaarImage[0].path,
        licenseImage: req.files.licenseImage[0].path,
      });

      res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ================= DOCTOR LOGIN =================
app.post("/api/doctor/login", async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) return res.status(400).json({ message: "Invalid credentials." });

  const ok = await bcrypt.compare(password, doctor.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials." });

  const token = jwt.sign({ id: doctor._id, role: "doctor" }, JWT_SECRET);
  res.json({ token });
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
