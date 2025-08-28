import React, { useEffect, useState } from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import AttendanceSummary from "../AttendanceSummary/AttendanceSummary";
import CardWrapper from "../CardWrapper/CardWrapper";
import "../DashBoard/DashBoard.css";

export default function DashBoard() {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:7000/api/student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Set default status to "Absent" for all students on load
        const studentsWithDefaultStatus = data.map((student) => ({
          ...student,
          status: "Absent",
        }));
        setStudents(studentsWithDefaultStatus);
      });
  }, [token]);

  // Simplified toggle logic for only Present/Absent
  const handleToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Present" ? "Absent" : "Present";
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
    );
    // Note: You might want to update the backend here as well
  };

  // Handler for bulk actions
  const handleBulkUpdate = (newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        status: newStatus,
      }))
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="heading"> Class Attendance</h2>

      {/* Bulk Action Buttons */}

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
      <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          marginRight: "13px",
        }}
      >
        <button
          className="mark-present"
          onClick={() => handleBulkUpdate("Present")}
        >
          Mark All Present
        </button>
        <button
          className="mark-absent"
          onClick={() => handleBulkUpdate("Absent")}
        >
          Mark All Absent
        </button>
      </div>
      <CardWrapper>
        <AttendanceSummary students={students} />
      </CardWrapper>
    </div>
  );
}
