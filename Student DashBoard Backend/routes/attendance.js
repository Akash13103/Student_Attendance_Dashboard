const express = require("express");
const Attendance = require("../models/Attendance.js");
const { verifyToken } = require("./auth.js");
const router = express.Router();
// POST /api/attendance
router.post("/", verifyToken, async (req, res) => {
  const { records } = req.body; // [{studentId, status}]
  const classId = req.user.classId;

  await Attendance.insertMany(records.map((r) => ({ ...r, classId, date: new Date() })));

  res.json({ message: "Attendance saved" });
});

// GET summary per class
router.get("/summary", verifyToken, async (req, res) => {
  const classId = req.user.classId;

  const pipeline = [
    { $match: { classId } },
    { $sort: { date: -1 } }, // Assuming you have a 'date' field
    {
      $group: {
        _id: "$studentId",
        status: { $first: "$status" },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ];

  const summary = await Attendance.aggregate(pipeline);
  res.json(summary);
});
module.exports = router;
