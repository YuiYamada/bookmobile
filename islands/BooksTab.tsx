import { useEffect, useState } from "preact/hooks";
import { Book } from "../type.ts";
import Card from "./Card.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";

const RegisterBookTab = () => {
  const [books, setBooks] = useState<Book[]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchBooks();
      setBooks(res);
    };
    fetch();
  }, []);

  const fetchBooks = (): Promise<Book[]> => {
    return fetch("/api/fetchBooks")
      .then((res) => {
        return res.json();
      }).catch((error) => {
        console.error("エラーが発生しました", error);
      });
  };

  return (
    <>
      <div class="w-full flex justify-end">
        <div class="flex border-2 m-2 w-1/2 border-gray-300 rounded-md ">
          <button
            onClick={() => {
              console.log("search");
            }}
            class="ml-2"
          >
            <IconSearch class="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery((e.target as HTMLInputElement).value);
              }
            }}
            class="p-2 w-full border-none text-lg text-left outline-none rounded-md"
          />
        </div>
      </div>
      <section class="grid grid-cols-2 h-full w-full">
        {query
          ? books && books.map((book) =>
            book.title.includes(query) ? <Card book={book} /> : ""
          )
          : books && books.map((book) => <Card book={book} />)}
      </section>
    </>
  );
};
export default RegisterBookTab;
