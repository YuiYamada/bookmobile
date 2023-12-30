import { Head } from "$fresh/runtime.ts";
import Button from "../components/Button.tsx";

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
        <Button path="/loginPage" name="Log In" />
        <Button path="/signUpPage" name="Sign Up" />
      </main>
    </div>
  );
}
