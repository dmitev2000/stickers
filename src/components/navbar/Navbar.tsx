import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import AccountMenu from "../account-menu/AccountMenu";
import CartIndicator from "../cart/CartIndicator";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import "./Navbar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Navbar = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <nav>
      <Link to="/" className="logo">
        <span>The</span>
        Stickers
      </Link>
      <div className="d-flex gap-3">
        {!AuthCtx.state.user ? (
          <Link to="/login">
            <Tooltip title="Login">
              <LoginIcon color="error" fontSize="large" />
            </Tooltip>
          </Link>
        ) : (
          <>
            {AuthCtx.state.user?.role === "Admin" && (
              <div
                className="d-flex align-items-center mx-4"
                style={{ cursor: "pointer", color: "#ff1867" }}
              >
                <Link to="/admin/dashboard" className="admin-dashboard-link">
                  <Tooltip title="Dashboard">
                    <DashboardIcon />
                  </Tooltip>
                </Link>
              </div>
            )}
            <CartIndicator />
            <AccountMenu />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
