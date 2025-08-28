import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  Present: "#00C49F", // Green
  Absent: "#FF8042",  // Orange
  "Not Marked": "#8884d8", // Purple/Gray
};

export default function AttendanceSummary({ students = [] }) {
  const summaryData = useMemo(() => {
    const present = students.filter((s) => s.status === "Present").length;
    const absent = students.filter((s) => s.status === "Absent").length;
    const notMarked = students.filter(
      (s) => s.status === "Not Marked"
    ).length;

    return [
      { name: "Present", value: present },
      { name: "Absent", value: absent },
      { name: "Not Marked", value: notMarked },
    ];
  }, [students]);

  return (
    <div>
      <h2>Attendance Summary</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
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
