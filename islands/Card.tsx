import IconPhoto from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/photo.tsx";
import { Book } from "../type.ts";
import BookPopup from "./BookPopup.tsx";
import { useState } from "preact/hooks";
import { getCookie } from "../util/func.tsx";

const Card = (props: { book: Book }) => {
  const book = props.book;
  const [popupFlag, setPopupFlag] = useState(false);
  const userName = getCookie("name");
  return (
    <>
      <div
        onClick={() => setPopupFlag(true)}
        class="m-2 rounded-md border-2 border-gray-300"
      >
        {book.owner && <p>{book.owner}がレンタル中</p>}
        <div class="flex justify-center">
          {book.imageURL
            ? (
              <img
                class="m-2 object-contain w-3/4"
                src={book.imageURL}
              />
            )
            : <IconPhoto class="mt-4 w-4/5 h-full" />}
        </div>
        <div class="flex justify-center">
          <p class="text-sm">{book.title.substring(0, 12)}</p>
        </div>
        <BookPopup
          viewFlag={popupFlag}
          setViewFlag={setPopupFlag}
          book={book}
        />
      </div>
    </>
  );
};

export default Card;
