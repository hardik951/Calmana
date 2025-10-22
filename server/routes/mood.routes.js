const express = require("express");
const mongoose = require("mongoose");
const Mood = require("../models/mood.model");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// POST /api/moods/add — Add mood
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { mood, notes } = req.body;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, message: "Invalid user ID" });

    if (!mood?.trim())
      return res.status(400).json({ success: false, message: "Mood is required" });

    const newMood = new Mood({
      userId: new mongoose.Types.ObjectId(userId),
      mood: mood.trim(),
      notes: notes || "",
      timestamp: new Date()
    });

    await newMood.save();
    res.status(201).json({ success: true, mood: newMood });
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/moods — Get moods for logged‑in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.userId }).sort({ timestamp: -1 });
    res.json({ success: true, moods });
  } catch (err) {
    console.error("Error fetching moods:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
