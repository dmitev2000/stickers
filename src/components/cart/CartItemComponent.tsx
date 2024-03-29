import { AuthContext } from "../../context/AuthenticationContext";
import { BASE_URL, IMG_URL } from "../../utils/API_URLs";
import { CartItem } from "../../interfaces/Interfaces";
import CartContext from "../../context/CartContext";
import {
  FireErrorNotification,
  FireNotification,
} from "../../utils/FireNotificiation";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const CartCtx = useContext(CartContext);
  const AuthCtx = useContext(AuthContext);

  const RemoveItemHandler = () => {
    Swal.fire({
      title: `Remove ${item.sticker.title} sticker from the cart?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ff1867",
      cancelButtonColor: "#27282c",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${BASE_URL}/cart/remove-item-from-cart/${AuthCtx.state.user?._id}`,
            {
              stickerID: item.sticker._id,
            },
            {
              headers: {
                Authorization: `Bearer ${AuthCtx.state.token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            CartCtx.removeSticker(item);
            FireErrorNotification(
              `${item.sticker.title} sticker is removed from the cart!`
            );
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const IncrementQuantityHandler = () => {
    axios
      .post(
        `${BASE_URL}/cart/increment-quantity/${AuthCtx.state.user?._id}`,
        {
          stickerID: item.sticker._id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        CartCtx.increaseQuantity(item);
        FireNotification("Item quantity changed.");
      })
      .catch((err) => console.error(err));
  };

  const DecrementQuantityHandler = () => {
    axios
      .post(
        `${BASE_URL}/cart//decrement-quantity/${AuthCtx.state.user?._id}`,
        {
          stickerID: item.sticker._id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        CartCtx.decreaseQuantity(item);
        FireErrorNotification("Item quantity changed.");
      })
      .catch((err) => console.error(err));
  };

  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start gap-3 align-items-center">
          <img
            src={`${IMG_URL}/${item.sticker.image}`}
            alt={item.sticker.title}
          />
          <div className="td-div flex-column justify-content-center align-items-start">
            <p className="fw-bold">{item.sticker.title}</p>
            <p className="text-muted">{item.sticker.tags.toString()}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="td-div justify-content-center">
          <button
            onClick={DecrementQuantityHandler}
            className="quantity-changer red"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          {item.quantity}
          <button
            onClick={IncrementQuantityHandler}
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
