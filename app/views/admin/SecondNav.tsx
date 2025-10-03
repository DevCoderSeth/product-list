"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./NavLinks";

interface SecondNavProps {
  serviceKey?: "admin";
  isExpanded?: boolean; // Prop to receive sidebar state
  navLocation?: "top" | "side"; // Prop to handle nav location
}

const SecondNav = ({
  serviceKey = "admin",
  isExpanded = true,
  navLocation = "side",
}: SecondNavProps) => {
  const pathname = usePathname();
  const allLinks = navLinks[serviceKey] || [];

  // Find the active main link based on current path
  const activeMainLink = allLinks.find(
    (link) => pathname === link.href || pathname.startsWith(link.href + "/")
  );

  // If no active main link or no sublinks, don't render anything
  if (
    !activeMainLink ||
    !activeMainLink.subLinks ||
    activeMainLink.subLinks.length === 0
  ) {
    return null;
  }

  return (
    <nav
      className={`rounded-md mx-auto  bg-accent-1/3 dark:bg-gray-900 sticky top-0 z-30 transition-all duration-300
        ${
          isExpanded
            ? "md:max-w-[calc(100vw-16rem)]"
            : "md:max-w-[calc(100vw-4rem)]"
        }
        ${navLocation === "top" ? "lg:max-w-full" : ""}`}
    >
      <div className="flex items-center gap-1 px-4 py-2 flex-wrap">
        {activeMainLink.subLinks.map((subLink) => {
          const isActive =
            pathname === subLink.href ||
            pathname.startsWith(subLink.href + "/");

          return (
            <Link
              key={subLink.href}
              href={subLink.href}
              className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md transition-colors ${
                isActive
                  ? "bg-accent-1/10 text-accent-1"
                  : "hover:text-accent-1"
              }`}
            >
              {subLink.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SecondNav;
