import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";
import { GOOGLE_BOOKS_API_PATH } from "../constants.ts";
import { useEffect, useState } from "preact/hooks";
import { GoogleBooksApiresponse, Item } from "../type.ts";
const RegisterBook = () => {
  const [ISBNcode, setISBNcode] = useState("");
  const [enterCodeToggle, setEnterCodeToggl] = useState(false);
  const [apiResponse, setApiResponse] = useState<Item>();

  useEffect(() => {
    const fetchBookData = async () => {
      console.log(GOOGLE_BOOKS_API_PATH + `?q=isbn:${ISBNcode}`);
      const fetchBooks = (): Promise<GoogleBooksApiresponse> => {
        return fetch(
          GOOGLE_BOOKS_API_PATH + `?q=isbn:${ISBNcode}`,
        ).then((res) => {
          return res.json();
        }).catch((error) => {
          console.error("エラーが発生しました", error);
        });
      };
      const res = await fetchBooks();
      res.totalItems > 0 && setApiResponse(res.items[0]);
    };
    ISBNcode && fetchBookData();
  }, [enterCodeToggle]);

  return (
    <>
      <div class="flex justify-center">
        <div class="flex border-2 border-gray-300 rounded-md ">
          <button
            onClick={() => {
              console.log(ISBNcode);
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
          {apiResponse && (
            <img src={apiResponse.volumeInfo.imageLinks.thumbnail} />
          )}
        </div>
      </div>
    </>
  );
};
export default RegisterBook;
