"use server";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { requireAuth } from "@/features/auth/api";
import { MySubscription } from "./_components/my-subscription";
import { View } from "@/components/layout/view";
import { SignOutButton } from "@/features/auth/sign-out/components/sign-out-button";

const SettingsPage = async () => {
  const user = await requireAuth();

  return (
    <Main className="flex-grow">
      <Header title="Settings" />
      <View className="justify-between md:justify-start flex-grow w-full">
        <View className="w-full">
          <MySubscription user={user} />
        </View>
        <SignOutButton />
      </View>
    </Main>
  );
};

export default SettingsPage;
