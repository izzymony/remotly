"use client";

import { useState } from "react";
import { Search, MapPin, SlidersHorizontal, Star } from "lucide-react";
import { CompanyCard } from "@/app/components/shared/CompanyCard";
import { useQuery } from "@tanstack/react-query";

const INDUSTRIES = [
  "All Industries",
  "AI Research",
  "Developer Tools",
  "Design Tools",
  "Fintech",
  "Productivity",
  "Productivity Software",
  "Internal Tools",
  "No-Code Platform",
];

export function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [locationQuery, setLocationQuery] = useState("");

  const { data: companies = [], isLoading, error } = useQuery<any[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await fetch("/api/companies", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch companies");
      }
      const payload = await res.json();
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.companies)) return payload.companies;
      if (Array.isArray(payload?.data)) return payload.data;
      return [];
    },
  });

  const filteredCompanies = companies.filter((company: any) => {
    const matchesSearch =
      company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      company.industry?.toLowerCase() === selectedIndustry.toLowerCase();

    const matchesLocation =
      !locationQuery ||
      company.location?.toLowerCase().includes(locationQuery.toLowerCase());

    return matchesSearch && matchesIndustry && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <span className="inline-block text-xs font-semibold tracking-widest text-[#5A7A6A] uppercase mb-3">
          Employer Reviews & Profiles
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Discover Top Employers
        </h1>
        <p className="text-[#6E7A6E] max-w-xl">
          Compare workplace cultures, open roles, benefits, and verified ratings of the world&apos;s leading tech teams.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-[22px] border border-[#E4EBE6] p-4 mb-8 shadow-sm shadow-black/[0.02]">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center border border-[#E4EBE6] rounded-xl px-3 bg-[#FAF9F7] focus-within:border-[#5A7A6A] focus-within:bg-white transition-all duration-200">
            <Search size={16} className="text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="Search by company name, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none py-2.5 px-2 text-sm text-[#2C2C2C] placeholder:text-[#A8A8A8]"
            />
          </div>

          <div className="flex-1 relative flex items-center border border-[#E4EBE6] rounded-xl px-3 bg-[#FAF9F7] focus-within:border-[#5A7A6A] focus-within:bg-white transition-all duration-200">
            <MapPin size={16} className="text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="Filter by headquarters / Remote..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none py-2.5 px-2 text-sm text-[#2C2C2C] placeholder:text-[#A8A8A8]"
            />
          </div>
        </div>

        {/* Industry Pill filters */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-xs text-[#6E7A6E] font-medium pr-2 border-r border-[#EEF3EF] flex-shrink-0">
            <SlidersHorizontal size={12} />
            <span>Industry:</span>
          </div>
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind;
            return (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all duration-150 flex-shrink-0 ${
                  isSelected
                    ? "bg-[#5A7A6A] text-white shadow-sm shadow-[#5A7A6A]/20"
                    : "bg-[#FAF9F7] text-[#6E7A6E] border border-[#E4EBE6] hover:border-[#5A7A6A] hover:bg-[#F4F8F5]"
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#5A7A6A] border-t-transparent" />
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 font-medium bg-white rounded-2xl border border-[#E4EBE6]">
          Failed to load company profiles.
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E4EBE6]">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="font-semibold text-[#2C2C2C]">No matching companies found</p>
          <p className="text-[#7A7A7A] text-sm mt-1">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <CompanyCard companies={filteredCompanies} />
      )}
    </div>
  );
}