import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { AuthContext } from "../context/AuthenticationContext";
import orders_svg from "../assets/orders.svg";
import { Link } from "react-router-dom";
import OrderList from "../components/orders/OrderList";

const MyOrders = () => {
  const AuthCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/orders/get/my-orders/${AuthCtx.state.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
          },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <img src={orders_svg} alt="orders-history" />
          <h3>
            Your order history is <span>empty</span>.
          </h3>
          <p className="text-muted">
            No orders have been found for this account.
          </p>
          <Link to="/" className="cart-buttons rounded">
            Browse Stickers
          </Link>
        </div>
      ) : (
        <div className="pb-5">
          <h1 className="my-5 dashboard-h">My Orders</h1>
          <OrderList orders={orders} view="User" />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
