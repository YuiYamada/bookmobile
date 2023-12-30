import { Head } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";
import IconBooks from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/books.tsx";

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
        <div class="flex flex-col items-center justify-start mt-60">
          <IconBooks class="w-24 h-24" />
          <p class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
            bookmobile
          </p>
        </div>
        <Button path="/signUpPage" name="Sign Up" />
        <Button path="/loginPage" name="Log In" />
      </main>
    </div>
  );
}
