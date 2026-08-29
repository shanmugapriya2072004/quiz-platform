const express = require("express");
const { saveResult, getMyResults, getResultById } = require("../controllers/resultController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, saveResult);
router.get("/my", protect, getMyResults);
router.get("/:id", protect, getResultById);

module.exports = router;
