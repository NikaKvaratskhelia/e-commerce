import { Input } from "./Input";

export function ContactForm() {
  return (
    <div className="max-w-160.75 w-full flex flex-col gap-6 px-4 sm:px-6 py-6 sm:py-10 border border-(--neutral-light-grey) rounded-sm">
      <h2 className="leading-6.5 sm:leading-7 sm:text-xl font-medium">
        Contact Information
      </h2>

      <div className="flex flex-col gap-6">
        <div className="w-full flex justify-between gap-2 sm:gap-6">
          <Input
            type="text"
            id="firstName"
            label="FIRST NAME"
            placeholder="First Name"
          />

          <Input
            type="text"
            id="lastName"
            label="LAST NAME"
            placeholder="Last Name"
          />
        </div>

        <Input
          type="tel"
          id="phoneNum"
          label="PHONE NUMBER"
          placeholder="Phone Number"
        />

        <Input
          type="email"
          id="email"
          label="EMAIL ADDRESS"
          placeholder="Your Email"
        />
      </div>
    </div>
  );
}
