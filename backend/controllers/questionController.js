const Question = require("../models/Question");

// GET /api/questions?category=<id or name>&difficulty=<level>
// Public-facing: strips correctAnswer so users can't cheat via network tab... 
// (kept simple here; correctAnswer is checked server-side in resultController)
const getQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.categoryId = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter).populate("categoryId", "name");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/questions - Admin only
const createQuestion = async (req, res) => {
  try {
    const { categoryId, question, options, correctAnswer, difficulty } = req.body;
    if (!categoryId || !question || !options || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required and options must have 4 entries" });
    }
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: "correctAnswer must be one of the options" });
    }

    const newQuestion = await Question.create({
      categoryId,
      question,
      options,
      correctAnswer,
      difficulty,
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/questions/:id - Admin only
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/questions/:id - Admin only
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
