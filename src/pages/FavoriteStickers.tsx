import FavStickerComponent from "../components/stickers/FavStickerComponent";
import { AuthContext } from "../context/AuthenticationContext";
import { FireNotification } from "../utils/FireNotificiation";
import FavoritesContext from "../context/FavoritesContext";
import { useState, useEffect, useContext } from "react";
import { Sticker } from "../interfaces/Interfaces";
import Loader from "../components/loader/Loader";
import { BASE_URL } from "../utils/API_URLs";
import noFavs from "../assets/noFavs.png";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoriteStickers = () => {
  const AuthCtx = useContext(AuthContext);
  const FavsCtx = useContext(FavoritesContext);
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
  }, [FavsCtx.totalStickers]);

  const ClearFavorites = async () => {
    try {
      const resp = await axios.put(
        `${BASE_URL}/favorites/clear-favs/${AuthCtx.state.user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      FavsCtx.clearFavorites();
      FireNotification(resp.data);
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-5 d-flex justify-content-between align-items-center gap-5 flex-wrap">
        {favs && favs.length > 0 && (
          <>
            <h1 className="dashboard-h">Favorite Stickers</h1>
            <div className="d-flex gap-3">
              <button
                className="custom-buttons rounded"
                onClick={ClearFavorites}
              >
                Clear favorites
              </button>
              <button className="custom-buttons rounded">
                Add all to cart
              </button>
            </div>
          </>
        )}
      </div>
      {loading ? (
        <div className="favs-coming-soon">
          <Loader />
        </div>
      ) : (
        <>
          {error !== null ? (
            <h3>{error}</h3>
          ) : (
            <div className="d-flex justify-content-center flex-wrap gap-4">
              {favs && favs.length > 0 ? (
                favs.map((s) => {
                  return <FavStickerComponent sticker_data={s} key={s._id} />;
                })
              ) : (
                <div className="no-favs">
                  <img src={noFavs} alt="no favs" />
                  <h3 className="text-center">
                    Your favorites list is <span>empty</span>.
                  </h3>
                  <Link to="/" className="custom-buttons rounded">
                    Find some
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteStickers;
