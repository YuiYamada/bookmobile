import { useEffect, useState } from "preact/hooks";
import ErrorMessage from "../components/ErrorMessage.tsx";

const Login = () => {
  const [name, setName] = useState("");
  const [logInToggle, setLogInToggle] = useState(false);
  const [isInputNameError, setIsInputNameError] = useState(false);

  useEffect(() => {
    const get = () => {
      fetch(`/api/logIn?name=${name}`, {
        method: "GET",
        redirect: "follow",
      }).then((res) => {
        console.log(res);
        console.log(res.url);
        if (res.redirected) {
          window.location.href = res.url;
        } else {
          setIsInputNameError(true);
        }
      });
    };
    name && get();
  }, [logInToggle]);

  useEffect(() => {
    isInputNameError && console.log("再入力してね");
  }, [isInputNameError]);
  return (
    <div class="flex flex-col items-center justify-start my-32">
      <p class="text-2xl font-bold text-gray-900 ">
        Log In Bookmobile
      </p>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
        class="p-2 w-2/3 border-2 border-gray-300 rounded-md text-lg mt-16 text-left duration-300 focus:(outline-none border-gray-400)"
      />
      <button
        onClick={() => {
          setLogInToggle(!logInToggle);
          setIsInputNameError(false);
        }}
        class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 mt-16 border-2 border-gray-300
					text-xl font-bold text-gray-900"
      >
        Log In
      </button>
      <ErrorMessage
        hasError={isInputNameError}
        errorMessage={"ユーザが存在しません"}
      />
    </div>
  );
};

export default Login;
