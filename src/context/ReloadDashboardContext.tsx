import { createContext, useState } from "react";

const ReloadDashboardContext = createContext({
  reloadPendingStickers: false,
  reloadRejectedStickers: false,
  reloadPlacedOrders: false,
  UpdateReloadPendingStickers: () => {},
  UpdateReloadRejectedStickers: () => {},
  UpdateReloadPlacedOrders: () => {},
});

export const ReloadDashboardContextProvider = (props: any) => {
  const [reloadPendingStickers, setReloadPendingStickers] = useState(false);
  const [reloadRejectedStickers, setReloadRejectedStickers] = useState(false);
  const [reloadPlacedOrders, setReloadPlacedOrders] = useState(false);

  const UpdateReloadPendingStickers = () => {
    setReloadPendingStickers((prev) => !prev);
  };

  const UpdateReloadRejectedStickers = () => {
    setReloadRejectedStickers((prev) => !prev);
  };

  const UpdateReloadPlacedOrders = () => {
    setReloadPlacedOrders((prev) => !prev);
  };

  const context = {
    reloadPendingStickers,
    reloadRejectedStickers,
    reloadPlacedOrders,
    UpdateReloadPendingStickers,
    UpdateReloadRejectedStickers,
    UpdateReloadPlacedOrders,
  };

  return (
    <ReloadDashboardContext.Provider value={context}>
      {props.children}
    </ReloadDashboardContext.Provider>
  );
};

export default ReloadDashboardContext;
