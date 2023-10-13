import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import CartContext from "../context/CartContext";
import axios from "axios";
import { FireNotification } from "../utils/FireNotificiation";
import { GetContextData } from "../utils/GetContextData";
import FavoritesContext from "../context/FavoritesContext";
import { Sticker } from "../interfaces/Interfaces";

const Login = () => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  const FavsCtx = useContext(FavoritesContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = "http://localhost:5000/api";
  const navigate = useNavigate();

  const LoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthCtx.dispatch({ type: "LOGIN_START" });
    axios
      .post(`${BASE_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const login_data = res.data;
        GetContextData(res.data.token, res.data.user?._id)
          .then((res) => {
            AuthCtx.dispatch({ type: "LOGIN_SUCCESS", payload: login_data });
            console.log(res);
            for (var i = 0; i < res?.cart_data.length; i++) {
              const current = res?.cart_data[i];
              CartCtx.addSticker({
                sticker: current.sticker,
                quantity: current.quantity,
              });
            }
            for (var i = 0; i < res?.favs_data.length; i++) {
              const current = res?.favs_data[i] as Sticker;
              FavsCtx.addStickerToFavorites(current._id);
            }
            FireNotification("Great! Successfully logged in. Enjoy!");
            navigate("/");
          })
          .catch((err) => console.log(err));
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
          {AuthCtx.state.error && (
            <span className="text-danger text-center w-100">
              {AuthCtx.state.error}
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
