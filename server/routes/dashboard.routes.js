import express from "express";
import Mood from "../models/mood.model.js";
import Diary from "../models/diary.model.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/feed
 * Returns latest moods + diary entries for the logged-in user
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT

    // Fetch last 5 moods
    const moods = await Mood.find({ userId })
      .sort({ timestamp: -1 })
      .limit(5);

    // Fetch last 5 diary entries
    const diaries = await Diary.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    res.json({ success: true, moods, diaries });
  } catch (err) {
    console.error("Feed fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
