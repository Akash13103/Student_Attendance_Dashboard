import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./AttendanceSummary.css";

const COLORS = {
  Present: "#00C49F", // Green
  Absent: "#FF8042", // Orange
};

export default function AttendanceSummary({ students = [] }) {
  // Calculate all summary data in one memoized hook for efficiency
  const { presentCount, absentCount, totalStudents, attendanceRate } =
    useMemo(() => {
      const present = students.filter((s) => s.status === "Present").length;
      const absent = students.filter((s) => s.status === "Absent").length;
      const total = students.length;
      const rate = total > 0 ? (present / total) * 100 : 0;
      return {
        presentCount: present,
        absentCount: absent,
        totalStudents: total,
        attendanceRate: rate.toFixed(2), // Format to 2 decimal places
      };
    }, [students]);

  const summaryData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];

  if (totalStudents === 0) {
    return (
      <div>
        <h2>Attendance Summary</h2>
        <p>No attendance data to display.</p>
      </div>
    );
  }

  return (
    <div className="attendance-summary">
      <h2>Attendance Summary</h2>

      {/* Evaluation Report Section */}
      <div
        style={{
          padding: "10px",
          border: "1px solid rgb(204, 204, 204)",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "cursive",
        }}
      >
        <h4>Evaluation Report</h4>
        <p>
          <strong>Total Students:</strong> {totalStudents}
        </p>
        <p>
          <strong>Present:</strong> {presentCount}
        </p>
        <p>
          <strong>Absent:</strong> {absentCount}
        </p>
        <p>
          <strong>Attendance Rate:</strong>{" "}
          <span
            style={{
              color: attendanceRate >= 50 ? "#00C49F" : "#FF8042",
              fontWeight: "bold",
            }}
          >
            {attendanceRate}%
          </span>
        </p>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart style={{ fontFamily: "cursive" }}>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {summaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
