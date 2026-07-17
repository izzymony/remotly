"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export function SearchHeader({
  query,
  setQuery,
  showFilters,
  setShowFilters,
  activeFilterCount,
}: {
  query: string;
  setQuery: (q: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFilterCount: number;
}) {
  const clearQuery = () => setQuery("");

  return (
    <div className="bg-[#FAF9F7]/90 backdrop-blur-md border-b border-[#E4EBE6] px-5 py-4 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto flex gap-3">
        <div className="flex-1 bg-white rounded-xl border border-[#E4EBE6] flex items-center gap-2.5 px-4 py-2.5 shadow-sm shadow-black/[0.01] focus-within:border-[#5A7A6A] transition-all">
          <Search size={15} className="text-[#7A7A7A] flex-shrink-0" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[#2C2C2C] placeholder:text-[#A8A8A8]"
            placeholder="Search jobs, companies, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={clearQuery} aria-label="Clear search">
              <X size={13} className="text-[#A8A8A8] hover:text-[#6E7A6E]" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 ${
            showFilters || activeFilterCount > 0
              ? "bg-[#5A7A6A] text-white border-[#5A7A6A] shadow-sm shadow-[#5A7A6A]/20"
              : "border-[#E4EBE6] text-[#6E7A6E] bg-white hover:border-[#5A7A6A] hover:bg-[#F4F8F5] hover:text-[#5A7A6A]"
          }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold font-mono">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
