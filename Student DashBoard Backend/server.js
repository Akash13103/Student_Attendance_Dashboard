const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const studentRouter = require("./routes/student.js");
const attendanceRouter = require("./routes/attendance.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = 7000;
// Routes
app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/attendance", attendanceRouter);
// MongoDB connect
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
