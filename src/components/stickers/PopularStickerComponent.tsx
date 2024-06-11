import { PopularStickerData, Sticker } from "../../interfaces/Interfaces";
import NumbersIcon from "@mui/icons-material/Numbers";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { IMG_URL } from "../../utils/API_URLs";
import "./Stickers.css";
import { Tooltip } from "@mui/material";

const PopularStickerComponent = ({
  sticker,
  place,
  stats,
}: {
  sticker: Sticker;
  place: number;
  stats: PopularStickerData | undefined;
}) => {
  
  return (
    <div className="popular-sticker">
      <img src={`${IMG_URL}/${sticker.image}`} alt={sticker.title} />
      <span className="place">{place}</span>
      <div className="stats">
        <div className="ats-div">
          <p className="stat-title">Orders</p>
          <div>
            <Tooltip title="Orders">
              <AirportShuttleIcon
                fontSize="large"
                style={{ color: "#ff1867" }}
              />
            </Tooltip>
          </div>
          <span>{stats?.data.orders}</span>
          <p className="from-to text-muted">
            {new Date("05/06/2023").toString().substring(4, 15)} -{" "}
            {new Date().toDateString().substring(4, 15)}
          </p>
        </div>
        <div className="ats-div">
          <p className="stat-title">Quantity</p>
          <div>
            <Tooltip title="Quantity">
              <NumbersIcon fontSize="large" style={{ color: "#ff1867" }} />
            </Tooltip>
          </div>
          <span>{stats?.data.count}</span>
          <p className="from-to text-muted">
            {new Date("05/06/2023").toString().substring(4, 15)} -{" "}
            {new Date().toDateString().substring(4, 15)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularStickerComponent;
