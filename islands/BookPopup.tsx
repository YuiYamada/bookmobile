import { StateUpdater } from "preact/hooks/src/index.js";
import { useEffect, useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx.d.ts";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import IconPhoto from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/photo.tsx";
import IconThumbUp from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/thumb-up.tsx";
import { Book } from "../type.ts";
import { getCookie } from "../util/func.tsx";

type Props = {
  viewFlag: boolean;
  setViewFlag: StateUpdater<boolean>;
  book: Book | undefined;
};
const BookPopup = (props: Props) => {
  const { viewFlag, setViewFlag, book } = props;
  const [borrow, setBorrow] = useState(false);
  const [popupFlag, setPopupFlag] = useState(false);

  const userName = getCookie("name");

  const isOwn = "" != book?.owner;

  // 枠外クリック用関数
  const closePopup = (
    e: JSXInternal.TargetedMouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    setViewFlag(false);
    setPopupFlag(false);
    e.stopPropagation();
  };
  // 枠内クリック
  const preventClose = (
    e: JSXInternal.TargetedMouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const borrowBook = () => {
      const method = "POST";

      const body = JSON.stringify(book);

      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
      fetch(`/api/borrowBook?user=${userName}`, {
        method,
        body,
        headers,
      }).then(() => setPopupFlag(true));
    };
    borrow && borrowBook();
  }, [borrow]);

  return (
    <>
      <div
        class={"fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50" +
          (viewFlag
            ? " top-0 left-0 h-screen w-screen "
            : " top-1/2 left-1/2 h-0 w-0 ")}
        onClick={closePopup}
      >
        <div class="relative h-1/2 w-11/12 max-w-3xl">
          <div
            onClick={preventClose}
            class="flex h-full w-full flex-col bg-white rounded-lg"
          >
            <button onClick={closePopup} class="m-2 w-8 h-8">
              <IconX class="w-8 h-8" />
            </button>
            {popupFlag
              ? (
                <div class="mt-8">
                  <div class="flex justify-center">
                    <IconThumbUp class="w-3/5 h-3/5" />
                  </div>
                  <div class="flex justify-center">
                    <p class="text-xl font-bold text-gray-900">
                      Rental completed！
                    </p>
                  </div>
                </div>
              )
              : (
                <>
                  <div class="flex f-full">
                    <div class="ml-4 mt-4 h-full">
                      {book?.imageURL
                        ? (
                          <img
                            class="object-contain w-full h-full"
                            src={book?.imageURL}
                          />
                        )
                        : (
                          <div>
                            <IconPhoto class="w-full h-full" />
                            <p class="ml-6 text-2xl font-bold text-gray-900">
                              No Image
                            </p>
                          </div>
                        )}
                    </div>
                    <div class="w-1/2">
                      <p class="h-1/4 ml-2 mr-4 text-xl font-bold text-gray-900">
                        {book && book.title.substring(0, 13)}
                      </p>
                      <p class="ml-2 mr-4 text-sm font-light text-gray-900">
                        {book?.description &&
                          `${book.description.substring(0, 100)}・・・`}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col items-center mb-2">
                    <button
                      disabled={isOwn}
                      onClick={() => {
                        console.log("borrow");
                        setBorrow(true);
                      }}
                      class={"flex justify-center items-center absolute bottom-0 bg-white rounded-full w-2/3 h-16 mb-6" +
                        " border-2 border-gray-300 text-xl font-bold text-gray-900 " +
                        (" disabled:bg-gray-100")}
                    >
                      Borrow
                    </button>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPopup;
