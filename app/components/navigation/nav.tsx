"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedJobs } from "@/app/components/provider";
import { useAuthStore } from "@/lib/authStore";
import  Image from 'next/image'
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Bookmark,
  Bell,
  Menu,
  LogOut,
  User as UserIcon,
  X,
  LayoutDashboardIcon,
} from "lucide-react";
import router from "next/router";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoading, logout } = useAuthStore();
  const { savedJobs } = useSavedJobs();
  const savedCount = savedJobs.size;

  const navItems = [
    { label: "Find Jobs", href: "/jobs", id: "search" },
    { label: "Companies", href: "/companies", id: "companies" },
    ...(user ? [{ label: "Dashboard", href: "/dashboard", id: "dashboard" }] : []),
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  
  const initials = user ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() : "U";
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm shadow-black/[0.05] border-b border-border"
          : "bg-white/80 backdrop-blur-sm border-b border-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[10px] bg-purple flex items-center justify-center shadow-sm shadow-purple/30 group-hover:bg-purple-dark transition-colors">
            <Sparkles size={14} className="text-white" />
          </div>
          <span
            className="font-bold text-[17px] text-charcoal tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            TalentFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isLinkActive(item.href)
                  ? "text-purple bg-purple-light"
                  : "text-charcoal-50 hover:text-charcoal hover:bg-border-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/saved"
            aria-label="Saved jobs"
            className={`relative p-2 rounded-lg transition-colors ${
              pathname === "/saved"
                ? "text-purple bg-purple-light"
                : "text-charcoal-30 hover:text-charcoal hover:bg-border-light"
            }`}
          >
            <Bookmark size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-purple text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          <button aria-label="Notifications" className="p-2 rounded-lg text-charcoal-30 hover:text-charcoal hover:bg-border-light transition-colors">
            <Bell size={18} />
          </button>

          {/* Auth UI */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-[#E4EBE6] animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-dark flex items-center justify-center text-white text-xs font-bold shadow-sm overflow-hidden uppercase"
              >
                {user.avatar ? (
                  <Image src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-lg shadow-black/[0.06] py-1.5 z-50 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-border-light">
                    <p className="text-xs font-semibold text-charcoal truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[11px] text-charcoal-50 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-50 hover:bg-border-light hover:text-charcoal transition-colors"
                  >
                    <UserIcon size={15} />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-50 hover:bg-border-light hover:text-charcoal transition-colors"
                  >
                    <LayoutDashboardIcon size={15} />
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      setProfileMenuOpen(false);
                      router.push("/");
                      await logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 text-left transition-colors"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-block px-3.5 py-1.5 text-sm font-medium text-charcoal-50 hover:text-charcoal hover:bg-border-light rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 text-sm font-semibold bg-purple text-white rounded-lg hover:bg-purple-dark transition-all duration-200 shadow-sm shadow-purple/25"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded-lg text-charcoal-30 hover:text-charcoal hover:bg-border-light transition-colors ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-5 py-4 flex flex-col gap-1 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2.5 px-3 rounded-lg block transition-colors ${
                isLinkActive(item.href)
                  ? "text-purple bg-purple-light"
                  : "text-charcoal-50 hover:text-charcoal hover:bg-border-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {!user && !isLoading && (
            <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-border">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 text-sm font-medium text-charcoal-50 rounded-lg border border-border hover:border-purple hover:text-purple transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 text-sm font-semibold bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
