import { OrderType, StickerInOrder } from "../../interfaces/Interfaces";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FlipIcon from "@mui/icons-material/Flip";
import GradientIcon from "@mui/icons-material/Gradient";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";
import "./Order.css";
import { Tooltip } from "@mui/material";

const Order = ({ orderDetails }: { orderDetails: OrderType }) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 flex-column order">
      <h5>Order ID: {orderDetails._id}</h5>
      <p className="mb-0">
        <span className="text-muted">
          <Tooltip title="Date & Time">
            <AccessTimeFilledIcon />
          </Tooltip>
        </span>{" "}
        <span className="fw-bold">
          {orderDetails.createdAt.toString().substring(0, 10)},{" "}
          {orderDetails.createdAt.toString().substring(11, 19)}
        </span>
      </p>
      <div className="d-flex justify-content-between w-100 px-5 my-3">
        <p className="mb-0">
          <span className="text-muted">
            <Tooltip title="Ordered stickers">
              <GradientIcon />
            </Tooltip>
          </span>
          <span className="fw-bold">
            {" "}
            {orderDetails.stickerList.reduce(
              (accumulator: number, sticker: StickerInOrder) => {
                return accumulator + sticker.quantity;
              },
              0
            )}
          </span>
        </p>
        <p className="mb-0">
          <span className="text-muted">
            <Tooltip title="Different stickers">
              <FlipIcon />
            </Tooltip>
          </span>
          <span className="fw-bold"> {orderDetails.stickerList.length}</span>
        </p>
        <p className="mb-0">
          <span className="text-muted">
            <Tooltip title="Price">
              <AttachMoneyIcon />
            </Tooltip>
          </span>
          <span className="fw-bold">
            {" "}
            ${orderDetails.totalPrice.toFixed(2)}
          </span>
        </p>
      </div>
      <Link to={`/my-orders/preview-order/${orderDetails._id}`} className="order-details-link">
        Details
      </Link>
    </div>
  );
};

export default Order;
