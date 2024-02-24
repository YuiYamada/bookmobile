import { useEffect, useState } from "preact/hooks";
import ErrorMessage from "../components/ErrorMessage.tsx";

const SignUp = () => {
  const [name, setName] = useState("");
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [isInputNameError, setIsInputNameError] = useState(false);

  useEffect(() => {
    const get = () => {
      fetch(`/api/signUp?name=${name}`, {
        method: "GET",
        redirect: "follow",
      }).then((res) => {
        console.log(res);
        console.log(res.url);
        if (res.redirected) {
          document.cookie = `name=${name}`;
          window.location.href = res.url;
        } else {
          setIsInputNameError(true);
        }
      });
    };
    name && get();
  }, [signUpToggle]);

  useEffect(() => {
    isInputNameError && console.log("再入力してね");
  }, [isInputNameError]);

  return (
    <>
      <div class="flex flex-col items-center justify-start mt-32 mb-8">
        <p class="text-2xl font-bold text-gray-900 ">
          Sign Up Bookmobile
        </p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          class="p-2 w-2/3 border-2 border-gray-300 rounded-md text-lg mt-16 text-left duration-300 focus:(outline-none border-gray-400)"
        />
        <button
          onClick={() => {
            setSignUpToggle(!signUpToggle);
            setIsInputNameError(false);
          }}
          class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 mt-16 border-2 border-gray-300
					text-xl font-bold text-gray-900"
        >
          Sign Up
        </button>
        <ErrorMessage
          hasError={isInputNameError}
          errorMessage={"すでに登録済みです"}
        />
      </div>

      <div class="flex flex-col items-center justify-start">
        <span class="text-sm font-bold text-gray-300 ">
          Have an account? {""}
          <a
            class="font-bold underline text-gray-900"
            href="/loginPage"
          >
            Log In
          </a>
        </span>
      </div>
    </>
  );
};

export default SignUp;
