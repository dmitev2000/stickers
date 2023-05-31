import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import StickerRequests from "./StickerRequests";
import { ReloadDashboardContextProvider } from "../../context/ReloadDashboardContext";
import RejectedStickers from "./RejectedStickers";
import PlacedOrders from "./PlacedOrders";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import UsersInfo from "./UsersInfo";

const Dashboard = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthCtx.user || AuthCtx.user.role !== "Admin") {
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
        <h3 className="mt-5 dashboard-h">Orders</h3>
        <PlacedOrders />
        <Link className="link" to="/admin/order-statistics"><QueryStatsIcon fontSize="small" /> Order statistics</Link>
        <h3 className="mt-5 mb-4 dashboard-h">Users</h3>
        <UsersInfo />
      </div>
    </ReloadDashboardContextProvider>
  );
};

export default Dashboard;
