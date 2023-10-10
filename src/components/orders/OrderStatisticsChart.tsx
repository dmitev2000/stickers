import { useState, useEffect, useContext } from "react";
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
import axios from "axios";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";

const OrderStatisticsChart = () => {
  const [statisticsData, setStatisticsData] = useState<
    OrderStatisticsRecord[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    if (!AuthCtx.state.user || AuthCtx.state.user?.role !== "Admin") {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/api/orders/get/statistics")
      .then((res) => {
        setStatisticsData(res.data);
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

export default OrderStatisticsChart;
