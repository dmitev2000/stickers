import { useState, createContext, useEffect } from "react";
import { FavStickersType } from "../interfaces/Interfaces";

const getStoredFavStickers = () => {
  try {
    const favStickers = localStorage.getItem("favStickers");
    const stickerList = favStickers ? JSON.parse(favStickers) : [];
    return stickerList;
  } catch (error) {
    return [];
  }
};

const FavoritesContext = createContext<FavStickersType>({
  stickerList: [],
  totalStickers: 0,
  addStickerToFavorites: (stickerID: string) => {},
  removeStickerFromFavorites: (stickerID: string) => {},
  clearFavorites: () => {},
});

export const FavoritesContextProvider = (props: any) => {
  const [stickerList, setStickerList] = useState(getStoredFavStickers());
  const [totalStickers, setTotalStickers] = useState(
    getStoredFavStickers().length
  );

  const addStickerToFavorites = (stickerID: string) => {
    setStickerList((prev: string[]) => prev.concat(stickerID));
    setTotalStickers((prev: number) => prev + 1);
  };

  const removeStickerFromFavorites = (stickerID: string) => {
    setStickerList((prev: string[]) =>
      prev.filter((s: string) => {
        return s !== stickerID;
      })
    );
    setTotalStickers((prev: number) => prev - 1);
  };

  const clearFavorites = () => {
    setStickerList(() => []);
    setTotalStickers(() => 0);
  };

  useEffect(() => {
    localStorage.setItem("favStickers", JSON.stringify(stickerList));
  }, [totalStickers]);

  const context = {
    stickerList,
    totalStickers,
    clearFavorites,
    removeStickerFromFavorites,
    addStickerToFavorites,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
