import { createContext, useState } from "react";

const ReloadDashboardContext = createContext({
  reloadPendingStickers: false,
  reloadRejectedStickers: false,
  reloadPlacedOrders: false,
  reloadConfirmedOrders: false,
  reloadUsers: false,
  UpdateReloadPendingStickers: () => {},
  UpdateReloadRejectedStickers: () => {},
  UpdateReloadPlacedOrders: () => {},
  UpdateReloadConfirmedOrders: () => {},
  UpdateReloadUsers: () => {},
});

export const ReloadDashboardContextProvider = (props: any) => {
  const [reloadPendingStickers, setReloadPendingStickers] = useState(false);
  const [reloadRejectedStickers, setReloadRejectedStickers] = useState(false);
  const [reloadPlacedOrders, setReloadPlacedOrders] = useState(false);
  const [reloadConfirmedOrders, setReloadConfirmedOrders] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);

  const UpdateReloadPendingStickers = () => {
    setReloadPendingStickers((prev) => !prev);
  };

  const UpdateReloadRejectedStickers = () => {
    setReloadRejectedStickers((prev) => !prev);
  };

  const UpdateReloadPlacedOrders = () => {
    setReloadPlacedOrders((prev) => !prev);
  };

  const UpdateReloadUsers = () => {
    setReloadUsers((prev) => !prev);
  };

  const UpdateReloadConfirmedOrders = () => {
    setReloadConfirmedOrders((prev) => !prev);
  };

  const context = {
    reloadPendingStickers,
    reloadRejectedStickers,
    reloadPlacedOrders,
    reloadConfirmedOrders,
    reloadUsers,
    UpdateReloadPendingStickers,
    UpdateReloadRejectedStickers,
    UpdateReloadPlacedOrders,
    UpdateReloadConfirmedOrders,
    UpdateReloadUsers,
  };

  return (
    <ReloadDashboardContext.Provider value={context}>
      {props.children}
    </ReloadDashboardContext.Provider>
  );
};

export default ReloadDashboardContext;
