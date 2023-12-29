import SignUp from "../islands/SignUp.tsx";

export default function loginPage() {
  return (
    <>
      <SignUp />
      <a
        href="/mainPage"
        class="flex justify-center items-center bg-white rounded-full h-18 border-2 border-gray-300 transition-colors"
      >
        <span class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
          Sign Up
        </span>
      </a>
    </>
  );
}
