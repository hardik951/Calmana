// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --- User Schema ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// --- Mood Schema ---
const moodSchema = new mongoose.Schema({
    mood: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
const MoodEntry = mongoose.model("MoodEntry", moodSchema);

// --- Routes ---
app.get("/", (req, res) => {
    res.send("✅ Calmana backend is running!");
});

// --- Signup ---
app.post("/api/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// --- Login ---
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// --- Mood Entry ---
app.post("/api/mood", async (req, res) => {
    try {
        const { mood, userId } = req.body;

        if (!mood || !userId) {
            return res.status(400).json({ message: "Mood and userId are required." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        const newMood = new MoodEntry({ mood, user: userId });
        await newMood.save();

        res.status(201).json({ message: "Mood entry saved", moodEntry: newMood });
    } catch (err) {
        res.status(500).json({ message: "Error saving mood", error: err.message });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
