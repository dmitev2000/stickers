import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import CartContext from "../context/CartContext";
import axios from "axios";
import { FireNotification } from "../utils/FireNotificiation";

const Login = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const CartCtx = useContext(CartContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = "http://localhost:5000/api";
  const navigate = useNavigate();

  const LoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthCtx.dispatch("LOGIN_START");
    axios
      .post(`${BASE_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        AuthCtx.dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        axios
          .get(`${BASE_URL}/cart/${res.data.user._id}`)
          .then((res) => {
            console.log(res.data);
            for(var i = 0; i < res.data.length; i++) {
              CartCtx.addSticker({ sticker: res.data[i].sticker, quantity: res.data[i].quantity });
            }
          })
          .catch((err) => console.error(err));
        FireNotification("Great! Successfylly logged in. Enjoy!");
        navigate("/");
      })
      .catch((err) => {
        AuthCtx.dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="text-center form-wrapper">
        <h3 className="mb-4 text-uppercase">Login</h3>
        <form onSubmit={LoginHandler}>
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
          {AuthCtx.error && (
            <span className="text-danger text-center w-100">
              {AuthCtx.error}
            </span>
          )}
          <input type="submit" value="Login" className="w-100" />
          <span>
            Don't have an account? <Link to="/register">Sign up</Link> now.
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
