import Loader from "../components/loader/Loader";
import CartContext from "../context/CartContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { useContext } from "react";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const CartCtx = useContext(CartContext);

  return (
    <div className="container cart-wrapper">
      {CartCtx.totalStickers === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty.</h3>
        </div>
      ) : (
        <div className="container py-5">
          <CartList CartList={CartCtx.stickerList} />
        </div>
      )}
    </div>
  );
};

export default Cart;
