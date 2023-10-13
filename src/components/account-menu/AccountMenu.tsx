import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import { FireNotification } from "../../utils/FireNotificiation";
import CartContext from "../../context/CartContext";
import FavoritesContext from "../../context/FavoritesContext";

const AccountMenu = () => {
  const AuthCtx = React.useContext(AuthContext);
  const CartCtx = React.useContext(CartContext);
  const FavsCtx = React.useContext(FavoritesContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthCtx.dispatch({ type: "LOGOUT" });
    handleClose();
    FireNotification("You are now logged out");
    localStorage.setItem("cartItems", JSON.stringify([]));
    CartCtx.emptyCart();
    localStorage.setItem("favStickers", JSON.stringify([]));
    FavsCtx.clearFavorites();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#ff1867",
              color: "#27282c",
            }}
          >
            {AuthCtx.state.user?.username[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {AuthCtx.state.user?.username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <span>Add another account</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <Link
            to={`/my-orders/${AuthCtx.state.user?._id}`}
            className="account-menu-link"
          >
            My orders
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <span>Settings</span>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
