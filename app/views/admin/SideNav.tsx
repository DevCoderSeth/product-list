"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./NavLinks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Btn from "../Btn";
import Logo from "../logo";

// Define props for SideNav
interface SideNavProps {
  serviceKey: string;
  isExpanded?: boolean;
  toggleSidebar?: () => void;
}

const SideNav = ({
  serviceKey,
  isExpanded = true,
  toggleSidebar,
}: SideNavProps) => {
  const pathname = usePathname();
  const allLinks = navLinks[serviceKey] || [];

  const businessLinks = allLinks.filter(
    (link) => !["Settings", "Logout"].includes(link.label)
  );
  const systemLinks = allLinks.filter((link) =>
    ["Settings", "Logout"].includes(link.label)
  );

  return (
    <aside
      className={`fixed bg-gray-50 text-gray-600 dark:text-gray-400 top-0 left-0 h-screen p-4 shadow-sm flex flex-col z-40 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } hidden md:flex`}
    >
      <div className="flex items-center w-full mb-4 sticky top-4 z-50">
        <Logo />
        {isExpanded && (
          <span className="ml-3 text-lg font-semibold">
            Shop<span className="text-[#f04a71]">lift</span>
          </span>
        )}
      </div>

      <nav className="flex flex-1 overflow-y-auto flex-col space-y-1 w-full">
        {businessLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center p-2 rounded-md transition ${
              pathname === link.href
                ? "bg-secondary text-accent-1"
                : "hover:text-accent-1"
            }`}
          >
            <link.icon className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-4">{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <nav className="flex-col w-full">
          {systemLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center p-2 rounded-md transition ${
                pathname === link.href
                  ? "bg-secondary text-accent-1"
                  : "hover:text-accent-1"
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span className="ml-4">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      {/* Repositioned toggle button to the right edge */}
      <Btn
        rounded="full"
        theme="btn-secondary"
        onClick={toggleSidebar}
        className="absolute top-7 right-[-16px] transition transform -translate-y-1/2"
      >
        {isExpanded ? (
          <ChevronLeft className="w-8 h-8" />
        ) : (
          <ChevronRight className="w-8 h-8" />
        )}
      </Btn>
    </aside>
  );
};

export default SideNav;
