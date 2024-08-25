import { IRejectedSticker } from "../../interfaces/Interfaces";
import RejectedSticker from "./RejectedSticker";

const UsersRejected = ({ data }: { data: IRejectedSticker[] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Preview</th>
          <th>Title</th>
          <th>Price</th>
          <th>Tags</th>
          <th>By</th>
          <th>Datetime</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return <RejectedSticker key={item._id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default UsersRejected;
