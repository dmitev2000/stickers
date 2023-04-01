import { Key } from "react";
import Sticker from "./Sticker";

const StickerList = ({ stickers }: {stickers: any}) => {
  return (
    <div className="sticker-list">
      {stickers.map((element: { _id: Key | null | undefined; }, index: any) => {
        return <Sticker sticker={element} key={element._id} />;
      })}
    </div>
  );
};

export default StickerList;
