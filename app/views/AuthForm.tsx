// app/views/AuthForm.tsx
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useState,
  useEffect,
  useActionState,
  useTransition,
  useRef,
} from "react";
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
import { showError, showSuccess } from "../views/Toast";
import { FormDialog, Step } from "./admin/FormDialog";
import { requestFormSteps } from "../configs/forms/request-account";
import { signInAction } from "../actions/auth";

// Sign-in schema
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type RequestData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

// Initial state for useActionState
const initialState = {
  error: undefined,
  success: undefined,
};

export function AuthForm() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(signInAction, initialState);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [localLoading, setLocalLoading] = useState(false);
  const loading = localLoading || isPending;

  const lastErrorRef = useRef<string | null>(null);
  const lastSuccessRef = useRef<boolean | null>(null);

  // Handle server errors, success, and stop loading
  useEffect(() => {
    console.log("=== AUTH FORM DEBUG ===");
    console.log("State:", state);
    console.log("isPending:", isPending);
    console.log("localLoading:", localLoading);

    if (state.error && state.error !== lastErrorRef.current) {
      console.log("Showing error:", state.error);
      showError(state.error);
      lastErrorRef.current = state.error;
      setLocalLoading(false);
    } else if (state.success && state.success !== lastSuccessRef.current) {
      console.log("Success! Redirecting...");
      showSuccess("Signed in successfully!");
      lastSuccessRef.current = state.success;
      setLocalLoading(false);

      // Add a small delay to ensure cookie is set
      setTimeout(() => {
        console.log("Navigating to dashboard...");
        window.location.href = "/admin/dashboard";
      }, 100);
    } else if (!isPending && localLoading) {
      setLocalLoading(false);
    }
  }, [state, isPending, localLoading]);

  // Client-side validation and Server Action dispatch
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log("=== FORM SUBMIT ===");
    console.log("Email:", values.email);

    // Reset refs before new submission to allow new toasts
    lastErrorRef.current = null;
    lastSuccessRef.current = null;

    setLocalLoading(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    // Dispatch the Server Action within a transition
    startTransition(async () => {
      await formAction(formData);
    });
  }

  async function handleRequestSubmit(data: Partial<RequestData>) {
    try {
      const response = await fetch("/api/auth/request-account", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        showError(result.error || "Failed to request account");
        return;
      }

      showSuccess("Account request submitted successfully!");
      setRequestDialogOpen(false);
    } catch (error) {
      console.error("Error during account request:", error);
      showError("Failed to submit request. Please try again.");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full text-gray-600"
        >
          <div className="text-center">
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
                      className="text-sm text-gray-600 underline"
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
          <Btn theme="btn-primary" onClick={() => setRequestDialogOpen(true)}>
            Request Account
          </Btn>
        </div>
      </Form>

      <FormDialog<RequestData>
        open={requestDialogOpen}
        onOpenChange={setRequestDialogOpen}
        mode="create"
        title="Request Account"
        steps={requestFormSteps as Step[]}
        initialData={{}}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
}
