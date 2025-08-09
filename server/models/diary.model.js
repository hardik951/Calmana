import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, default: "" },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Diary = mongoose.model("Diary", diarySchema);
export default Diary;
