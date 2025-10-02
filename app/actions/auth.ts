// app/actions/auth.ts
"use server";

import { signInRecord } from "@/app/lib/server_utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState = { error?: string; success?: boolean };

export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    await signInRecord({ email, password });
    return { success: true };
  } catch (error) {
    const message = (error as Error).message || "Sign-in failed";
    return { error: message };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  redirect("/auth/sign-in");
}
