import { QrCodeGenerator } from "@/app/static-qr-code/_components/qr-code-generator";
import { Header } from "../(landing-page)/_components/header";
import { Footer } from "../(landing-page)/_components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR code generator",
  description: "Generate QR codes for free.",
};

const StaticQRCodePage = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Generate QR Codes Instantly
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create custom QR codes for URLs, text, contact info, and more - all
            for free!
          </p>
        </section>

        <section className="mb-12">
          <QrCodeGenerator />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
            <li>
              Choose the type of QR code you want to create from the tabs.
            </li>
            <li>Enter the required information in the input fields.</li>
            <li>Your QR code will be generated instantly as you type.</li>
            <li>Download or share your QR code directly from the generator.</li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StaticQRCodePage;
