import BrowseOptions from "../components/browse-options/BrowseOptions";
import { AuthContext } from "../context/AuthenticationContext";
import { useState, useEffect, useContext } from "react";
import { Sticker } from "../interfaces/Interfaces";
import Loader from "../components/loader/Loader";
import { BASE_URL } from "../utils/API_URLs";
import axios from "axios";
import StickerList from "../components/stickers/StickerList";
import FavStickerComponent from "../components/stickers/FavStickerComponent";

const FavoriteStickers = () => {
  const AuthCtx = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [favs, setFavs] = useState<Sticker[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${BASE_URL}/favorites/${AuthCtx.state.user?._id}`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setFavs(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-5 d-flex justify-content-between align-items-center gap-5 flex-wrap">
        <h1 className="dashboard-h">Favorite Stickers</h1>
        <div className="d-flex gap-3">
          <button className="custom-buttons rounded">Clear favorites</button>
          <button className="custom-buttons rounded">Add all to cart</button>
        </div>
      </div>
      {loading ? (
        <div className="favs-coming-soon">
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {favs &&
              favs.map((s) => {
                return <FavStickerComponent sticker_data={s} key={s._id} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteStickers;
