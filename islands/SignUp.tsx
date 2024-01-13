import { useEffect, useState } from "preact/hooks";

const SignUp = () => {
  const [name, setName] = useState("");
  const [signUpToggle, setSignUpToggle] = useState(false);
  useEffect(() => {
    const get = async () => {
      const res = await fetch(`/api/denokv?name=${name}`);
      console.log(await res.json());
    };
    name && get();
  }, [signUpToggle]);

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
          }}
          class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 mt-16 border-2 border-gray-300
					text-xl font-bold text-gray-900"
        >
          Sign Up
        </button>
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
