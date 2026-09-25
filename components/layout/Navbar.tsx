"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
  match: (p: string) => boolean;
  featured?: boolean;
}

interface NavGroup {
  label: string;
  items: NavLink[];
  match: (p: string) => boolean;
}

type NavItem = NavLink | NavGroup;

const isGroup = (item: NavItem): item is NavGroup => "items" in item;

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/solutions", label: "Solutions", match: (p: string) => p.startsWith("/solutions") },
  { href: "/pricing", label: "Pricing", match: (p: string) => p.startsWith("/pricing") },
  { href: "/case-studies", label: "Case Studies", match: (p: string) => p.startsWith("/case-studies") },
  { href: "/compare", label: "Compare", match: (p: string) => p.startsWith("/compare") },
  {
    label: "Company",
    match: (p: string) =>
      p.startsWith("/agency") || p.startsWith("/about") || p.startsWith("/blogs") || p.startsWith("/contact"),
    items: [
      { href: "/agency", label: "Agency", match: (p: string) => p.startsWith("/agency") },
      { href: "/about", label: "About Us", match: (p: string) => p.startsWith("/about") },
      { href: "/blogs", label: "Blogs", match: (p: string) => p.startsWith("/blogs") },
      { href: "/contact", label: "Contact", match: (p: string) => p.startsWith("/contact") },
    ],
  },
  { href: "/live-demo", label: "Try the live demo", match: (p: string) => p.startsWith("/live-demo"), featured: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    setCompanyOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    }
    if (companyOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [companyOpen]);

  const loginLink = (extra: string) => (
    <Link
      href="/login"
      className={`n-login ${extra}${pathname.startsWith("/login") ? " active" : ""}`}
      onClick={close}
    >
      Login
    </Link>
  );

  // Plain <a> on /demo forces a full reload so the demo resets
  const ctaLink = (extra: string) =>
    pathname.startsWith("/demo") ? (
      <a href="/demo" className={`ncta ${extra}`} onClick={close}>
        Start free trial
      </a>
    ) : (
      <Link href="/demo" className={`ncta ${extra}`} onClick={close}>
        Start free trial
      </Link>
    );

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="mx nv">
        <Link href="/" className="logo" onClick={close}>
          <LogoMark size={38} />
          <span className="logo-text">nipige</span>
        </Link>

        <div className={`nl${open ? " open" : ""}`} id="nav-menu">
          {NAV_ITEMS.map((item) =>
            isGroup(item) ? (
              <div
                key={item.label}
                ref={dropdownRef}
                className={`nav-dropdown${companyOpen ? " open" : ""}${item.match(pathname) ? " active" : ""}`}
              >
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  onClick={() => setCompanyOpen((v) => !v)}
                  aria-expanded={companyOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                    style={{ transition: "transform 0.2s", transform: companyOpen ? "rotate(180deg)" : undefined }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="nav-dropdown-menu" role="menu">
                  {item.items.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`nav-dropdown-item${link.match(pathname) ? " active" : ""}`}
                      onClick={close}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`nlk${item.featured ? " featured" : ""}${item.match(pathname) ? " active" : ""}`}
                onClick={close}
              >
                {item.label}
              </Link>
            )
          )}
          {loginLink("nav-mobile-only")}
          {ctaLink("nav-mobile-only")}
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          {loginLink("nav-desktop-only")}
          {ctaLink("nav-desktop-only")}
        </div>

        <button
          className={`nav-toggle${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
