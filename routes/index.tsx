import { Head } from "$fresh/runtime.ts";

export default function index() {
  return (
    <div>
      <Head>
        <title>bookmobile</title>
        <meta
          name="description"
          content="Rent and return books anytime, anywhere."
        />
      </Head>
      <main>
        <a
          href="/loginPage"
          class="flex justify-center items-center bg-white rounded-full h-18 border-2 border-gray-300 transition-colors"
        >
          <span class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
            Log In
          </span>
        </a>
        <a
          href="/signUpPage"
          class="flex justify-center items-center bg-white rounded-full h-18 border-2 border-gray-300 transition-colors"
        >
          <span class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
            Sign Up
          </span>
        </a>
      </main>
    </div>
  );
}
