require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// =======================
// CORS
// =======================
app.use(
  cors({
    origin: [
      "https://quiz-platform-ten-iota.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =======================
// Body Parser
// =======================
app.use(express.json());

// =======================
// Test Route
// =======================
app.get("/", (req, res) => {
  res.json({
    message: "Quiz Platform API is running",
  });
});

// =======================
// MongoDB
// =======================
connectDB();

// =======================
// Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// 404
// =======================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// =======================
// Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});