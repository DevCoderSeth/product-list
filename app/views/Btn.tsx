// app/views/Btn.tsx

"use client";

import {
  buttonVariants,
  Button as BaseButton,
} from "@/app/views/components/button";
import { cn } from "@/app/lib/client_utils";
import { Loader2 } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { ReactNode, ComponentPropsWithoutRef } from "react";

// Support either a simple icon or an interactive button with icon + handler
type IconProp =
  | ReactNode
  | {
      icon: ReactNode;
      onClick?: () => void;
    };

interface BtnProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  rounded?: "sm" | "md" | "full";
  textSize?: "sm" | "base" | "lg" | "xl";
  theme?: "btn-primary" | "btn-secondary" | "btn-success" | "btn-outline";
  count?: number;
  asChild?: boolean;
  cursorOnHover?: string;
}

const Btn = ({
  children,
  className,
  variant,
  size,
  isLoading = false,
  rounded = "md",
  textSize = "base",
  theme,
  count,
  iconLeft,
  iconRight,
  asChild = false,
  cursorOnHover = "true",
  ...props
}: BtnProps) => {
  const roundedClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "sm"
      ? "rounded-sm"
      : "rounded-md";

  const textSizeClass =
    textSize === "sm"
      ? "text-sm"
      : textSize === "lg"
      ? "text-lg"
      : textSize === "xl"
      ? "text-xl"
      : "text-base";

  const cursorClass =
    cursorOnHover === "true"
      ? "cursor-pointer"
      : cursorOnHover === "false"
      ? "cursor-auto"
      : cursorOnHover
      ? `cursor-${cursorOnHover}`
      : "cursor-pointer";

  // Render logic for iconLeft and iconRight
  const renderIcon = (iconProp: IconProp, position: "left" | "right") => {
    const marginClass = position === "left" ? "mr-1" : "ml-1";

    if (!iconProp) return null;

    if (typeof iconProp === "object" && "icon" in iconProp) {
      return (
        <button
          type="button"
          onClick={iconProp.onClick}
          className={cn(
            "p-1 rounded hover:bg-black/10 dark:hover:bg-white/10",
            marginClass
          )}
        >
          {iconProp.icon}
        </button>
      );
    }

    return <span className={marginClass}>{iconProp}</span>;
  };

  return (
    <BaseButton
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={isLoading || props.disabled}
      className={cn(
        buttonVariants({ variant, size }),
        roundedClass,
        textSizeClass,
        theme && theme,
        cursorClass,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <>
          {renderIcon(iconLeft, "left")}
          {children}
          {count !== undefined && (
            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
              {count}
            </span>
          )}
          {renderIcon(iconRight, "right")}
        </>
      )}
    </BaseButton>
  );
};

export default Btn;
