import { useState } from "preact/hooks";
import RegisterBookTab from "./RegisterBookTab.tsx";
import BooksTab from "./BooksTab.tsx";

const Main = () => {
  const [selectTab, setSelectTab] = useState("Books");
  return (
    <>
      <p>{selectTab}</p>
      <div class="flex flex-col items-center justify-start">
        {selectTab === "Books" && <BooksTab />}
        {selectTab === "Return" && <></>}
        {selectTab === "Register" && <RegisterBookTab />}
      </div>
      <div class="h-1/6 sticky bg-white bottom-0">
        <div class="grid grid-cols-3">
          <button class="h-16" onClick={() => setSelectTab("Books")}>
            Books
          </button>
          <button class="h-16" onClick={() => setSelectTab("Return")}>
            Return
          </button>
          <button class="h-16" onClick={() => setSelectTab("Register")}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
