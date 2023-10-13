import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RatingStatsInterface } from "../../interfaces/Interfaces";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import PercentIcon from "@mui/icons-material/Percent";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import Loader from "../loader/Loader";
import { AuthContext } from "../../context/AuthenticationContext";

const RatingStats = () => {
  const AuthCtx = useContext(AuthContext);
  const [data, setData] = useState<RatingStatsInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:5000/api/orders/get/rating-stats", {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "250px" }}
      >
        <Loader />
      </div>
    );
  }

  if (error !== null) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "250px" }}
      >
        {error.response.data}
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-evenly align-items-center"
      style={{ minHeight: "250px" }}
    >
      <div className="ats-div">
        <p className="stat-title">Rating %</p>
        <div>
          <Tooltip title="Rating percentage">
            <PercentIcon fontSize="large" style={{ color: "#ff1867" }} />
          </Tooltip>
        </div>
        <span className="mb-2">
          {Number(data?.ratedOrders) && Number(data?.totalOrders)
            ? (
                (Number(data?.ratedOrders) / Number(data?.totalOrders)) *
                100
              ).toFixed(2) + "%"
            : "N/A"}
        </span>
        <p className="from-to text-muted text-center">
          Total orders: {data?.totalOrders}
          <br />
          Rated orders: {data?.ratedOrders}
        </p>
      </div>
      <div className="ats-div">
        <p className="stat-title">Avg rating</p>
        <div>
          <Tooltip title="Average rating">
            <StarPurple500Icon fontSize="large" style={{ color: "#ff1867" }} />
          </Tooltip>
        </div>
        <span className="mb-2">
          <StarIcon color="warning" />
          {data?.avgRating.toFixed(2)}
        </span>
        <p className="from-to text-muted text-center">
          Total orders: {data?.totalOrders}
          <br />
          Rated orders: {data?.ratedOrders}
        </p>
      </div>
    </div>
  );
};

export default RatingStats;
