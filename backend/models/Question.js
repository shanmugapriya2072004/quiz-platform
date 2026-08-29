const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    question: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length === 4,
    },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
