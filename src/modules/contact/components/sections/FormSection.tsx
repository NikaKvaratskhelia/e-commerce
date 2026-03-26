import { ContactForm } from "../common/Form";

export function FormSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-8 w1120:px-0 max-w-280 w-full mx-auto pb-20">
      <ContactForm />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47628.7811487706!2d44.751257599999995!3d41.746432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d27c088e619%3A0x85df45e4dde9bf15!2sMarjanishvili!5e0!3m2!1sen!2sge!4v1773610419373!5m2!1sen!2sge"
        className="w-full h-full min-h-70 row-[1/2] sm:col-[2/3]"
        loading="lazy"
      ></iframe>
    </div>
  );
}
