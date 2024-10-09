import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";
import Image from "next/image";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful QR Code Generation
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform allows you to create both static and dynamic QR
              codes, customize their designs, and track their usage in
              real-time.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Image
            src={PLACEHOLDER_IMAGE_URL}
            width="550"
            height="310"
            alt="QR Code Generation"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Static QR Codes</h3>
                  <p className="text-muted-foreground">
                    Create QR codes that link to a fixed URL or content.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Dynamic QR Codes</h3>
                  <p className="text-muted-foreground">
                    Generate QR codes that can be updated with new content or
                    destinations.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Customization</h3>
                  <p className="text-muted-foreground">
                    Customize the design and branding of your QR codes.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Analytics</h3>
                  <p className="text-muted-foreground">
                    Track usage and engagement with your QR codes.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
