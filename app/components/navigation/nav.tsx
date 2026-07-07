"use client";

import { useState } from "react";
import {
  Sparkles,
  Bookmark,
  Bell,
  Menu,
} from "lucide-react";

export function Nav({
  page,
  setPage,
  savedCount,
}: {
  page: string;
  setPage: (p: string) => void;
  savedCount: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/92 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <button
          onClick={() => setPage("landing")}
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
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Find Jobs", id: "search" },
            { label: "Companies", id: "companies" },
            { label: "Dashboard", id: "dashboard" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`text-sm font-medium transition-colors ${
                page === item.id
                  ? "text-[#F05A22]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("saved")}
            className="relative p-2 rounded-xl hover:bg-white transition-colors"
          >
            <Bookmark size={20} className="text-[#6B7280]" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-[#F05A22] text-white text-[10px] font-bold flex items-center justify-center px-1">
                {savedCount}
              </span>
            )}
          </button>
          <button className="p-2 rounded-xl hover:bg-white transition-colors">
            <Bell size={20} className="text-[#6B7280]" />
          </button>
          <button
            onClick={() => setPage("dashboard")}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F05A22] to-[#FF7A50] flex items-center justify-center text-white text-xs font-bold shadow-sm"
          >
            A
          </button>
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} className="text-[#6B7280]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#EAEAEA] px-5 py-4 flex flex-col gap-3 bg-[#FFFFFF]">
          {[
            { label: "Find Jobs", id: "search" },
            { label: "Companies", id: "companies" },
            { label: "Dashboard", id: "dashboard" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setMenuOpen(false);
              }}
              className="text-sm font-medium text-[#6B7280] hover:text-[#111111] text-left py-1"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
