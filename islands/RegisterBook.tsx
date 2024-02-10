import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";
import { GOOGLE_BOOKS_API_PATH } from "../constants.ts";
import { useEffect, useState } from "preact/hooks";
import { GoogleBooksApiResponse, Item } from "../type.ts";
import { Popup } from "./Popup.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";

const RegisterBook = () => {
  const [ISBNcode, setISBNcode] = useState("");
  const [enterCodeToggle, setEnterCodeToggl] = useState(false);
  const [item, setItem] = useState<Item>();
  const [popupFlag, setPopupFlag] = useState<boolean>(false);
  const [notFindBook, setNotFindBook] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookData = async () => {
      console.log(GOOGLE_BOOKS_API_PATH + `?q=isbn:${ISBNcode}`);
      const res = await fetchBooks();
      if (res.totalItems == 0) {
        setNotFindBook(true);
      } else {
        setItem(res.items[0]);
        setNotFindBook(false);
      }
    };
    ISBNcode && fetchBookData();
  }, [enterCodeToggle]);

  const fetchBooks = (): Promise<GoogleBooksApiResponse> => {
    return fetch(
      GOOGLE_BOOKS_API_PATH + `?q=isbn:${ISBNcode}`,
    ).then((res) => {
      return res.json();
    }).catch((error) => {
      console.error("エラーが発生しました", error);
    });
  };

  useEffect(() => {
    item && setPopupFlag(true);
  }, [item]);

  return (
    <>
      <div class="flex justify-center">
        <div class="flex border-2 border-gray-300 rounded-md ">
          <button
            onClick={() => {
              console.log(ISBNcode);
              setEnterCodeToggl(!enterCodeToggle);
            }}
            class="ml-2"
          >
            <IconSearch class="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder=" ISBN code"
            onChange={(e) => setISBNcode((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setISBNcode((e.target as HTMLInputElement).value);
                setEnterCodeToggl(!enterCodeToggle);
              }
            }}
            class="p-2 w-2/3 border-none text-lg text-left outline-none"
          />
        </div>
      </div>
      <ErrorMessage
        hasError={notFindBook}
        errorMessage={"本が見つかりませんでした"}
      />
      <section className="h-[2000px] w-full">
        <Popup viewFlag={popupFlag} setViewFlag={setPopupFlag} item={item} />
      </section>
    </>
  );
};
export default RegisterBook;
