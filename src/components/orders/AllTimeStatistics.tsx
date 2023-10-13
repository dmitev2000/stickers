import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AllTimeStatisticsInterface } from "../../interfaces/Interfaces";
import Loader from "../loader/Loader";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TableViewIcon from "@mui/icons-material/TableView";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "../../context/AuthenticationContext";

const AllTimeStatistics = () => {
  const AuthCtx = useContext(AuthContext);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<AllTimeStatisticsInterface | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios
      .get("http://localhost:5000/api/orders/get/all-time-statistics", {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <Loader />
      </div>
    );
  }

  if (error !== null) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        {error.response.data}
      </div>
    );
  }

  return (
    <div className="ats-wrapper">
      <div className="ats-div">
        <p className="stat-title">Orders</p>
        <div>
          <Tooltip title="Total orders">
            <SummarizeIcon fontSize="large" style={{ color: "#ff1867" }} />
          </Tooltip>
        </div>
        <span>{data?.totalOrders}</span>
        <p className="from-to text-muted">
          {new Date("05/06/2023").toString().substring(4, 15)} -{" "}
          {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
      <div className="ats-div">
        <p className="stat-title">Stickers</p>
        <div>
          <Tooltip title="Total stickers">
            <TableViewIcon fontSize="large" style={{ color: "#ff1867" }} />
          </Tooltip>
        </div>
        <span>{data?.totalStickers}</span>
        <p className="from-to text-muted">
          {new Date("05/06/2023").toString().substring(4, 15)} -{" "}
          {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
      <div className="ats-div">
        <p className="stat-title">Profit</p>
        <div>
          <Tooltip title="Profit">
            <MonetizationOnIcon fontSize="large" style={{ color: "#ff1867" }} />
          </Tooltip>
        </div>
        <span>${data?.totalProfit}</span>
        <p className="from-to text-muted">
          {new Date("05/06/2023").toString().substring(4, 15)} -{" "}
          {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
    </div>
  );
};

export default AllTimeStatistics;
