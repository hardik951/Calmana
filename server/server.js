const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Add axios for HTTP requests
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "your-default-mongo-uri";
const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "your-default-google-api-key"; // Match .env key name

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

// --- Doctors Search Route ---
app.get("/api/doctors", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and longitude are required." });
    }

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = {
      location: `${lat},${lng}`,
      radius: 5000,
      type: 'doctor',
      keyword: 'mental health',
      key: GOOGLE_API_KEY
    };

    const response = await axios.get(url, { params });
    const doctors = response.data.results.map(result => ({
      name: result.name,
      address: result.vicinity,
      rating: result.rating || 'N/A',
      place_id: result.place_id
    }));

    res.json(doctors);
  } catch (error) {
    console.error("Doctors search error:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error fetching doctors", error: error.response ? error.response.data : error.message });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

console.log("🔑 MONGO_URI:", process.env.MONGO_URI);
console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🌐 GOOGLE_MAPS_API_KEY:", process.env.GOOGLE_MAPS_API_KEY); // Log the correct env variable name