import { useState, useEffect } from "react";
import axios from "axios";
import { RatingStatsInterface } from "../../interfaces/Interfaces";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import PercentIcon from '@mui/icons-material/Percent';
import Tooltip from "@mui/material/Tooltip";
import Loader from "../loader/Loader";

const RatingStats = () => {
  const [data, setData] = useState<RatingStatsInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/orders/get/rating-stats")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
            ? ((Number(data?.ratedOrders) / Number(data?.totalOrders)) * 100).toFixed(
                2
              ) + "%"
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
          {data?.avgRating}
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
