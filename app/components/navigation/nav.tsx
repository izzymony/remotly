"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedJobs } from "@/app/components/provider";
import {
  Sparkles,
  Bookmark,
  Bell,
  Menu,
} from "lucide-react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { savedJobs } = useSavedJobs();
  const savedCount = savedJobs.size;

  const navItems = [
    { label: "Find Jobs", href: "/jobs", id: "search" },
    { label: "Companies", href: "/companies", id: "companies" },
    { label: "Dashboard", href: "/dashboard", id: "dashboard" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/92 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F05A22] flex items-center justify-center shadow-sm shadow-orange-200/50">
            <Sparkles size={15} className="text-white" />
          </div>
          <span
            className="font-bold text-[17px] text-[#111111] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            TalentFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isLinkActive(item.href)
                  ? "text-[#F05A22]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/saved"
            aria-label="Saved jobs"
            className={`relative p-2 rounded-xl hover:bg-white transition-colors block ${
              pathname === "/saved" ? "text-[#F05A22]" : "text-[#6B7280]"
            }`}
          >
            <Bookmark size={20} className={pathname === "/saved" ? "text-[#F05A22]" : "text-[#6B7280]"} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-[#F05A22] text-white text-[10px] font-bold flex items-center justify-center px-1">
                {savedCount}
              </span>
            )}
          </Link>
          <button aria-label="Notifications" className="p-2 rounded-xl hover:bg-white transition-colors">
            <Bell size={20} className="text-[#6B7280]" />
          </button>
          <Link
            href="/dashboard"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F05A22] to-[#FF7A50] flex items-center justify-center text-white text-xs font-bold shadow-sm"
          >
            A
          </Link>
          <button
            aria-label="Open menu"
            className="md:hidden p-2 rounded-xl hover:bg-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} className="text-[#6B7280]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#EAEAEA] px-5 py-4 flex flex-col gap-3 bg-[#FFFFFF]">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium text-left py-1 block ${
                isLinkActive(item.href)
                  ? "text-[#F05A22]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
