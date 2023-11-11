import { PopularStickerData, Sticker } from "../../interfaces/Interfaces";
import { IMG_URL } from "../../utils/API_URLs";
import "./Stickers.css";

const PopularStickerComponent = ({
  sticker,
  place,
  stats,
}: {
  sticker: Sticker;
  place: number;
  stats: PopularStickerData | undefined;
}) => {
  const color = (() => {
    switch (place) {
      case 1:
        return "gold";
      case 2:
        return "#C0C0C0";
      default:
        return "#CD7F32";
    }
  })();
  return (
    <div className="popular-sticker">
      <img src={`${IMG_URL}/${sticker.image}`} alt={sticker.title} />
      <span className="place" style={{ backgroundColor: color }}>
        {place}
      </span>
      <div className="stats">
        <div>Orders: {stats?.data.orders}</div>
        <div>Quantity: {stats?.data.count}</div>
      </div>
    </div>
  );
};

export default PopularStickerComponent;
