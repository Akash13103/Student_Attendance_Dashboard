import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../LoginPage/LoginPage.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const jwtToken = await axios.post(
        "http://localhost:7000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );
      console.log(username, password);
      const response = jwtToken.data.token;
      console.log("Token:", response);
      if (response) {
        localStorage.setItem("token", response);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="main-login-container">
      <div className="login-container">
        <h3>Teacher Login</h3>
        <h4>Email</h4>
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <h4>Password</h4>
        <input
          value={password}
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="login-button" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
