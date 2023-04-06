import { Key, useContext, useState, useEffect } from "react";
import Sticker from "./Sticker";
import FilterContext from "../../context/FilterContext";

const StickerList = ({ stickers }: { stickers: any }) => {
  const FilterCtx = useContext(FilterContext);
  const [filteredStickers, setFilteredStickers] = useState([]);

  useEffect(() => {
    if (
      FilterCtx.filterCriteria === "None" ||
      FilterCtx.filterCriteria === "All"
    ) {
      setFilteredStickers(() => stickers);
    } else {
      setFilteredStickers(() =>
        stickers.filter((sticker: any, index: number) => {
          return sticker.sticker_type === FilterCtx.filterCriteria;
        })
      );
    }
  }, [FilterCtx.filterCriteria, FilterCtx.currValue]);

  return (
    <div className="sticker-list">
      {filteredStickers.length === 0 ? (
        <div className="zero-stickers-wrapper">
          <h3 className="zero-stickers">
            No stickers found for this category.
          </h3>
        </div>
      ) : (
        filteredStickers.filter((sticker: any) => {
          return sticker.price <= FilterCtx.currValue;
        }).map(
          (element: { _id: Key | null | undefined }, index: any) => {
            return <Sticker sticker={element} key={element._id} />;
          }
        )
      )}
    </div>
  );
};

export default StickerList;
