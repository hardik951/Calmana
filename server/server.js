const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Calmana backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
app.post("/api/mood", (req, res) => {
  const { mood, timestamp } = req.body;

  console.log("✅ Received mood:", mood, "at", timestamp);

  res.json({ message: "Mood received successfully" });
});