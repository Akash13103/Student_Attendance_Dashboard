const express = require("express");
const Student = require("../models/Student.js");
const { verifyToken } = require("./auth.js"); // Import the entire auth module
const router = express.Router();
// GET /api/students
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("Decoded user:", req.user); // Debug: check if user is set
    const students = await Student.find({ classId: req.user.classId });
    res.json(students);
  } catch (error) {
    console.error(error); // Log the actual error
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    console.log("PUT /api/student/:id called", req.params.id);
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
module.exports = router;
