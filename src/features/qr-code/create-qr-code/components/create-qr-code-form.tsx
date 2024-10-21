"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/loading-button";
import { useAction } from "next-safe-action/hooks";
import { createQRCode } from "../api";
import { toast } from "sonner";
import { DynamicQRType } from "../../models";
import { DynamicQRCodeInput } from "../../components/dynamic-qr-code-input";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  type: z.nativeEnum(DynamicQRType),
});

type Props = {
  onSuccess?: () => void;
};

export const CreateQRCodeForm = ({ onSuccess }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      type: DynamicQRType.URL_LIST,
    },
  });

  const { executeAsync, isPending } = useAction(createQRCode);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await executeAsync(values);

    if (response?.data?.success) {
      toast.success("Dynamic QR Code created");
      onSuccess?.();
    } else {
      toast.error(response?.data?.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 overflow-x-hidden p-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>This is your QR Code name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DynamicQRCodeInput
                  value={field.value}
                  type={form.getValues("type") as DynamicQRType}
                  onChange={(value, type) => {
                    field.onChange(value);
                    form.setValue("type", type);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isPending}>Create</LoadingButton>
      </form>
    </Form>
  );
};
