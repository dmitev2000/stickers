import AllTimeStatistics from "../../components/orders/AllTimeStatistics";
import OrderStatisticsChart from "../../components/orders/OrderStatisticsChart";
import OrderStatisticsTagsChart from "../../components/orders/OrderStatisticsTagsChart";
import CurrentMonthStats from "../../components/orders/CurrentMonthStats";
import RatingStats from "../../components/orders/RatingStats";

const OrderStatistics = () => {
  return (
    <div className="container py-5 stats">
      <h1 className="mb-5 dashboard-h">Order statistics</h1>
      <div className="order-statistics-wrapper">
        <div>
          <h3 className="mb-4">Statistics for the last 3 days:</h3>
          <OrderStatisticsChart />
        </div>
        <div>
          <h3 className="mb-4">
            Statistics for {new Date().toDateString().split(" ")[1]}{" "}
            {new Date().toDateString().split(" ")[3]}:
          </h3>
          <CurrentMonthStats />
        </div>
        <div>
          <h3 className="mb-4">Statistics for the last 3 months:</h3>
          <div className="d-flex justify-content-center align-items-center text-muted h-50 fw-bold">
            Nothing to display at the moment.
          </div>
        </div>
        <div>
          <h3 className="mb-4">All time statistics:</h3>
          <AllTimeStatistics />
        </div>
        <div>
          <h3 className="mb-4">Sold stickers by categories:</h3>
          <OrderStatisticsTagsChart />
        </div>
        <div>
          <h3 className="mb-4">Rating stats</h3>
          <RatingStats />
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
