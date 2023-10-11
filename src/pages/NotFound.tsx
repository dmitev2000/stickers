import { Link } from "react-router-dom";
import broken_robot from "../assets/broken_robot.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <h3>Error 404 (Page Not Found)</h3>
      <img src={broken_robot} alt="not found" />
      <p className="text-muted">
        The link you followed is probably broken or the page has been removed.
      </p>
      <Link to="/" className="h-link">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
