import React from "react";

const Input = ({ children }) => {
  return (
    <div>
      <input {...children} />
    </div>
  );
};

export default Input;
