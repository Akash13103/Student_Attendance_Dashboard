import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { api } from "../api/client";

const COLORS = ["#0088FE", "#FF8042"];

export default function AttendanceSummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/api/attendance/summary").then((res) => {
      const formatted = res.data.map((d) => ({
        name: d._id,
        value: d.count,
      }));
      setData(formatted);
    });
  }, []);

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Typography variant="h5" gutterBottom>
        Attendance Summary
      </Typography>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Paper>
  );
}
