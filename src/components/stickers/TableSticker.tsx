import { Sticker } from "../../interfaces/Interfaces";

const TableSticker = ({ item }: { item: Sticker }) => {
  return (
    <tr className="pending-row">
      <td>
        <img
          style={{ width: "100px", height: "100px" }}
          src={`http://localhost:5000/uploads/${item.image}`}
        />
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.title}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          ${item.price.toFixed(2)}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.tags.toString()}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.by}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.createdAt
            ? item.createdAt.toString().substring(0, 19).split("T").join(" ")
            : "/"}
        </div>
      </td>
    </tr>
  );
};

export default TableSticker;
