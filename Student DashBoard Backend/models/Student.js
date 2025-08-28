const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  classId: String,
  status: {
    type: String,
    enum: ["Present", "Absent", "Not Marked"],
    default: "Not Marked",
  },
});
module.exports = mongoose.model("Student", studentSchema);
