import { Sticker } from "../../interfaces/Interfaces";
import TableSticker from "./TableSticker";

const UsersValid = ({ data }: { data: Sticker[] }) => {
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
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return <TableSticker key={item._id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default UsersValid;
