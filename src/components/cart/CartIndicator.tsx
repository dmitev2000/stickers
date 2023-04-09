import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import CartContext from "../../context/CartContext";

const CartIndicator = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const CartCtx = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: "pointer", color: "#ff1867" }}
      className="d-flex justify-content-center align-items-center"
      onClick={() => {
        navigate(`/cart/${AuthCtx.user._id}`);
      }}
    >
      <Tooltip title="View cart">
        <Badge badgeContent={CartCtx.totalStickers} color="success">
          <ShoppingCartIcon />
        </Badge>
      </Tooltip>
    </div>
  );
};

export default CartIndicator;
