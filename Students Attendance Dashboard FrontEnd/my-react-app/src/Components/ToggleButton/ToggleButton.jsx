import React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

export default function ToggleButton({ status, onToggle }) {
  // Determine the color of the switch based on the status
  const switchColor = status === "Present" ? "success" : "error";

  return (
    <Box sx={{ minWidth: 120, textAlign: "right" }}>
      <FormControlLabel
        control={
          <Switch
            checked={status === "Present"}
            onChange={onToggle}
            color={switchColor}
          />
        }
        label={status}
        labelPlacement="start"
      />
    </Box>
  );
}