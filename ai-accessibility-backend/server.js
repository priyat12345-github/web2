// AI Accessibility App - Backend (Express.js)
// File: server.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable CORS for frontend (localhost:3000)
app.use(cors());

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Dummy product name generator (you can replace this with AI model logic)
const randomNames = [
  "Lays Chips",
];

// API endpoint: POST /api/identify
app.post("/api/identify", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // In real implementation, you can run AI/ML model here.
    // For now, we just return a random name.
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    const detectedName = randomNames[randomIndex];

    console.log(`✅ Image received: ${req.file.originalname}`);
    console.log(`🧩 Predicted: ${detectedName}`);

    res.json({ productName: detectedName });
  } catch (err) {
    console.error("❌ Error identifying product:", err);
    res.status(500).json({ error: "Failed to identify product" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("AI Accessibility Backend is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
