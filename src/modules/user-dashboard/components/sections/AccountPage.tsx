import { UpdateProfileForm } from "./UpdateProfileForm";
import { PasswordForm } from "./PasswordForm";

export default function AccountPage() {
  return (
    <div className="w-full flex flex-col gap-10">
      <UpdateProfileForm />
      <PasswordForm />
    </div>
  );
}
