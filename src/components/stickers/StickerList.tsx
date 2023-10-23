import { Key, useContext, useState, useEffect } from "react";
import Sticker from "./Sticker";
import FilterContext from "../../context/FilterContext";

const StickerList = ({ stickers }: { stickers: any }) => {
  const FilterCtx = useContext(FilterContext);
  const [filteredStickers, setFilteredStickers] = useState([]);
  const [displayedStickers, setDisplayedStickers] = useState<number>(8);

  useEffect(() => {
    if (
      FilterCtx.filterCriteria === "None" ||
      FilterCtx.filterCriteria === "All"
    ) {
      setFilteredStickers(() => stickers);
    } else {
      setFilteredStickers(() =>
        stickers.filter((sticker: any, index: number) => {
          return sticker.tags.includes(FilterCtx.filterCriteria);
        })
      );
    }
  }, [FilterCtx.filterCriteria, FilterCtx.currValue]);

  const ShowMore = () => {
    setDisplayedStickers((prev: number) =>
      prev + 8 > filteredStickers.length ? filteredStickers.length : prev + 8
    );
  };

  return (
    <>
      <div className="sticker-list">
        {filteredStickers.length === 0 ? (
          <div className="zero-stickers-wrapper">
            <h3 className="zero-stickers">
              No stickers found for this category.
            </h3>
          </div>
        ) : (
          filteredStickers
            .filter((sticker: any) => {
              return sticker.price <= FilterCtx.currValue;
            })
            .slice(0, displayedStickers)
            .map((element: { _id: Key | null | undefined }, index: any) => {
              return <Sticker sticker={element} key={element._id} />;
            })
        )}
      </div>
      {displayedStickers < filteredStickers.length && (
        <div className="mx-5">
          <button
            onClick={ShowMore}
            className="mx-auto w-100 d-block w-75 mt-5 custom-buttons rounded"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default StickerList;
