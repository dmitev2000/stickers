import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { OrderStatisticsRecord } from "../../interfaces/Interfaces";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { BASE_URL } from "../../utils/API_URLs";

const LastThreeMonthsStatisticsChart = () => {
  const [statisticsData, setStatisticsData] = useState<
    OrderStatisticsRecord[] | []
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    if (!AuthCtx.state.user || AuthCtx.state.user?.role !== "Admin") {
      navigate("/");
    }
    setLoading(true);
    setError(null);
    axios
      .get(`${BASE_URL}/orders/get/last-three-months-stats`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setStatisticsData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      })
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
    <BarChart width={550} height={250} data={statisticsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="profit" fill="#ff1867" />
      <Bar dataKey="stickers_sold" fill="#82ca9d" />
      <Bar dataKey="num_orders" fill="#27282c" />
    </BarChart>
  );
};

export default LastThreeMonthsStatisticsChart;
