import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h3>Error 404 (Page Not Found)</h3>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NotFound;