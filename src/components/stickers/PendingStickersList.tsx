import PendingSticker from "./PendingSticker";

const PendingStickersList = ({ list }: { list: any }) => {
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
        {list.map((item: any) => {
          return <PendingSticker key={item._id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default PendingStickersList;
