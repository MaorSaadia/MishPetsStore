"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { useUpdateMember } from "@/hooks/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { requiredString } from "@/lib/validation";
import { members } from "@wix/members";

const formSchema = z.object({
  loginEmail: requiredString,
  firstName: z.string(),
  lastName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface MemberInfoFormProps {
  member: members.Member;
}

export default function MemberInfoForm({ member }: MemberInfoFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginEmail: member.loginEmail || "",
      firstName: member.contact?.firstName || "",
      lastName: member.contact?.lastName || "",
    },
  });

  const mutation = useUpdateMember();

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-5"
      >
        <FormField
          control={form.control}
          name="loginEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Login email"
                  type="email"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={mutation.isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}