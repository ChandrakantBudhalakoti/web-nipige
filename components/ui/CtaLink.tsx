import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "premium";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn bp",
  ghost: "btn bg",
  premium: "btn-premium",
};

/**
 * Internal navigation CTA rendered with the prototype's button classes.
 * `premium` omits its own arrow - the `.btn-premium::after` pseudo adds it.
 */
export function CtaLink({
  href,
  variant = "primary",
  small = false,
  block = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  small?: boolean;
  block?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const classes = [
    VARIANT_CLASS[variant],
    small && variant !== "premium" ? "bs" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={classes}
      style={block ? { width: "100%", display: "block", textAlign: "center" } : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
