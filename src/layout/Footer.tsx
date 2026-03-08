import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-(--neutral-dark-grey) px-8 py-12">
      <div className="max-w-280 w-full mx-auto flex flex-col gap-12.25">
        <div className="w-full flex flex-col sm:flex-row gap-10 items-center justify-between">
          <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-8">
            <Image
              src={"/logo/svg"}
              alt="Company logo"
              width={105}
              height={24}
            />
            <div className="w-6 h-px sm:w-px sm:h-6 bg-(--neutral-light-grey)"></div>
            <p className="text-sm leading-5.5 text-(--neutral-dark-white)">
              Gift & Decoration Store
            </p>
          </div>
          <nav className="max-w-98 w-full">
            <ul className="flex gap-8 sm:gap-10 items-center flex-col sm:flex-row text-(--neutral-white) text-sm leading-5.5">
              <li>
                <Link href={"/shop"}>Home</Link>
              </li>
              <li>
                <Link href={"/shop/products"}>Shop</Link>
              </li>
              <li>
                <Link href={"/shop/blog"}>Blog</Link>
              </li>
              <li>
                <Link href={"/shop/contact"}>Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center flex-col-reverse sm:flex-row gap-7 text-xs leading-5">
          <p className="text-(--neutral-dark-white)">
            Copyright © 2023 3legant. All rights reserved
          </p>
          <div className="flex items-center gap-7 mr-0 sm:mr-auto text-(--neutral-white) font-bold">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
          </div>
          <div className="flex gap-6 items-center">
            <Link href={"https://instagram.com"}>
              <Image
                src={"/instagram.svg"}
                alt="Instagram icon"
                width={24}
                height={24}
              />
            </Link>
            <Link href={"https://facebook.com"}>
              <Image
                src={"/facebook.svg"}
                alt="facebook icon"
                width={24}
                height={24}
              />
            </Link>
            <Link href={"https://youtube.com"}>
              <Image
                src={"/youtube.svg"}
                alt="youtube icon"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
