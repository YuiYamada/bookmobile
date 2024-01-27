import { useState } from "preact/hooks";
import RegisterBook from "./RegisterBook.tsx";

const Main = () => {
  const [selectTab, setSelectTab] = useState("Books");
  return (
    <>
      <p>{selectTab}</p>
      <div class="flex flex-col items-center justify-start my-40">
        {selectTab === "Register" && <RegisterBook />}
      </div>
      <div class="absolute inset-x-0 bottom-0">
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
