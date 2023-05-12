import { useState, useEffect, useContext } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { CategoryChartData } from "../../interfaces/Interfaces";

const OrderStatisticsTagsChart = () => {
  const [data, setData] = useState<CategoryChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(0);
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!AuthCtx.user || AuthCtx.user.role !== "Admin") {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/api/orders/get/category-statistics")
      .then((res) => {
        setData(res.data);
        setLimit(res.data[0].value + 5);
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
    <div className="d-flex justify-content-center align-items-center">
      <RadarChart outerRadius={90} width={550} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} />
        <Radar
          name="Category (tags)"
          dataKey="value"
          stroke="#ff1867"
          fill="#ff1867"
          fillOpacity={0.5}
        />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default OrderStatisticsTagsChart;
