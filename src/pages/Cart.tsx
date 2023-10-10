import { useContext } from "react";
import CartContext from "../context/CartContext";
import { AuthContext } from "../context/AuthenticationContext";
import CartList from "../components/cart/CartList";
import shoppingcart from "../assets/shopping-cart.svg";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FireErrorNotification } from "../utils/FireNotificiation";

const Cart = () => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  const BASE_URL = "http://localhost:5000/api/cart";

  const EmptyCartHandler = () => {
    Swal.fire({
      title: "Empty cart?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ff1867",
      cancelButtonColor: "#27282c",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${BASE_URL}/empty-cart`, { userID: AuthCtx.state.user?._id })
          .then((res) => {
            CartCtx.emptyCart();
            FireErrorNotification("Your cart is now empty.");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="container cart-wrapper">
      {CartCtx.totalStickers === 0 ? (
        <div className="empty-cart">
          <img src={shoppingcart} alt="shopping-cart" />
          <h3>
            Your cart is <span>empty</span>.
          </h3>
          <p className="text-muted">
            Looks like you haven't add anything to your cart yet.
          </p>
          <Link to="/" className="cart-buttons">
            Browse Stickers
          </Link>
        </div>
      ) : (
        <div className="py-5">
          <CartList CartList={CartCtx.stickerList} />
          <div className="d-flex justify-content-end gap-3">
            <button className="cart-buttons" onClick={EmptyCartHandler}>
              Empty cart <RemoveShoppingCartIcon />
            </button>
            <Link to="/" className="cart-buttons">
              Browse stickers
              <AddShoppingCartIcon />
            </Link>
            <Link to="/checkout" className="cart-buttons">
              Checkout
              <ShoppingCartCheckoutIcon />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
