import IconPhoto from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/photo.tsx";
import { Book } from "../type.ts";

const Card = (props: { book: Book }) => {
  const book = props.book;
  return (
    <>
      <div class="m-2 rounded-md border-2 border-gray-300">
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
      </div>
    </>
  );
};

export default Card;
