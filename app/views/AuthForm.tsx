"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/form";
import { Input } from "./components/input";
import Btn from "./Btn";
import { cn } from "../lib/client_utils";
import Image from "next/image";
import { showError } from "../views/Toast";
import { useAuth } from "../contexts/AuthContext";

// Sign-in schema
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Refresh user context to get the user data
      await refreshUser();

      // Redirect to admin dashboard
      router.push("/");
    } catch (error) {
      console.error("Error during authentication:", error);
      showError("Authentication failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <div className="text-center">
          <div>
            <Image
              src="/peoplebank.svg"
              alt="PeopleBank Logo"
              width={250}
              height={30}
              className="mx-auto mb-4"
            />
          </div>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email@domain.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-foreground underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} id="password" type="password" />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Btn
          theme="btn-success"
          type="submit"
          className={cn("w-full", loading && "opacity-50 cursor-not-allowed")}
          disabled={loading}
          isLoading={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Btn>
      </form>
      <div className="mt-4 grid">
        <Btn
          theme="btn-primary"
          onClick={() => router.push("/register_member")}
        >
          Register Member
        </Btn>
      </div>
    </Form>
  );
}
