import AllTimeStatistics from "../../components/orders/AllTimeStatistics";
import OrderStatisticsChart from "../../components/orders/OrderStatisticsChart";
import OrderStatisticsTagsChart from "../../components/orders/OrderStatisticsTagsChart";

const OrderStatistics = () => {
  return (
    <div className="container py-5 stats">
      <h1 className="mb-5">Order statistics</h1>
      <div className="order-statistics-wrapper">
        <div>
          <h3 className="mb-4">Statistics for the last 3 days:</h3>
          <OrderStatisticsChart />
        </div>
        <div>
          <h3 className="mb-4">Statistics for the last month:</h3>
        </div>
        <div>
          <h3 className="mb-4">Statistics for the last 3 months:</h3>
        </div>
        <div>
          <h3 className="mb-4">All time statistics:</h3>
          <AllTimeStatistics />
        </div>
        <div>
          <h3 className="mb-4">Sold stickers by categories:</h3>
          <OrderStatisticsTagsChart />
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
