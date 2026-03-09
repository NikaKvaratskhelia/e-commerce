import Link from "next/link";
import Image from "next/image";

type Props = {
  isAuthenticated: boolean;
};

export default function UserProfileLink({ isAuthenticated }: Props) {
  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="py-2.5 px-6.5 bg-(--primary) text-white text-[18px] leading-8 font-medium text-center rounded-lg"
      >
        Sign In
      </Link>
    );
  }

  return (
    <Link
      href="/shop/dashboard"
      className="flex justify-between items-center text-[18px] leading-8 pb-2 border-b border-(--neutral-dark-white)"
    >
      User
      <Image src="/user-circle.svg" alt="User icon" width={24} height={24} />
    </Link>
  );
}
