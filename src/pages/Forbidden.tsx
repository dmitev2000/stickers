import { Link } from "react-router-dom";
import forbidden from "../assets/forbidden.png";

const Forbidden = () => {
  return (
    <div className="not-found">
      <h3>Error 403 (Forbidden)</h3>
      <img src={forbidden} alt="forbidden" />
      <p className="text-muted">
        Looks like you don't have permission to access this resource.
      </p>
      <Link to="/" className="h-link">
        Home
      </Link>
    </div>
  );
};

export default Forbidden;
