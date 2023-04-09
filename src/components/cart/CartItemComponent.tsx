import { CartItem } from "../../interfaces/Interfaces";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { FireErrorNotification } from "../../utils/FireNotificiation";
import axios from "axios";

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const CartCtx = useContext(CartContext);
  const AuthCtx = useContext(AuthenticationContext);
  const BASE_URL = "http://localhost:5000/api/cart";

  const RemoveItemHandler = () => {
    axios
      .post(`${BASE_URL}/remove-item-from-cart`, {
        userID: AuthCtx.user._id,
        stickerID: item.sticker._id,
      })
      .then((res) => {
        CartCtx.removeSticker(item);
        FireErrorNotification(
          `${item.sticker.title} sticker is removed from the cart!`
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start gap-3 align-items-center">
          <img src={item.sticker.image} alt={item.sticker.title} />
          <div className="td-div flex-column justify-content-center">
            <p className="fw-bold">{item.sticker.title}</p>
            <p className="text-muted">{item.sticker.sticker_type}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="td-div justify-content-center">
          <button
            onClick={() => {
              CartCtx.decreaseQuantity(item);
            }}
            className="quantity-changer red"
          >
            -
          </button>
          {item.quantity}
          <button
            onClick={() => {
              CartCtx.increaseQuantity(item);
            }}
            className="quantity-changer black"
          >
            +
          </button>
        </div>
      </td>
      <td>
        <div className="td-div justify-content-center">
          ${item.sticker.price.toFixed(2)}
        </div>
      </td>
      <td>
        <div className="td-div justify-content-center">
          ${(item.sticker.price * item.quantity).toFixed(2)}
        </div>
      </td>
      <td>
        <div className="td-div justify-content-center">
          <button onClick={RemoveItemHandler} className="remove-item-btn">
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItemComponent;
