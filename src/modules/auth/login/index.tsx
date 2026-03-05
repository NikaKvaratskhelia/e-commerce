import { FormAside } from "../components/FormAside";
import { LoginForm } from "./components/Form";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center ">
      <FormAside />
      <LoginForm />
    </div>
  );
}
