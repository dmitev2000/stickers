import { useState, useContext, FormEvent } from "react";
import CartContext from "../context/CartContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { macedonian_cities } from "../utils/static_data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FireNotification } from "../utils/FireNotificiation";

const Checkout = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const CartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPN] = useState("");
  const phone_pattern =
    /^(07[0-27-9])(\d{3})(\d{3})|^(07[0-27-9])\s(\d{3})\s(\d{3})|^(07[0-27-9])-(\d{3})-(\d{3})$/;

  const Purchase = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = CartCtx.stickerList.map((sticker: any) => {
      return { stickerID: sticker.sticker._id, quantity: sticker.quantity };
    });

    axios
      .post("http://localhost:5000/api/orders", {
        userID: AuthCtx.user._id,
        stickerList: dataToSend,
        totalPrice: CartCtx.totalPrice,
        shippingDetails: {
          fullname: fullname,
          city: city,
          address: address,
          phone_number: phone_number
        },
        estimatedDelivery: new Date().setDate(new Date().getDate() + 4)
      })
      .then((res) => {
        //console.log(res.data);
        FireNotification(res.data);
        CartCtx.emptyCart();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h3 className="my-5">Checkout</h3>
      <div className="checkout mb-5">
        <div className="py-5 d-flex align-items-center">
          <form onSubmit={Purchase} className="checkout-form w-100">
            <TextField
              label="Full name"
              className="w-100 mb-3"
              onChange={(event) => setFullname(event.target.value)}
              required
            />
            <Autocomplete
              disablePortal
              className="mb-3"
              options={macedonian_cities}
              onChange={(event: any) => setCity(event.target.innerText)}
              renderInput={(params) => (
                <TextField {...params} required label="City" />
              )}
            />

            <TextField
              label="Address"
              className="w-100 mb-3"
              onChange={(event: any) => setAddress(event.target.value)}
              required
            />
            <TextField
              label="Phone number"
              className="w-100 mb-3"
              inputProps={{ pattern: phone_pattern }}
              onChange={(event: any) => setPN(event.target.value)}
              required
            />
            <input
              type="submit"
              value={`Place order $${CartCtx.totalPrice.toFixed(2)}`}
            />
          </form>
        </div>
        <div className="py-5 d-flex align-items-center">
          <table className="table table-hover">
            <thead style={{ backgroundColor: "#27282c", color: "white" }}>
              <tr>
                <th>Product</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {CartCtx.stickerList.map((sticker) => {
                return (
                  <tr key={sticker.sticker._id}>
                    <td>
                      <img src={sticker.sticker.image} alt="" />
                    </td>
                    <td>
                      <div
                        style={{ height: "80px" }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        x{sticker.quantity}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ height: "80px" }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        ${(sticker.sticker.price * sticker.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end fw-bold total-price">
                  Total: <span>${CartCtx.totalPrice.toFixed(2)}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
