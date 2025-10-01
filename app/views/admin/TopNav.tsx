"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { navLinks } from "./NavLinks";
import Logo from "../logo";
import Image from "next/image";
import Btn from "../Btn";

interface TopNavProps {
  serviceKey?: string;
}

const TopNav = ({ serviceKey = "admin" }: TopNavProps) => {
  const pathname = usePathname();
  const filteredLinks = navLinks[serviceKey] || [];

  // Mock user data - replace with actual user data from auth context/session
  const user = {
    firstname: "System",
    username: "admin@system.local",
    group_name: "System Administrator",
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <header className="hidden lg:flex bg-secondary px-2 lg:px-5 items-center justify-between fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex gap-3 items-center">
        <Logo />
        <span className="text-lg font-medium">
          Shop<span className="font-medium text-[#cf304e]">lift</span>
        </span>
      </div>

      <nav className="relative flex items-center gap-4 h-full">
        {filteredLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`relative px-3 py-4 flex items-center gap-2 text-sm transition-colors h-full ${
                isActive
                  ? "text-accent-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-1 rounded animate-slide-in" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative group">
          <Image
            src="/user.png"
            alt={`${user.firstname}'s profile`}
            width={38}
            height={38}
            className="rounded-md object-cover cursor-pointer"
          />
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
            {user.username}
          </div>
        </div>

        <div className="flex flex-col text-sm">
          <span className="font-medium text-accent-1">{user.username}</span>
          <span className="text-xs text-muted-foreground">
            {user.group_name}
          </span>
        </div>

        <div className="relative group">
          <Btn
            variant={"outline"}
            onClick={handleLogout}
            className=""
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 text-foreground hover:text-red-500 transition" />
          </Btn>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
