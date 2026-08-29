const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    wrongAnswers: { type: Number, required: true },
    percentage: { type: Number, required: true },
    timeTaken: { type: Number, default: 0 },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOption: String,
        correctOption: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
