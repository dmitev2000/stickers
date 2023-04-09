import { useContext } from "react";
import FilterContext from "../../context/FilterContext";

const StickerFIlter = () => {
  const FilterCtx = useContext(FilterContext);

  const FilterStickers = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    FilterCtx.changeFilter(event.currentTarget.innerText);
  };

  return (
    <div className="my-5 d-flex justify-content-center gap-4 align-items-center flex-wrap">
      <i
        style={{ fontSize: "25px", color: "#ff1867" }}
        className="bi bi-bookmark"
      ></i>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "All" ||
          FilterCtx.filterCriteria === "None"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        All
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Language"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Language
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Tooling"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Tooling
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Service"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Service
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Framework"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Framework
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Protocol"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Protocol
      </button>
      <button
        onClick={FilterStickers}
        className={
          FilterCtx.filterCriteria === "Other"
            ? "filter-btn selected"
            : "filter-btn"
        }
      >
        Other
      </button>
    </div>
  );
};

export default StickerFIlter;
