import { useState } from "preact/hooks";
import RegisterBookTab from "./RegisterBookTab.tsx";
import BooksTab from "./BooksTab.tsx";
import IconBooks from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/books.tsx";
import IconArrowBack from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/arrow-back.tsx";
import IconBarcode from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/barcode.tsx";

const Main = () => {
  const [selectTab, setSelectTab] = useState("Books");
  return (
    <>
      <div class="h-full flex flex-col items-center justify-start">
        {selectTab === "Books" && <BooksTab />}
        {selectTab === "Return" && <></>}
        {selectTab === "Register" && <RegisterBookTab />}
      </div>
      <div class="h-1/6 sticky bg-white bottom-0">
        <div class="h-full grid grid-cols-3">
          <div
            class={"h-full flex items-center justify-center " +
              (selectTab === "Books" && "border-t-4 border-purple-400")}
          >
            <div class="flex items-center h-full">
              <IconBooks class="m-1 w-8 h-8" />
            </div>
            <button class="h-16" onClick={() => setSelectTab("Books")}>
              Books
            </button>
          </div>
          <div
            class={"h-full flex items-center justify-center " +
              (selectTab === "Return" && "border-t-4 border-purple-400")}
          >
            <div class="flex items-center h-full">
              <IconArrowBack class="m-1 w-8 h-8" />
            </div>
            <button class="h-16" onClick={() => setSelectTab("Return")}>
              Return
            </button>
          </div>
          <div
            class={"h-full flex items-center justify-center " +
              (selectTab === "Register" && "border-t-4 border-purple-400")}
          >
            <div class="flex items-center h-full">
              <IconBarcode class="m-1 w-8 h-8" />
            </div>
            <button class="h-16" onClick={() => setSelectTab("Register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
