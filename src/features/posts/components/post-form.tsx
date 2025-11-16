"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreatePost } from "../hooks/use-posts";
import { postFormSchema, type PostFormValues } from "../schemas";

export function PostForm() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { title: "", body: "" }
  });
  const { mutateAsync, isPending } = useCreatePost();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const onSubmit = async (values: PostFormValues) => {
    setStatusMessage(null);
    try {
      await mutateAsync(values);
      setStatusMessage("Post stored locally. Replace the API call to talk to your backend.");
      form.reset();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a post</CardTitle>
        <CardDescription>React Hook Form + Zod powering client form validation.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="i.e. How we ship features" {...form.register("title")} />
            {form.formState.errors.title ? (
              <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              rows={5}
              placeholder="Summarise your idea..."
              {...form.register("body")}
            />
            {form.formState.errors.body ? (
              <p className="text-sm text-red-600">{form.formState.errors.body.message}</p>
            ) : null}
          </div>
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "Saving…" : "Create post"}
          </Button>
          {statusMessage ? <p className="text-sm text-muted-foreground">{statusMessage}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
