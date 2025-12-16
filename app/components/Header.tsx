'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Industries', href: '#industries' },
    { label: 'Resources', href: '#resources' },
    { label: 'About Us', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container-max flex items-center justify-between py-4" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:rounded">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">Nipige</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral hover:text-primary transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <button className="hidden md:block btn btn-primary btn-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Request A Demo
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="md:hidden btn btn-ghost btn-circle focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle navigation menu"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 md:hidden bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          id="mobile-navigation"
          className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="p-6">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="btn btn-ghost btn-circle absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-4 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral hover:text-primary transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:rounded"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="btn btn-primary btn-block rounded-full mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Request A Demo
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
