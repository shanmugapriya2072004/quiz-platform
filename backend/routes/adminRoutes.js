const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const { getAllResults, getAdminStats } = require("../controllers/resultController");
const { getUsers, updateUserStatus, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getAdminStats);
router.get("/results", getAllResults);
router.get("/users", getUsers);
router.put("/users/:id/status", updateUserStatus);
router.delete("/users/:id", deleteUser);

module.exports = router;
