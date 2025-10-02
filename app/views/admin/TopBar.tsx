// app/views/admin/TopBar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/views/components/sheet";
import Logo from "../logo";
import { DataForm, Field } from "../DataForm";
import Btn from "../Btn";
import { signOutAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { showSuccess } from "../Toast";
import { type Admin } from "@/app/models/interactions/admin";

interface User {
  name: string;
  email: string;
  profileImage: string;
}

interface UserAccountForm extends Record<string, unknown> {
  name: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface TopBarProps {
  user: Admin | null;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
};

const TopBar = ({ user }: TopBarProps) => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<UserAccountForm>({
    defaultValues: {
      name: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      const displayUser: User = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        profileImage: "/user.png",
      };
      form.reset({
        name: displayUser.name,
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, form]);

  if (!user) return null;

  const displayUser: User = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    profileImage: "/user.png",
  };

  const accountFields: Field[] = [
    {
      type: "text",
      name: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
      validation: {
        required: "Name is required",
      },
    },
    {
      type: "password",
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password (optional)",
      validation: {
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      validation: {
        validate: (value: unknown) => {
          const newPassword = form.getValues("newPassword");
          if (newPassword && value !== newPassword) {
            return "Passwords do not match";
          }
          return true;
        },
      },
    },
  ];

  const handleLogout = async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Logout failed:", error);
      showSuccess("Logged out successfully!");
      router.push("/auth/sign-in");
    }
  };

  const handleSubmit = async (data: UserAccountForm) => {
    console.log("Form submitted:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSheetOpen(false);
    alert("Account updated successfully!");
  };

  return (
    <div className="w-full py-2 pl-4 pr-4 flex justify-between items-center z-40">
      <div className="flex gap-3 items-center md:hidden">
        <Logo />
        <span className="text-lg font-medium">
          Shop<span className="font-medium text-[#cf304e]">lift</span>
        </span>
      </div>

      <div className="hidden md:block text-gray-600 dark:text-gray-400 text-lg font-medium">
        {getGreeting()}, {displayUser.name}!
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center">
          <button className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="cursor-pointer flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="md:hidden">
                  <Menu className="w-6 h-6" />
                </span>
                <span className="hidden md:inline">
                  <Image
                    width={28}
                    height={28}
                    src={displayUser.profileImage}
                    alt={`${displayUser.name}'s profile`}
                    className="rounded-full"
                  />
                </span>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {displayUser.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {displayUser.email}
                  </span>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-xl overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  Account Settings
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Update your name and password
                </SheetDescription>
              </SheetHeader>

              <div className="flex gap-4 items-center p-4 border-b">
                <div className="relative">
                  <Image
                    width={50}
                    height={50}
                    src={displayUser.profileImage}
                    alt={`${displayUser.name}'s profile`}
                    className="rounded-full border-4 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {displayUser.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {displayUser.email}
                  </p>
                </div>
              </div>

              <DataForm<UserAccountForm>
                fields={accountFields}
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
                backLabel="Cancel"
                form={form}
                onBack={() => setIsSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative group">
          <Btn
            variant={"outline"}
            onClick={handleLogout}
            className=""
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 text-red-500 hover:text-red-500 transition" />
          </Btn>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
