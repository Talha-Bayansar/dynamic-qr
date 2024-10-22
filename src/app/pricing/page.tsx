import { Metadata } from "next";
import { Header } from "../(landing-page)/_components/header";
import { PricingSection } from "../(landing-page)/_components/pricing-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Subscribe and start creating dynamic QR codes.",
};

const PricingPage = () => {
  return (
    <main>
      <Header />
      <PricingSection />
    </main>
  );
};

export default PricingPage;
