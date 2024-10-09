import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

type SubscriptionPlan = {
  title: string;
  slogan: string;
  price: number;
  features: string[];
  buttonText: string;
  buttonLink: string;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: "Free",
    slogan: "Get started for free",
    price: 0,
    features: [
      "Create up to 100 static QR codes",
      "Basic design customization",
      "Limited analytics",
    ],
    buttonText: "Get started",
    buttonLink: "#",
  },
  {
    title: "Pro",
    slogan: "For growing businesses",
    price: 19,
    features: [
      "Create unlimited static QR codes",
      "Advanced design customization",
      "Detailed analytics and reporting",
      "Dynamic QR code creation",
    ],
    buttonText: "Upgrade to Pro",
    buttonLink: "#",
  },
];

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Affordable Pricing for Every Business
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs and budget. Get started with
              our free plan or upgrade to a paid plan for more features and
              usage.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl items-stretch gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          {subscriptionPlans.map((subscription) => (
            <SubscriptionPlanCard key={subscription.title} {...subscription} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SubscriptionPlanCard = ({
  title,
  slogan,
  price,
  features,
  buttonText,
  buttonLink,
}: SubscriptionPlan) => {
  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-4 justify-between h-full">
        <div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{slogan}</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold">${price}</p>
            <p className="text-muted-foreground text-sm">per month</p>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index}>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full">{buttonText}</Button>
      </div>
    </div>
  );
};
