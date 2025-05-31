"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CircleButton from "./CircleButton";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import ProfileAvatar from "./ProfileAvatar";

export default function Navbar({ data = [], user = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  console.log("User in Navbar:", user);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  console.log("Navbar rendering with user:", user);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
        isScrolled
          ? "bg-white/90 backdrop-blur-md"
          : "bg-white"
      )}
    >
      <div className="py-4">
        <div className="flex items-center justify-between mx-auto px-8 sm:px-12">
          <div className="flex items-center gap-3 group">
            <Link href="/" className="flex items-center gap-3 transition-all duration-500 ease-in-out group-hover:scale-105">
              <Logo className="h-10" />
              <span className="text-lg sm:text-xl font-semibold text-charcoal transition-all duration-500 ease-in-out group-hover:[filter:drop-shadow(0_0_0.5px_rgba(51,51,51,0.3))_drop-shadow(0_4px_12px_rgba(0,0,0,0.15))]">
                <span className="transition-colors duration-500 ease-in-out group-hover:text-secondary/80">Remote</span>
                <span className="transition-colors duration-500 ease-in-out group-hover:text-primary/80">Rack</span>
              </span>
            </Link>
          </div>

          {/* Only show navigation items if user exists */}
          {user && (
            <>
              <div className="hidden md:flex gap-6">
                {data.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="text-base font-medium text-charcoal hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center">
                <div className="relative pr-4">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <ProfileAvatar
                      firstName={user.firstName}
                      lastName={user.lastName}
                      size={40}
                      className="ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                    />
                    <span className="text-base font-medium text-charcoal">
                      {user.firstName}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute bg-white right-0 mt-2 w-48 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-base text-charcoal hover:bg-cream"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2.5 text-base text-charcoal hover:bg-cream"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          // TODO: Handle logout
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-base text-red-500 hover:bg-cream"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Show auth buttons only if no user */}
          {!user && (
            <div className="hidden md:flex items-center space-x-4 pr-4">
              <Link
                href="/login"
                className="text-base font-medium text-charcoal hover:text-primary transition-colors"
              >
                Sign in
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2.5 rounded-full bg-primary text-white text-base font-medium hover:bg-primary/90 transition-colors">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-charcoal hover:text-primary transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col items-start gap-4 px-4 py-4">
            {/* Only show navigation items if user exists */}
            {user && (
              <>
                {data.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="text-base font-medium text-charcoal hover:text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Profile Section */}
                <div className="w-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <ProfileAvatar
                      firstName={user.firstName}
                      lastName={user.lastName}
                      size={40}
                      className="ring-2 ring-primary/20"
                    />
                    <span className="text-base font-medium text-charcoal">
                      {user.firstName}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-2.5 text-base text-charcoal hover:bg-cream rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block w-full px-4 py-2.5 text-base text-charcoal hover:bg-cream rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        // TODO: Handle logout
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2.5 text-base text-red-500 hover:bg-cream rounded-lg"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Show auth buttons only if no user */}
            {!user && (
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2.5 text-base font-medium text-charcoal hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = '/signup';
                  }}
                  className="w-full px-4 py-2.5 rounded-full bg-primary text-white text-base font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
