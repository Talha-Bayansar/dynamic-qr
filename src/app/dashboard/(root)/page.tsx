"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requireAuth } from "@/features/auth/api";
import { ManageSubscriptionButton } from "@/features/subscription/manage-subscription/components/manage-subscription-button";

const DashboardPage = async () => {
  const user = await requireAuth();

  return (
    <main className="flex flex-col p-4">
      <Card>
        <CardHeader>
          <CardTitle>Team Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
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
    </main>
  );
};

export default DashboardPage;
