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
    <div className="bg-white border-b border-[#EAEAEA] px-5 py-4 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto flex gap-2">
        <div className="flex-1 bg-[#FFFFFF] rounded-xl border border-[#EAEAEA] flex items-center gap-2 px-4 py-2.5">
          <Search size={15} className="text-[#6B7280] flex-shrink-0" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[#111111] placeholder:text-[#9CA3AF]"
            placeholder="Search jobs, companies, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={clearQuery} aria-label="Clear search">
              <X size={13} className="text-[#9CA3AF]" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            showFilters || activeFilterCount > 0
              ? "bg-[#F05A22] text-white border-[#F05A22]"
              : "border-[#EAEAEA] text-[#6B7280] bg-white hover:border-[#F05A22]"
          }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white/25 text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
