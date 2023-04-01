import "./Stickers.css";
import { useState } from "react";
import { NumericStepper } from "@anatoliygatt/numeric-stepper";

const Sticker = ({ sticker }: { sticker: any }) => {
  const INITIAL_VALUE = 1;
  const [value, setValue] = useState(INITIAL_VALUE);

  const AddToCart = () => {
    console.log(value);
  };

  return (
      <div className="sticker">
        <span className="by">
          {sticker.by === "System" ? (
            <i className="bi bi-tv" title="system"></i>
          ) : (
            <i className="bi bi-person-circle" title="community"></i>
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
              {sticker.sticker_type}
            </span>
          </div>
          <div className="pt-4 d-flex flex-wrap flex-column gap-4 justify-content-evenly align-items-center">
            <span className="fw-bold price">${sticker.price.toFixed(2).toString()}</span>
            <NumericStepper
              minimumValue={1}
              stepValue={1}
              initialValue={INITIAL_VALUE}
              size="sm"
              inactiveTrackColor="#fed7aa"
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
            <button className="cart-btn" onClick={AddToCart}>
              <i
                className="bi bi-cart
            "
              ></i>{" "}
              Add to cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default Sticker;
