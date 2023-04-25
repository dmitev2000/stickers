import "./Stickers.css";
import { useState, useContext } from "react";
import { NumericStepper } from "@anatoliygatt/numeric-stepper";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tooltip from "@mui/material/Tooltip";
import CartContext from "../../context/CartContext";
import { FireNotification } from "../../utils/FireNotificiation";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import axios from "axios";

const Sticker = ({ sticker }: { sticker: any }) => {
  const INITIAL_VALUE = 1;
  const [value, setValue] = useState(INITIAL_VALUE);
  const CartCtx = useContext(CartContext);
  const AuthCtx = useContext(AuthenticationContext);
  const BASE_URL = "http://localhost:5000/api/cart";

  const TagsToString = (array: []) => {
    let result = "";
    array.forEach((e, i) => {
      result += e;
      if (i !== array.length - 1) {
        result += ", ";
      }
    });
    return result;
  };

  const AddToCart = () => {
    axios
      .post(`${BASE_URL}/update-cart`, {
        userID: AuthCtx.user._id,
        sticker: sticker,
        quantity: value,
      })
      .then((res) => {
        console.log(res.data);
        CartCtx.addSticker({ sticker: sticker, quantity: value });
        FireNotification(
          `${sticker.title} (${value}) sticker added to cart successfully!`
        );
      })
      .catch((err) => console.error(err));
  };

  const AddToFav = () => {
    console.log(value);
  };

  return (
    <div className="sticker">
      <span className="by">
        {sticker.by === "System" ? (
          <i className="bi bi-tv" title="system"></i>
        ) : (
          <i className="bi bi-person-circle" title={sticker.by}></i>
        )}
      </span>
      <img src={sticker.image} />
      <div className="info">
        <h3>{sticker.title}</h3>
        <div className="d-flex justify-content-center align-items-center flex-wrap flex-column gap-2">
          <span>
            <i className="bi bi-camera"></i>
            {sticker.company}
          </span>
          <span>
            <i className="bi bi-bookmark"></i>
            {TagsToString(sticker.tags)}
          </span>
        </div>
        <div className="pt-4 d-flex flex-wrap flex-column gap-4 justify-content-evenly align-items-center">
          <span className="fw-bold price">
            ${sticker.price.toFixed(2).toString()}
          </span>
          <NumericStepper
            minimumValue={1}
            stepValue={1}
            initialValue={INITIAL_VALUE}
            size="sm"
            inactiveTrackColor="#fff"
            activeTrackColor="#fddec0"
            activeButtonColor="#ffedd5"
            inactiveIconColor="#fb923c"
            hoverIconColor="#ff1867"
            activeIconColor="#9a3412"
            disabledIconColor="#fdba74"
            thumbColor="#ff1867"
            thumbShadowAnimationOnTrackHoverEnabled={false}
            focusRingColor="#fff7ed"
            onChange={(value) => {
              setValue(value);
            }}
          />
          <div className="d-flex justify-content-evenly gap-2">
            <Tooltip title="Add to favorites">
              <button className="add-to-fav" onClick={AddToFav}>
                <FavoriteBorderIcon />
              </button>
            </Tooltip>
            <Tooltip title="Add to cart">
              <button className="add-to-cart" onClick={AddToCart}>
                <AddShoppingCartIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
