import React from "react";
export default function ToggleButton({ status, onToggle }) {
  const getButtonProps = () => {
    switch (status) {
      case "Present":
        return {
          className: "present",
          label: "Present",
        };
      case "Absent":
        return {
          className: "absent",
          label: "Absent",
        };
      default: // "Not Marked"
        return {
          className: "not-marked",
          label: "Not Marked",
        };
    }
  };

  const buttonProps = getButtonProps();
  return (
    <button
      onClick={onToggle}
      className={`buttonstatus ${buttonProps.className}`}
    >
      {buttonProps.label}
    </button>
  );
}
