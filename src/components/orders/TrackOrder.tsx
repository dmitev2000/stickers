import { PreviewOrderInterface } from "../../interfaces/Interfaces";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import "./Order.css";

const TrackOrder = ({ order }: { order: PreviewOrderInterface }) => {
  
  const CalcDateDiff = (date: Date, min: number, max: number = Infinity) => {
    const diff =
      Math.abs(date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return diff >= min && diff < max;
  };

  return (
    <div className="track-order">
      <h3 className="mb-4">Track Order</h3>
      <div className="d-flex">
        <div className="d-flex flex-column gap-4">
          <div className="order-placed">
            <div className="step">
              <div className="circle-first"></div>
              <div className="icon-wrapper">
                <NoteAltIcon style={{ color: "white" }} fontSize="large" />
              </div>
              <div>
                <p className="fw-bold">Order Placed</p>
                <span className="text-muted">
                  We have received your order on {order.date.substring(0, 10)}
                </span>
              </div>
            </div>
          </div>
          <div className="order-confirmed">
            <div
              className={
                order.status === "Confirmed" ? "step" : "step step-inv"
              }
            >
              <div className="circle"></div>
              <div className="icon-wrapper">
                <CreditScoreIcon style={{ color: "white" }} fontSize="large" />
              </div>
              <div>
                <p className="fw-bold">Order Confirmed</p>
                <span className="text-muted">
                  We have confirmed your order{" "}
                  {order.confirmationDate && (
                    <>on {order.confirmationDate.substring(0, 10)}</>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="order-processed">
            <div
              className={
                order.confirmationDate &&
                CalcDateDiff(new Date(order.confirmationDate.toString()), 1)
                  ? "step"
                  : "step step-inv"
              }
            >
              <div className="circle"></div>
              <div className="icon-wrapper">
                <DoneOutlineIcon style={{ color: "white" }} fontSize="large" />
              </div>
              <div>
                <p className="fw-bold">Order Processed</p>
                <span className="text-muted">We are preparing your order</span>
              </div>
            </div>
          </div>
          <div className="order-ready-to-ship">
            <div
              className={
                order.confirmationDate &&
                (CalcDateDiff(
                  new Date(order.confirmationDate.toString()),
                  2
                ) ||
                  new Date(order.estimatedDelivery) <= new Date())
                  ? "step"
                  : "step step-inv"
              }
            >
              <div className="circle"></div>
              <div className="icon-wrapper">
                <NoCrashIcon style={{ color: "white" }} fontSize="large" />
              </div>
              <div>
                <p className="fw-bold">Ready to Ship</p>
                <span className="text-muted">
                  Your order is ready for shipping
                </span>
              </div>
            </div>
          </div>
          <div className="order-out-for-delivery">
            <div
              className={
                order.confirmationDate &&
                CalcDateDiff(new Date(order.confirmationDate.toString()), 3)
                  ? "step"
                  : "step step-inv"
              }
            >
              <div className="circle"></div>
              <div className="icon-wrapper">
                <LocalShippingIcon
                  style={{ color: "white" }}
                  fontSize="large"
                />
              </div>
              <div>
                <p className="fw-bold">Out for Delivery</p>
                <span className="text-muted">
                  Your order is out for delivery
                </span>
              </div>
            </div>
          </div>
          <div className="order-delivered">
            <div
              className={
                new Date() >= new Date(order.estimatedDelivery)
                  ? "step"
                  : "step step-inv"
              }
            >
              <div className="circle"></div>
              <div className="icon-wrapper">
                <InventoryIcon style={{ color: "white" }} fontSize="large" />
              </div>
              <div>
                <p className="fw-bold">Delivered</p>
                {new Date(order.estimatedDelivery) < new Date() ? (
                  <span className="text-muted">
                    Your order has been delivered on{" "}
                    {order.estimatedDelivery.substring(0, 10)}
                  </span>
                ) : (
                  <span className="text-muted">
                    Your order should be delivered on{" "}
                    {new Date(order.estimatedDelivery)
                      .toString()
                      .substring(4, 15)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrackOrder;
