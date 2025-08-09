import express from "express";
import Mood from "../models/mood.model.js";
import Diary from "../models/diary.model.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Security check: userId in token must match param userId
    if (req.user.userId !== userId) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const moods = await Mood.find({ userId })
      .sort({ timestamp: -1 }) // use timestamp for moods
      .limit(5);

    const diaries = await Diary.find({ userId })
      .sort({ date: -1 }) // use date for diaries
      .limit(5);

    res.json({ success: true, moods, diaries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
