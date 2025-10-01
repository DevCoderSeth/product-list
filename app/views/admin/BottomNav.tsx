"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/app/views/components/sheet";
import { navLinks } from "./NavLinks";
import Logo from "../logo";

// Define the shape of a single navigation link
interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  requiredPermission?: string;
  subLinks?: { label: string; href: string; requiredPermission?: string }[];
}

// Define the shape of navLinks
interface NavLinks {
  [key: string]: NavLink[];
}

// Define props for BottomNav
interface BottomNavProps {
  serviceKey: string;
}

const BottomNav = ({ serviceKey = "admin" }: BottomNavProps) => {
  const pathname = usePathname();
  const navLinksArray = Array.isArray(navLinks[serviceKey])
    ? navLinks[serviceKey]
    : [];

  return (
    <nav className="md:hidden fixed bottom-0 border-t border-muted-foreground/30 left-0 right-0 z-50 bg-secondary shadow-md p-2 flex justify-between">
      {/* Render first 3 links directly */}
      {navLinksArray.length > 0 &&
        navLinksArray.slice(0, 3).map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center text-xs gap-1 px-2 py-1 rounded-md transition ${
                isActive ? "text-accent-1" : "text-muted-foreground"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
            </Link>
          );
        })}

      {/* Menu Trigger with Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex flex-col items-center text-xs gap-1 px-2 py-1 rounded-md text-muted-foreground hover:text-accent-1 transition">
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-secondary px-3">
          <SheetHeader>
            <SheetTitle className="flex gap-3 items-center">
              <Logo />
              <span className="text-lg font-medium">
                Shop<span className="font-medium text-[#cf304e]">lift</span>
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto flex-col gap-2">
            {navLinksArray.length > 0 &&
              navLinksArray.map(({ label, href, icon: Icon }) => (
                <SheetTrigger asChild key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-3 py-2 rounded-md transition ${
                      pathname === href
                        ? "bg-secondary text-accent-1"
                        : "hover:text-accent-1"
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5 mr-2" />}
                    {label}
                  </Link>
                </SheetTrigger>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default BottomNav;
