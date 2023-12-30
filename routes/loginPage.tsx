import Login from "../islands/Login.tsx";
import Button from "../components/Button.tsx";

export default function loginPage() {
  return (
    <>
      <Login />
      <Button path="/mainPage" name="Log In" />
    </>
  );
}
