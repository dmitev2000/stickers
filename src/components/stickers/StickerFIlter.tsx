import { useContext } from "react";
import FilterContext from "../../context/FilterContext";

const StickerFIlter = () => {
  const FilterCtx = useContext(FilterContext);

  const FilterStickers = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    var btns = document.getElementsByClassName("filter-btn") as HTMLCollection;
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains("selected")) {
        btns[i].classList.remove("selected");
        break;
      }
    }
    event.currentTarget.classList.add("selected");
    FilterCtx.changeFilter(event.currentTarget.innerText);
    //console.log(event.currentTarget.innerText);
  };

  return (
    <div className="my-5 d-flex justify-content-center gap-4 align-items-center flex-wrap">
      <i
        style={{ fontSize: "25px", color: "#ff1867" }}
        className="bi bi-bookmark"
      ></i>
      <button onClick={FilterStickers} className="filter-btn selected">
        All
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Language
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Tooling
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Service
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Framework
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Protocol
      </button>
      <button onClick={FilterStickers} className="filter-btn">
        Other
      </button>
    </div>
  );
};

export default StickerFIlter;
