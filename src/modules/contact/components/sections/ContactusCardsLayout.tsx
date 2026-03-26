import { Mail, Store } from "lucide-react";
import { ContactUsCard } from "../common/ContactUsCard";
import Image from "next/image";

export function ContactusCardsLayout() {
  return (
    <div className="flex flex-col gap-6 items-center my-12">
      <h2 className="text-[20px] sm:text-[40px] leading-7 sm:leading-11">
        Contact Us
      </h2>
      <div className="max-w-280 mx-auto w-full grid grid-cols-[repeat(auto-fit,minmax(216px,1fr))] justify-items-center gap-6 px-8 w1120:px-0">
        <ContactUsCard
          icon={<Store width={32} height={32} />}
          header={"ADDRESS"}
          text={"234 Hai Trieu, Ho Chi Minh City, Vietnam"}
        />
        <ContactUsCard
          icon={
            <Image
              src={"/phone.svg"}
              alt={"Phone svg"}
              width={32}
              height={32}
            />
          }
          header={"CONTACT US"}
          text={"+84 234 567 890"}
        />
        <ContactUsCard
          icon={<Mail width={32} height={32} />}
          header={"EMAIL"}
          text={"hello@3legant.com"}
        />
      </div>
    </div>
  );
}
