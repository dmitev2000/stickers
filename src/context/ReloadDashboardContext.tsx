import { createContext, useState } from "react";

const ReloadDashboardContext = createContext({
  reloadPendingStickers: false,
  reloadRejectedStickers: false,
  UpdateReloadPendingStickers: () => {},
  UpdateReloadRejectedSrtickers: () => {},
});

export const ReloadDashboardContextProvider = (props: any) => {
  const [reloadPendingStickers, setReloadPendingStickers] = useState(false);
  const [reloadRejectedStickers, setReloadRejectedStickers] = useState(false);

  const UpdateReloadPendingStickers = () => {
    setReloadPendingStickers((prev) => !prev);
  };

  const UpdateReloadRejectedSrtickers = () => {
    setReloadRejectedStickers((prev) => !prev);
  };

  const context = {
    reloadPendingStickers,
    reloadRejectedStickers,
    UpdateReloadPendingStickers,
    UpdateReloadRejectedSrtickers,
  };

  return (
    <ReloadDashboardContext.Provider value={context}>
      {props.children}
    </ReloadDashboardContext.Provider>
  );
};

export default ReloadDashboardContext;
