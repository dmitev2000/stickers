import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import AccountMenu from "../account-menu/AccountMenu";
import logo from "../../assets/logo.png";
import CartIndicator from "../cart/CartIndicator";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import "./Navbar.css";

const Navbar = () => {
  const AuthCtx = useContext(AuthenticationContext);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
        Rainbow Stickers
      </Link>
      <div className="d-flex gap-3">
        {!AuthCtx.user ? (
          <Link to="/login">
            <Tooltip title="Login">
              <LoginIcon color="error" />
            </Tooltip>
          </Link>
        ) : (
          <>
            <CartIndicator />
            <AccountMenu />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
