import axios from "axios";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import Loader from "../components/loader/Loader";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/API_URLs";
import {
  PopularStickerData,
  IPopularStickers,
  Sticker,
} from "../interfaces/Interfaces";
import PopularStickerComponent from "../components/stickers/PopularStickerComponent";

const PopularStickers = () => {
  const [data, setData] = useState<Sticker[]>([]);
  const [topThree, setTopThree] = useState<PopularStickerData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${BASE_URL}/stickers/get/popular`)
      .then((res) => {
        const resp_data = res.data as IPopularStickers;
        setData(resp_data.stickerData);
        setTopThree(resp_data.topThree);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <BrowseOptions />
      {loading && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}
      {error && (
        <div className="loader-wrapper py-5 text-center">
          <p className="text-danger">{error}</p>
        </div>
      )}
      <div className="d-flex flex-column justify-content-center align-items-start gap-3 flex-wrap py-5">
        {data.map((el, index) => {
          return (
            <PopularStickerComponent
              stats={topThree?.[index]}
              place={index + 1}
              sticker={el}
              key={el._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularStickers;
