"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { sendEmailVerificationCode } from "../server-actions";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-button";
import { useRouter } from "next/navigation";

type Props = {
  prefill?: string;
};

export const SendCodeForm = ({ prefill }: Props) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: prefill ?? "",
    },
  });

  const { executeAsync, isPending } = useAction(sendEmailVerificationCode);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await executeAsync(values);
    if (response?.data?.success) {
      toast.success("Verification code has been sent.");
      const searchParams = new URLSearchParams([["email", values.email]]);
      router.push(`${routes.signIn.root}?${searchParams}`);
    } else {
      toast.error(response?.data?.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-between md:justify-start w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" isLoading={isPending}>
          Send verification code
        </LoadingButton>
      </form>
    </Form>
  );
};
