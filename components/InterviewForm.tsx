"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  type: z.enum(["technical", "behavioural", "mixed"]),
  role: z.string().min(2),
  level: z.string().min(2),
  techstack: z.string().min(2),
  amount: z.string(),
});

export default function InterviewForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "technical",
      role: "",
      level: "",
      techstack: "",
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        body: JSON.stringify({ ...values, userid: userId }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Interview Created! Redirecting to home. Start your interview from your card.",
          { duration: 5000 }
        );
        setTimeout(() => {
          router.push("/"); // or whatever your homepage route is
        }, 2000);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl bg-gradient-to-b from-dark-300 to-dark-100 p-8 rounded-2xl border border-purple-500/30 shadow-xl "
      >
        <h2 className="text-2xl font-bold text-primary-200 mb-2">
          🧠 Train Your Interview
        </h2>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What role would you like to train for?</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Frontend Developer"
                  className="bg-dark-200"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-muted-foreground text-sm">
                The position you're targeting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Are you aiming for a technical, behavioral or mixed interview?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-dark-200">
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioural">Behavioral</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-muted-foreground text-sm">
                Pick what kind of interview you want to simulate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is the experience level for this job?</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Entry level, Mid, Senior"
                  className="bg-dark-200"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-muted-foreground text-sm">
                Specify job seniority level.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techstack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What technologies should the interview cover?
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="bg-dark-200"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-muted-foreground text-sm">
                List tech keywords separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How many questions should I generate for you?
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  min={1}
                  max={20}
                  placeholder="e.g., 10"
                  className="bg-dark-200"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-muted-foreground text-sm">
                Max 20 questions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80"
        >
          {loading ? "Generating Interview..." : "Generate Interview"}
        </Button>
      </form>
    </Form>
  );
}
