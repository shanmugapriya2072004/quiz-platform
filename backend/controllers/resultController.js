const Result = require("../models/Result");
const Question = require("../models/Question");
const User = require("../models/User");

// POST /api/results - Save a quiz result for logged-in user
// Body: { categoryId, timeTaken, answers: [{questionId, selectedOption}] }
const saveResult = async (req, res) => {
  try {
    const { categoryId, timeTaken, answers } = req.body;
    if (!categoryId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "categoryId and answers are required" });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionMap = {};
    questions.forEach((q) => (questionMap[q._id.toString()] = q));

    let correctAnswers = 0;
    const evaluatedAnswers = answers.map((a) => {
      const q = questionMap[a.questionId];
      const correctOption = q ? q.correctAnswer : null;
      const isCorrect = q ? a.selectedOption === q.correctAnswer : false;
      if (isCorrect) correctAnswers += 1;
      return {
        questionId: a.questionId,
        selectedOption: a.selectedOption,
        correctOption,
        isCorrect,
      };
    });

    const totalQuestions = answers.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    const result = await Result.create({
      userId: req.user._id,
      categoryId,
      score: correctAnswers,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      percentage,
      timeTaken: timeTaken || 0,
      answers: evaluatedAnswers,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/results/my - Logged-in user's own history
const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("categoryId", "name");
    if (!result) return res.status(404).json({ message: "Result not found" });
    // Only the owner or an admin can view a specific result
    if (result.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this result" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/results - Admin: all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("categoryId", "name")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/admin/stats - Dashboard summary cards
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalQuestions = await Question.countDocuments();
    const totalQuizzes = await Result.countDocuments();
    const agg = await Result.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$percentage" } } },
    ]);
    const averageScore = agg.length ? Math.round(agg[0].avgScore) : 0;

    res.json({ totalUsers, totalQuestions, totalQuizzes, averageScore });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  saveResult,
  getMyResults,
  getResultById,
  getAllResults,
  getAdminStats,
};
