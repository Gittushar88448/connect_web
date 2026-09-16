"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mainNav } from "@/constants/nav";
import { useAuth } from "../auth/authProvider";

interface NavUser {
  firstName: string;
  email: string;
  image?: string;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!profileOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  function handleLogout() {
    // TODO: call the real sign-out (e.g. NextAuth `signOut()`) once wired up.
    setProfileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-graphite/95 backdrop-blur supports-[backdrop-filter]:bg-brand-graphite/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand-signal-bright/15 text-brand-signal-bright">
            <span className="size-2 rounded-full bg-brand-signal-bright" />
          </span>
          Connect Hub
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="relative" ref={profileRef}>
              {/* Profile trigger */}
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 pr-2 text-white transition hover:bg-white/10 sm:pr-3"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <img
                  src={user.image || "/images/default-avatar.png"}
                  alt={`${user.firstName}'s profile`}
                  className="size-8 shrink-0 rounded-full object-cover sm:size-9"
                />

                <span className="hidden max-w-24 truncate text-sm font-medium sm:block">
                  {user.firstName}
                </span>

                <ChevronDown
                  className={`hidden size-4 shrink-0 transition-transform sm:block ${profileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.16,
                      ease: "easeOut",
                    }}
                    className="
          absolute top-full right-0 z-50 mt-3
          w-64 max-w-[calc(100vw-2rem)]
          overflow-hidden rounded-2xl
          border border-white/10
          bg-[#17191c]/95
          shadow-[0_20px_50px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
        "
                    role="menu"
                  >
                    {/* User information */}
                    <div className="border-b border-white/10 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || "/images/default-avatar.png"}
                          alt={`${user.firstName}'s profile`}
                          className="
                size-11 shrink-0 rounded-full object-cover
                ring-1 ring-white/15
              "
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            Welcome, {user.firstName}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-white/50">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                      {/* My Profile */}
                      <Link
                        href="/account"
                        onClick={() => setProfileOpen(false)}
                        className="
              group flex items-center gap-3
              rounded-xl px-3 py-2.5
              text-sm text-white/75
              transition-all duration-150
              hover:bg-white/8
              hover:text-white
              focus:outline-none
              focus-visible:bg-white/10
              focus-visible:text-white
            "
                        role="menuitem"
                      >
                        <span
                          className="
                flex size-8 items-center justify-center
                rounded-lg bg-white/5
                text-white/60
                transition-colors
                group-hover:bg-white/10
                group-hover:text-white
              "
                        >
                          <User className="size-4" aria-hidden="true" />
                        </span>

                        <span>My Profile</span>
                      </Link>

                      {/* Logout */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
              group flex w-full items-center gap-3
              rounded-xl px-3 py-2.5
              text-sm text-red-400/80
              transition-all duration-150
              hover:bg-red-500/10
              hover:text-red-400
              focus:outline-none
              focus-visible:bg-red-500/10
              focus-visible:text-red-400
            "
                        role="menuitem"
                      >
                        <span
                          className="
                flex size-8 items-center justify-center
                rounded-lg bg-red-500/5
                text-red-400/70
                transition-colors
                group-hover:bg-red-500/10
                group-hover:text-red-400
              "
                        >
                          <LogOut className="size-4" aria-hidden="true" />
                        </span>

                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              aria-label="Sign in"
              render={<Link href="/login" />}
              className="hidden text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <User />
            </Button>
          )}

          <Button
            size="sm"
            nativeButton={false}
            className="hidden h-9 px-4 text-sm sm:inline-flex"
            render={<Link href="/custom-solutions#request-form" />}
          >
            Get a quote
          </Button>

          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/custom-solutions#request-form"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-brand-signal-bright hover:bg-white/10"
                >
                  Get a quote
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <User className="size-4" aria-hidden="true" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" aria-hidden="true" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
