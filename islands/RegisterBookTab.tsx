import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";
import { GOOGLE_BOOKS_API_PATH } from "../constants.ts";
import { useEffect, useState } from "preact/hooks";
import { Book, GoogleBooksApiResponse } from "../type.ts";
import RegisterPopup from "./RegisterPopup.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";
import Scan from "./Scan.tsx";

const RegisterBookTab = () => {
  const [ISBNcode, setISBNcode] = useState("");
  const [enterCodeToggle, setEnterCodeToggl] = useState(false);
  const [book, setBook] = useState<Book>();
  const [popupFlag, setPopupFlag] = useState<boolean>(false);
  const [notFindBook, setNotFindBook] = useState<boolean>(false);
  const [isScan, setIsScan] = useState<boolean>(false);

  console.log(ISBNcode);

  useEffect(() => {
    const fetchBookData = async () => {
      console.log(GOOGLE_BOOKS_API_PATH + `?q=isbn:${ISBNcode}`);
      const res = await fetchBooks();
      if (res.totalItems == 0) {
        setNotFindBook(true);
      } else {
        const item = res.items[0].volumeInfo;
        const book: Book = {
          title: item.title,
          description: item?.description,
          imageURL: item?.imageLinks?.thumbnail,
          owner: "",
          ISBNcode: item.industryIdentifiers[1].identifier,
        };
        setBook(book);
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
    book && setPopupFlag(true);
  }, [book]);

  return (
    <div class="h-screen">
      {isScan
        ? (
          <Scan
            setIsScan={setIsScan}
            setISBNcode={setISBNcode}
          />
        )
        : (
          <>
            <div class="flex flex-col items-center w-full">
              <button
                onClick={() => {
                  setIsScan(true);
                }}
                class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 my-40 m-8 border-2 border-gray-300
					text-xl font-bold text-gray-900"
              >
                Scan
              </button>
            </div>
            <div class="flex justify-center">
              <div class="flex border-2 mt-12 border-gray-300 rounded-md ">
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
                  value={ISBNcode}
                  onChange={(e) =>
                    setISBNcode((e.target as HTMLInputElement).value)}
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
            <section class="w-full">
              <RegisterPopup
                viewFlag={popupFlag}
                setViewFlag={setPopupFlag}
                book={book}
              />
            </section>
          </>
        )}
    </div>
  );
};
export default RegisterBookTab;
