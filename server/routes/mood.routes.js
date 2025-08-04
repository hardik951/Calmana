// routes/mood.routes.js
const express = require("express");
const router = express.Router();
const Mood = require("../models/mood.models"); // ✅ Import ONLY

// --- POST Mood Entry ---
router.post("/", async (req, res) => {
  try {
    const { userId, mood, notes } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ message: "userId and mood are required" });
    }

    const newMood = new Mood({ userId, mood, notes });
    await newMood.save();

    res.status(201).json({ message: "Mood saved successfully", mood: newMood });
  } catch (err) {
    console.error("Error saving mood:", err.message);
    res.status(500).json({ message: "Failed to save mood", error: err.message });
  }
});

// --- GET Mood History by User ID ---
router.get("/:userId", async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    console.error("Error fetching moods:", err.message);
    res.status(500).json({ message: "Failed to fetch moods", error: err.message });
  }
});

module.exports = router;
