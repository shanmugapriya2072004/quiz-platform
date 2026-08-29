const express = require("express");
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", protect, adminOnly, createQuestion);
router.put("/:id", protect, adminOnly, updateQuestion);
router.delete("/:id", protect, adminOnly, deleteQuestion);

module.exports = router;
