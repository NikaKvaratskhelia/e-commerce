import { AboutUs } from "./components/sections/AboutUs";
import { ContactusCardsLayout } from "./components/sections/ContactusCardsLayout";
import { FormSection } from "./components/sections/FormSection";
import { Hero } from "./components/sections/Hero";
import { InfoCardsLayout } from "./components/sections/InfoCardsLayout";

export default function ContactUsPage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <ContactusCardsLayout />
      <FormSection />
      <InfoCardsLayout />
    </>
  );
}
