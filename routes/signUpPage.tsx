import SignUp from "../islands/SignUp.tsx";
import Button from "../components/Button.tsx";

export default function loginPage() {
  return (
    <>
      <SignUp />
      <Button path="/mainPage" name="Sign Up" />
    </>
  );
}
