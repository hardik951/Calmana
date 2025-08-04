// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "your-default-mongo-uri";
const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --- User Schema & Model ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Optional: Make User model globally accessible
app.locals.User = User;

// --- Default Route ---
app.get("/", (req, res) => {
  res.send("✅ Calmana backend is running!");
});

// --- Signup Route ---
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, userId: newUser._id });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Login Route ---
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Mood Routes ---
const moodRoutes = require("./routes/mood.routes");
app.use("/api/moods", moodRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

console.log("🔑 MONGO_URI:", process.env.MONGO_URI);
console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);
