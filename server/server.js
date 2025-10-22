// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

// App setup
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
})();

// User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Auth Middleware (can be moved to ./middleware/auth.js)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token." });
    req.user = decoded; // contains userId
    next();
  });
};

// Default API Route
app.get("/", (req, res) => {
  res.send("✅ Calmana backend is running!");
});

// ===== AUTH ROUTES =====

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      username: newUser.username,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Logged-In User
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("User fetch error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ===== ROUTES IMPORTS =====
const moodRoutes = require("./routes/mood.routes");
const diaryRoutes = require("./routes/diary.routes");

// ===== USE ROUTES =====
app.use("/api/moods", moodRoutes);
app.use("/api/diary", diaryRoutes);

// ===== DOCTOR SEARCH =====
app.get("/api/doctors", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng)
      return res.status(400).json({ message: "Latitude and longitude are required." });

    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const params = {
      location: `${lat},${lng}`,
      radius: 5000,
      type: "doctor",
      keyword: "mental health",
      key: GOOGLE_API_KEY,
    };

    const response = await axios.get(url, { params });
    const doctors = response.data.results.map((result) => ({
      name: result.name,
      address: result.vicinity,
      rating: result.rating || "N/A",
      place_id: result.place_id,
    }));

    res.json(doctors);
  } catch (error) {
    console.error("Doctors search error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error fetching doctors",
      error: error.response?.data || error.message,
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
