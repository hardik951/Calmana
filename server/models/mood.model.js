import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  mood: { type: String, required: true },
  notes: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
