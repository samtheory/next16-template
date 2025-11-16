"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, contactResponseSchema, type ContactFormValues } from "../schemas";
import { apiClient } from "@/lib/api/client";

const budgets = [
  { label: "Under $10k", value: "under-10k" },
  { label: "$10k - $25k", value: "10-25k" },
  { label: "$25k+", value: "25k+" }
] as const;

export function ExampleForm() {
  const [result, setResult] = useState<string | null>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: undefined,
      message: ""
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setResult(null);
    const response = await apiClient({
      path: "/forms/example",
      method: "POST",
      body: values,
      schema: contactResponseSchema
    });
    setResult(response.message);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example form</CardTitle>
        <CardDescription>
          Validated through Zod + React Hook Form, then posted to the API client using the shared
          base URL constant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Ada Lovelace" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="ada@example.com" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {budgets.map((budget) => (
                <label
                  key={budget.value}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                >
                  <input
                    type="radio"
                    value={budget.value}
                    {...form.register("budget")}
                    className="rounded border"
                  />
                  {budget.label}
                </label>
              ))}
            </div>
            {form.formState.errors.budget ? (
              <p className="text-sm text-red-600">{form.formState.errors.budget.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Project details</Label>
            <Textarea id="message" rows={4} placeholder="Share the goals…" {...form.register("message")} />
            {form.formState.errors.message ? (
              <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
            ) : null}
          </div>
          <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Sending…" : "Send request"}
          </Button>
          {result ? <p className="text-sm text-muted-foreground">{result}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
