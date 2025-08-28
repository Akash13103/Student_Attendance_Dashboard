import { useEffect, useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import Button from "../components/ui/Button";
import { api } from "../api/client";

function AttendanceToggle({ status, onToggle }) {
  return (
    <Button
      onClick={onToggle}
      sx={{ backgroundColor: status === "Present" ? "green" : "red" }}
    >
      {status}
    </Button>
  );
}

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    api.get("/api/students").then((res) => {
      setStudents(res.data);
      const init = {};
      res.data.forEach((s) => (init[s._id] = "Absent"));
      setAttendance(init);
    });
  }, []);

  const toggleStatus = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present",
    }));
  };

  const handleSubmit = async () => {
    const records = Object.keys(attendance).map((id) => ({
      studentId: id,
      status: attendance[id],
    }));
    await api.post("/api/attendance", { records });
    alert("Attendance submitted!");
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Typography variant="h5">Student Attendance</Typography>
      <Stack spacing={2} mt={2}>
        {students.map((s) => (
          <Stack
            key={s._id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{s.name}</Typography>
            <AttendanceToggle
              status={attendance[s._id]}
              onToggle={() => toggleStatus(s._id)}
            />
          </Stack>
        ))}
        <Button onClick={handleSubmit}>Submit Attendance</Button>
      </Stack>
    </Paper>
  );
}
