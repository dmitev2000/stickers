import { CartItem } from "../../interfaces/Interfaces";
import CartItemComponent from "./CartItemComponent";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

const CartList = ({ CartList }: { CartList: CartItem[] }) => {
  const CartCtx = useContext(CartContext);

  return (
    <table className="table table-hover">
      <thead style={{backgroundColor: "#27282c", color: "white"}}>
        <tr className="align-middle">
          <th>Product</th>
          <th className="text-center">Quantity</th>
          <th className="text-center">Each</th>
          <th className="text-center">Total</th>
          <th className="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        {CartList.map((item: CartItem) => {
          return <CartItemComponent key={item.sticker._id} item={item} />;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5} className="text-end fw-bold">Total price: ${CartCtx.totalPrice.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartList;
