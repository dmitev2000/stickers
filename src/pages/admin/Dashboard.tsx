import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import StickerRequests from "./StickerRequests";
import { ReloadDashboardContextProvider } from "../../context/ReloadDashboardContext";
import RejectedStickers from "./RejectedStickers";

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
      <div className="container pt-4">
        <h1 className="pt-4 pb-5">Admin Dashboard</h1>
        <StickerRequests />
        <RejectedStickers />
      </div>
    </ReloadDashboardContextProvider>
  );
};

export default Dashboard;
