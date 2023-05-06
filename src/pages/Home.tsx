import { useState, useEffect, useContext } from "react";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import StickerFIlter from "../components/stickers/StickerFIlter";
import StickerList from "../components/stickers/StickerList";
import axios from "axios";
import Loader from "../components/loader/Loader";
import Slider from "../components/slider/Slider";
import FilterContext from "../context/FilterContext";

const Home = () => {
  const BASE_URL = "http://localhost:5000/api/stickers/";
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const FilterCtx = useContext(FilterContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL)
      .then((res) => {
        setStickers(() => res.data);
        let min = res.data[0].price;
        let max = res.data[0].price;
        for (var i = 1; i < res.data.length; i++) {
          if (res.data[i].price < min) {
            min = res.data[i].price;
          }
          if (res.data[i].price > max) {
            max = res.data[i].price;
          }
        }
        FilterCtx.updateMinMax(min, max);
        FilterCtx.updateCurrentValue(max);
        setLoading(() => false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="py-5">
        <BrowseOptions />
        <div className="loader-wrapper">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <BrowseOptions />
      <StickerFIlter />
      <Slider />
      <StickerList stickers={stickers} />
    </div>
  );
};

export default Home;
