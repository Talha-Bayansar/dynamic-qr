import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/db/schema";
import { ManageSubscriptionButton } from "@/features/subscription/manage-subscription/components/manage-subscription-button";

type Props = {
  user: User;
};

export const MySubscription = ({ user }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-medium capitalize">
                Current Plan: {user.planName || "Free"}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.subscriptionStatus === "active"
                  ? "Billed monthly"
                  : user.subscriptionStatus === "trialing"
                  ? "Trial period"
                  : "No active subscription"}
              </p>
            </div>
            <ManageSubscriptionButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
