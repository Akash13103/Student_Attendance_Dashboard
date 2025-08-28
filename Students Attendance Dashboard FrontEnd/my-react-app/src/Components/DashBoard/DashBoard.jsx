import React, { useEffect, useState } from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import AttendanceSummary from "../AttendanceSummary/AttendanceSummary";
import CardWrapper from "../CardWrapper/CardWrapper";

export default function DashBoard() {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Or wherever you store your JWT

    fetch("http://localhost:7000/api/student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Set default status to "Not Marked" for all students on load
        const studentsWithDefaultStatus = data.map((student) => ({
          ...student,
          status: "Not Marked",
        }));
        setStudents(studentsWithDefaultStatus);
      });
  }, []);

  const handleToggle = async (id, currentStatus) => {
    // Cycle through statuses: Not Marked -> Present -> Absent -> Present
    const newStatus =
      currentStatus === "Not Marked"
        ? "Present"
        : currentStatus === "Present"
        ? "Absent"
        : "Present";

    // Optimistic UI update
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
    );
    // Update API
    console.log("Toggling student ID:", id);
    await fetch(`http://localhost:7000/api/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetch("http://localhost:7000/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        records: [{ studentId: id, status: newStatus }],
      }),
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="heading"> Class Attendance</h2>

      <div className="studentslist">
        {Array.isArray(students) &&
          students.map((student) => (
            <div key={student._id} className="eachstudent">
              <span className="studentname">{student.name}</span>
              <ToggleButton
                status={student.status}
                onToggle={() => handleToggle(student._id, student.status)}
              />
            </div>
          ))}
      </div>
      <CardWrapper>
        <AttendanceSummary students={students} />
      </CardWrapper>
    </div>
  );
}