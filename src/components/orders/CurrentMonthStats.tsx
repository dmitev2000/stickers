import { useState, useEffect } from "react";
import axios from "axios";
import { AllTimeStatisticsInterface } from "../../interfaces/Interfaces";
import Loader from "../loader/Loader";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TableViewIcon from "@mui/icons-material/TableView";
import Tooltip from "@mui/material/Tooltip";

const CurrentMonthStats = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [data, setData] = useState<AllTimeStatisticsInterface | null>(null);
  const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/get/current-month-statistics")
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
        style={{ minHeight: "300px" }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="ats-wrapper">
      <div className="ats-div">
      <p className="stat-title">Orders</p>
        <div>
          <Tooltip title="Total orders">
            <SummarizeIcon fontSize="large" style={{ color: "#ff1867"}} />
          </Tooltip>
        </div>
        <span>{data?.totalOrders}</span>
        <p className="from-to text-muted">
          {currentMonth.toString().substring(4, 15)} - {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
      <div className="ats-div">
      <p className="stat-title">Stickers</p>
        <div>
          <Tooltip title="Total stickers">
            <TableViewIcon fontSize="large" style={{ color: "#ff1867"}} />
          </Tooltip>
        </div>
        <span>{data?.totalStickers}</span>
        <p className="from-to text-muted">
          {currentMonth.toString().substring(4, 15)} - {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
      <div className="ats-div">
        <p className="stat-title">Profit</p>
        <div>
          <Tooltip title="Profit">
            <MonetizationOnIcon fontSize="large" style={{ color: "#ff1867"}} />
          </Tooltip>
        </div>
        <span>${data?.totalProfit.toFixed(2)}</span>
        <p className="from-to text-muted">
          {currentMonth.toString().substring(4, 15)} - {new Date().toDateString().substring(4, 15)}
        </p>
      </div>
    </div>
  );
};

export default CurrentMonthStats;
