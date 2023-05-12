import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import Rating from "@mui/material/Rating";
import { PreviewOrderInterface } from "../interfaces/Interfaces";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HomeIcon from "@mui/icons-material/Home";
import Person3Icon from "@mui/icons-material/Person3";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StickerTable from "../components/stickers/StickerTable";
import { FireNotification } from "../utils/FireNotificiation";

const PreviewOrder = () => {
  const { id } = useParams();
  const URL = `http://localhost:5000/api/orders/${id}`;
  const [order, setOrder] = useState<PreviewOrderInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const CalcDateDiff = (date: Date, min: number, max: number = Infinity) => {
    const diff =
      Math.abs(date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return diff >= min && diff < max;
  };

  const RateOrder = () => {
    axios
      .post("http://localhost:5000/api/orders/set-rating", {
        orderID: order?.orderID,
        rating: rating,
      })
      .then((res) => {
        FireNotification(res.data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="loader-wrapper2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-5">Preview Order</h1>
      {order && (
        <>
          <div className="order-preview">
            <div className="order-details">
              <h3 className="mb-4 mx-2">Details</h3>
              <p>
                <span className="fw-bold mx-2">
                  <Grid3x3Icon style={{ marginRight: "15px" }} />
                  Order ID:
                </span>{" "}
                <span className="text-muted">{order.orderID}</span>
              </p>
              <p>
                <span className="fw-bold mx-2">
                  <AttachMoneyIcon style={{ marginRight: "15px" }} />
                  Price:
                </span>{" "}
                <span className="text-muted">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
              {new Date(order.estimatedDelivery) > new Date() ? (
                <p>
                  <span className="fw-bold mx-2">
                    <AccessTimeIcon style={{ marginRight: "15px" }} />
                    Estimated delivery:
                  </span>{" "}
                  <span className="text-muted">
                    {new Date(order.estimatedDelivery)
                      .toString()
                      .substring(0, 15)}
                  </span>
                </p>
              ) : (
                <p className="mx-2">
                  <AccessTimeIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Delivered:</span>{" "}
                  {new Date(order.estimatedDelivery)
                    .toString()
                    .substring(0, 15)}
                </p>
              )}
              {order.rating === null ? (
                <div className="d-flex gap-1">
                  <p className="fw-bold mx-2">
                    <StarBorderIcon style={{ marginRight: "15px" }} />
                    Rate this order:
                  </p>
                  {new Date(order.estimatedDelivery.toString()) > new Date() ? (
                    <p className="text-muted">Unavailable until delivery</p>
                  ) : (
                    <>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event: any) => {
                          setRating(+event.target.value);
                        }}
                      />
                      {rating !== 0 && (
                        <>
                          <button onClick={RateOrder} className="rating-submit">
                            Submit
                          </button>
                          <button
                            onClick={() => setRating(0)}
                            className="clear-rating"
                          >
                            Clear
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <p className="mx-2">
                    <StarBorderIcon style={{ marginRight: "15px" }} />
                    <span className="fw-bold">You rated:</span>{" "}
                  </p>
                  <Rating name="read-only" value={order.rating} readOnly />(
                  {order.rating})
                </div>
              )}
              <div className="d-flex flex-column">
                <p className="fw-bold mx-2">
                  <LocalShippingIcon style={{ marginRight: "15px" }} />
                  Shipping Details
                </p>
                <p className="mx-2">
                  <Person3Icon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Full name: </span>
                  <span className="text-muted">
                    {order.shippingDetails.fullname}
                  </span>
                </p>
                <p className="mx-2">
                  <LocationCityIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">City: </span>
                  <span className="text-muted">
                    {order.shippingDetails.city}
                  </span>
                </p>
                <p className="mx-2">
                  <HomeIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Address: </span>
                  <span className="text-muted">
                    {order.shippingDetails.address}
                  </span>
                </p>
                <p className="mx-2">
                  <PhoneAndroidIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Phone number: </span>
                  <span className="text-muted">
                    {order.shippingDetails.phone_number}
                  </span>
                </p>
              </div>
            </div>
            <div className="order-products">
              <h3 className="mb-4">Products</h3>
              <StickerTable
                stickers={order.stickersDetails}
                totalPrice={order.totalPrice}
              />
            </div>
          </div>
          <div className="track-order">
            <h3 className="mb-4">Track Order</h3>
            <div className="d-flex">
              <div className="d-flex flex-column gap-4">
                <div className="order-placed">
                  <div className="step">
                    <div className="circle-first"></div>
                    <div className="icon-wrapper">
                      <NoteAltIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Order Placed</p>
                      <span className="text-muted">
                        We have received your order on{" "}
                        {order.date.substring(0, 10)}
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
                      <CreditScoreIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
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
                      CalcDateDiff(
                        new Date(order.confirmationDate.toString()),
                        2
                      )
                        ? "step"
                        : "step step-inv"
                    }
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <DoneOutlineIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Order Processed</p>
                      <span className="text-muted">
                        We are preparing your order
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-ready-to-ship">
                  <div
                    className={
                      order.confirmationDate &&
                      (CalcDateDiff(
                        new Date(order.confirmationDate.toString()),
                        3,
                        4
                      ) ||
                        new Date(order.estimatedDelivery) <= new Date())
                        ? "step"
                        : "step step-inv"
                    }
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <NoCrashIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
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
                      CalcDateDiff(
                        new Date(order.confirmationDate.toString()),
                        3
                      )
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
                      <InventoryIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
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
                          {new Date(order.estimatedDelivery).toString().substring(4, 15)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewOrder;
