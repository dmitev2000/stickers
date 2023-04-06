import { useState, useContext } from "react";
import "./Slider.css";
import FilterContext from "../../context/FilterContext";

const Slider = () => {
  const FilterCtx = useContext(FilterContext);

  return (
    <div className="slider-container">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <span>${FilterCtx.minValue.toFixed(2)}</span>
        <input
          type="range"
          min={FilterCtx.minValue}
          max={FilterCtx.maxValue}
          step={0.05}
          value={FilterCtx.currValue}
          className="slider"
          onChange={(event) => {
            FilterCtx.updateCurrentValue(+event.target.value);
          }}
        />
        <span>${FilterCtx.maxValue.toFixed(2)}</span>
      </div>
      <span>Max price: ${FilterCtx.currValue.toFixed(2)}</span>
    </div>
  );
};

export default Slider;
