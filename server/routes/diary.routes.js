// routes/diary.routes.js
const express = require("express");
const mongoose = require("mongoose");
const Diary = require("../models/diary.model");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * POST /api/diary/add - Add a new diary entry
 */
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId; // From JWT token

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }
    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    // Fix: Use `new` to create ObjectId explicitly
    const newDiary = new Diary({
      userId: new mongoose.Types.ObjectId(userId),
      title: title || "",
      content: content.trim(),
      date: new Date()
    });

    await newDiary.save();
    res.status(201).json({ success: true, diary: newDiary });
  } catch (err) {
    console.error("Error saving diary entry:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/diary - Fetch all diary entries for logged-in user
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const diaries = await Diary.find({ userId }).sort({ date: -1 });
    res.json({ success: true, diaries });
  } catch (err) {
    console.error("Error fetching diary entries:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
