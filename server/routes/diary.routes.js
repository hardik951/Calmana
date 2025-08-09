const express = require("express");
const mongoose = require("mongoose");
const Diary = require("../models/diary.model");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Add a new diary entry
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }
    if (req.user.userId !== userId) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    const newDiary = new Diary({
      userId: mongoose.Types.ObjectId(userId),
      title: title || "",
      content,
      date: new Date(),
    });

    await newDiary.save();
    res.status(201).json({ success: true, diary: newDiary });
  } catch (err) {
    console.error("Error saving diary entry:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all diary entries for a user
router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }
    if (req.user.userId !== userId) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const diaries = await Diary.find({ userId }).sort({ date: -1 });
    res.json({ success: true, diaries });
  } catch (err) {
    console.error("Error fetching diary entries:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
