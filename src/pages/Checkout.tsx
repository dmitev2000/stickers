import { useState, useContext } from "react";
import CartContext from "../context/CartContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { macedonian_cities } from "../utils/static_data";

const Checkout = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const CartCtx = useContext(CartContext);

  return (
    <div className="container">
      <h3 className="my-5">Checkout</h3>
      <div className="checkout mb-5">
        <div className="py-5 d-flex align-items-center">
          <form className="checkout-form w-100">
            <TextField label="Full name" className="w-100 mb-3" required />
            <Autocomplete
              disablePortal
              className="mb-3"
              id="combo-box-demo"
              options={macedonian_cities}
              renderInput={(params) => (
                <TextField {...params} required label="City" />
              )}
            />
            <TextField label="Address" className="w-100 mb-3" required />
            <TextField label="Card number" className="w-100 mb-3" required />
            <div className="d-flex justify-content-between gap-3">
              <TextField label="Valid thru" className="w-100 mb-3" required />
              <TextField label="CVC" type="number" className="w-100 mb-3" inputProps={{min: 100, max: 999}} required />
            </div>
            <input type="submit" value={`Purchase $${CartCtx.totalPrice.toFixed(2)}`} />
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
