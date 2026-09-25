import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Wrapper class. Defaults to the site's CSS-var based mono-label style. */
  className?: string;
  /** Class applied to each link/segment (not the current, final item). */
  linkClassName?: string;
  /** Class applied to the current (final, non-linked) item. */
  currentClassName?: string;
  /** Class applied to the "/" separator between items. */
  separatorClassName?: string;
}

/**
 * Simple visible breadcrumb trail (Home / Section / Page). Keep this in sync
 * with the page's BreadcrumbList JSON-LD so structured data mirrors what's
 * actually on the page.
 */
export function Breadcrumb({
  items,
  className = "mn breadcrumb",
  linkClassName = "breadcrumb-link",
  currentClassName = "breadcrumb-current",
  separatorClassName = "breadcrumb-sep",
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.name}>
            {index > 0 ? (
              <span className={separatorClassName} aria-hidden="true">
                /
              </span>
            ) : null}
            {item.href && !isLast ? (
              <Link href={item.href} className={linkClassName}>
                {item.name}
              </Link>
            ) : (
              <span className={currentClassName} aria-current={isLast ? "page" : undefined}>
                {item.name}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
