const express = require("express");
const mongoose = require("mongoose");
const Mood = require("../models/mood.model");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get moods for a user (must match JWT userId)
router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const moods = await Mood.find({ userId }).sort({ timestamp: -1 });
    res.json({ success: true, moods });
  } catch (err) {
    console.error("Error fetching moods:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit a new mood
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { userId, mood, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Optional: Check if mood is one of your allowed values
    const allowedMoods = ['😊 Happy', '😐 Neutral', '☹️ Sad', '😟 Anxious'];
    if (!allowedMoods.includes(mood)) {
      return res.status(400).json({ message: "Invalid mood value" });
    }

    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const newMood = new Mood({
      userId: mongoose.Types.ObjectId(userId),
      mood,
      notes,
      timestamp: new Date(),
    });

    const savedMood = await newMood.save();
    res.status(201).json({ success: true, mood: savedMood });
  } catch (err) {
    console.error("Mood save error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
