const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = "mySecret"; // ⚠️ keep in .env

// Dummy teacher credentials
const TEACHER = { username: "teacher1", password: "12345", classId: "10-A" };
// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === TEACHER.username && password === TEACHER.password) {
    const token = jwt.sign({ username, classId: TEACHER.classId }, SECRET);
    //   {expiresIn: "3h",
    return res.json({ token, classId: TEACHER.classId });
  }

  res.status(401).json({ error: "Invalid credentials" });
});
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded; // { username, classId }
    next();
  });
};
module.exports = router;
module.exports.verifyToken = verifyToken;
