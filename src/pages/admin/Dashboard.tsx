import { ReloadDashboardContextProvider } from "../../context/ReloadDashboardContext";
import ConfirmedOrders from "../../components/orders/ConfirmedOrders";
import { AuthContext } from "../../context/AuthenticationContext";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Link, useNavigate } from "react-router-dom";
import RejectedStickers from "./RejectedStickers";
import StickerRequests from "./StickerRequests";
import { useContext, useEffect } from "react";
import PlacedOrders from "./PlacedOrders";
import UsersInfo from "./UsersInfo";

const Dashboard = () => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthCtx.state.user || AuthCtx.state.user.role !== "Admin") {
      navigate("/");
    }
  }, []);

  return (
    <ReloadDashboardContextProvider>
      <div className="container mt-4 rounded">
        <h1 className="pt-4 pb-5 dashboard-h">Admin Dashboard</h1>
        <h3 className="mb-4 dashboard-h">Stickers</h3>
        <StickerRequests />
        <RejectedStickers />
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <h3 className="dashboard-h">Orders</h3>
          <Link className="link" to="/admin/order-statistics">
            <QueryStatsIcon fontSize="small" /> Order statistics
          </Link>
        </div>
        <PlacedOrders />
        <ConfirmedOrders />
        <h3 className="mt-5 mb-4 dashboard-h">Users</h3>
        <UsersInfo />
      </div>
    </ReloadDashboardContextProvider>
  );
};

export default Dashboard;
