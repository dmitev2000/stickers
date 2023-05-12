import { StickerDetails } from "../../interfaces/Interfaces";

const StickerTable = ({
  stickers,
  totalPrice,
}: {
  stickers: StickerDetails[] | null;
  totalPrice: number;
}) => {
  return (
    <table className="table table-hover" style={{ minWidth: "400px" }}>
      <thead style={{ backgroundColor: "#27282c", color: "white" }}>
        <tr>
          <th>Product</th>
          <th className="text-center">Title</th>
          <th className="text-center">Quantity</th>
          <th className="text-center">Price</th>
        </tr>
      </thead>
      <tbody>
        {stickers &&
          stickers.map((sticker) => {
            return (
              <tr key={sticker.sticker._id}>
                <td>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={sticker.sticker.image}
                    alt={sticker.sticker.title}
                  />
                </td>
                <td>
                  <div
                    style={{ height: "80px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {sticker.sticker.title}
                  </div>
                </td>
                <td>
                  <div
                    style={{ height: "80px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    x{sticker.quantity}
                  </div>
                </td>
                <td>
                  <div
                    style={{ height: "80px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    ${(sticker.sticker.price).toFixed(2)}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="text-end fw-bold total-price">
            Total: <span>${totalPrice.toFixed(2)}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default StickerTable;
