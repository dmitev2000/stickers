import { useState, useEffect } from "react";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import StickerFIlter from "../components/stickers/StickerFIlter";
import StickerList from "../components/stickers/StickerList";
import axios from "axios";
import Loader from "../components/loader/Loader";

const Home = () => {
  const BASE_URL = "http://localhost:5000/api/stickers/";
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL)
      .then((res) => {
        //console.log(res.data);
        setStickers(() => res.data);
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
      <StickerList stickers={stickers} />
    </div>
  );
};

export default Home;
