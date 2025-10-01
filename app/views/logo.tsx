"use client";

import Image from "next/image";
import Link from "next/link";

// === Single Logo === //

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="logo"
        width={30}
        height={30}
        priority
      />
    </Link>
  );
};

export default Logo;

// === Theme Aware Logo === //

/*

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <Link href="/">
      {hydrated ? (
        <Image
          src={resolvedTheme === "dark" ? "/logo-2.png" : "/logo.png"}
          alt="logo"
          width={70}
          height={16}
        />
      ) : (
        <>
          <Image
            src="/logo.png"
            alt="logo"
            width={70}
            height={16}
            className="dark:hidden"
          />
          <Image
            src="/logo-2.png"
            alt="logo"
            width={70}
            height={16}
            className="hidden dark:block"
          />
        </>
      )}
    </Link>
  );
};

export default Logo;

*/
