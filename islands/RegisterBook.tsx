import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";
import { useEffect, useState } from "preact/hooks";
const RegisterBook = () => {
  const [ISBNcode, setISBNcode] = useState("");
  const [enterCodeToggle, setEnterCodeToggl] = useState(false);

  useEffect(() => {
    console.log(ISBNcode);
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
        </div>
      </div>
    </>
  );
};
export default RegisterBook;
