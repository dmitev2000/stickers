import RejectedSticker from "./RejectedSticker";

const RejectedStickerList = ({ list }: { list: any }) => {
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
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: any) => {
          return <RejectedSticker key={item._id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default RejectedStickerList;
