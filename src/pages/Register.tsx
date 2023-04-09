import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FireNotification } from "../utils/FireNotificiation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/api/auth";

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(() => "");
    axios
      .post(`${BASE_URL}/register`, { username: username, password: password })
      .then((res) => {
        FireNotification("Great! Your account has been created. Next step: Login!");
        navigate("/login");
      })
      .catch((err) => {
        setError(() => err.response.data);
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="text-center form-wrapper">
        <h3 className="mb-4 text-uppercase">Register</h3>
        <form onSubmit={SubmitHandler}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            onChange={(event) => {
              setUsername(() => event.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            minLength={8}
            onChange={(event) => {
              setPassword(() => event.target.value);
            }}
          />
          {error && (
            <span className="text-danger text-center w-100">{error}</span>
          )}
          <input type="submit" value="Register" className="w-100" />
        </form>
      </div>
    </div>
  );
};

export default Register;
