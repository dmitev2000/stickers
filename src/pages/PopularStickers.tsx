import axios from "axios";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import Loader from "../components/loader/Loader";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/API_URLs";

const PopularStickers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${BASE_URL}/stickers/get/popular`)
      .then((res) => {
        setData(res.data);
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
    </div>
  );
};

export default PopularStickers;
