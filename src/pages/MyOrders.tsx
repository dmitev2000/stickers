import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { AuthenticationContext } from "../context/AuthenticationContext";
import orders_svg from "../assets/orders.svg";
import { Link } from "react-router-dom";
import OrderList from "../components/orders/OrderList";

const MyOrders = () => {
  const AuthCtx = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/my-orders/${AuthCtx.user._id}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
          <Link to="/" className="cart-buttons">
            Browse Stickers
          </Link>
        </div>
      ) : (
        <div className="pb-5">
          <h1 className="my-5 dashboard-h">My Orders</h1>
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
