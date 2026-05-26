"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export type ButtonVariant = "primary" | "outline" | "ghost" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-cyan text-bg-primary font-semibold",
    "shadow-[0_0_24px_rgba(0,245,255,0.3)]",
    "hover:shadow-[0_0_36px_rgba(0,245,255,0.5)] hover:brightness-110",
    "transition-all duration-200",
  ].join(" "),
  outline: [
    "border border-cyan text-cyan bg-transparent",
    "hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]",
    "transition-all duration-200",
  ].join(" "),
  ghost: [
    "text-muted bg-transparent",
    "hover:text-white hover:bg-white/5",
    "transition-all duration-200",
  ].join(" "),
  gold: [
    "bg-gold text-bg-primary font-semibold",
    "shadow-[0_0_24px_rgba(255,184,0,0.3)]",
    "hover:shadow-[0_0_36px_rgba(255,184,0,0.5)] hover:brightness-110",
    "transition-all duration-200",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8  px-4 text-sm  rounded-md gap-1.5",
  md: "h-10 px-5 text-sm  rounded-lg gap-2",
  lg: "h-12 px-7 text-base rounded-lg gap-2",
};

const base =
  "inline-flex items-center justify-center font-medium whitespace-nowrap select-none cursor-pointer " +
  "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

const hoverMotion = { scale: 1.03 } as const;
const tapMotion = { scale: 0.97 } as const;
const spring = { type: "spring", stiffness: 400, damping: 20 } as const;

// ── Props ─────────────────────────────────────────────────────────────────────

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Use HTMLMotionProps so Framer Motion's event types (onDrag, etc.) win over React's
type AsButton = SharedProps &
  Omit<HTMLMotionProps<"button">, keyof SharedProps> & {
    href?: undefined;
  };

type AsLink = SharedProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export type ButtonProps = AsButton | AsLink;

// ── Component ─────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      base,
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if ("href" in props && props.href) {
      const { href, external, ...rest } = props as AsLink;
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            whileHover={hoverMotion}
            whileTap={tapMotion}
            transition={spring}
            {...rest}
          >
            {children}
          </motion.a>
        );
      }
      return (
        <MotionLink
          href={href}
          className={classes}
          whileHover={hoverMotion}
          whileTap={tapMotion}
          transition={spring}
          {...rest}
        >
          {children}
        </MotionLink>
      );
    }

    const { href: _h, ...buttonRest } = props as AsButton & {
      href?: undefined;
    };
    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={hoverMotion}
        whileTap={tapMotion}
        transition={spring}
        disabled={buttonRest.disabled || loading}
        {...buttonRest}
      >
        {loading && <Loader2 size={15} className="animate-spin" aria-hidden />}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
