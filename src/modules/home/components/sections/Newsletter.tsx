import { NewsletterForm } from "../common/NewsletterForm";

export function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-8 justify-center w-full mt-10 sm:mt-20 px-8 py-23.75 bg-[url('/newsletterBg.png')] bg-cover bg-center">
      <div className="text-center flex flex-col items-center justify-center gap-2">
        <h1 className="text-[28px] sm:text-[40px]  leading-8.5 sm:leading-11 font-medium tracking-[-0.4px]">
          Join Our Newsletter
        </h1>
        <p className="text-sm sm:text-[18px] leading-7.5 tracking-[0px]">
          Sign up for deals, new products and promotions
        </p>
      </div>
      <NewsletterForm />
    </div>
  );
}
