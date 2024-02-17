import { useEffect, useState } from "preact/hooks";
import { Book } from "../type.ts";
import Card from "./Card.tsx";

const RegisterBookTab = () => {
  const [books, setBooks] = useState<Book[]>();

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
      <section class="grid grid-cols-2 h-full w-full">
        {books && books.map((book) => <Card book={book} />)}
      </section>
    </>
  );
};
export default RegisterBookTab;
