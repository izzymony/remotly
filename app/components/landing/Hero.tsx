"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, X, TrendingUp, Star } from "lucide-react";
import { TRENDING, RECENT_SEARCHES } from "@/app/data/constants";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F7] px-5 pt-24 pb-20">
      {/* Soft background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#5A7A6A]/[0.06] blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[450px] h-[450px] rounded-full bg-[#6B9E7E]/[0.05] blur-3xl" />
        <div className="absolute top-[35%] left-[25%] w-[280px] h-[280px] rounded-full bg-[#EBF2EE]/80 blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E4EBE6] text-sm text-[#6E7A6E] mb-8 shadow-sm shadow-black/[0.03]">
            <div className="flex -space-x-1">
              {["A", "B", "C"].map((l, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5A7A6A] to-[#6B9E7E] border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
                  {l}
                </div>
              ))}
            </div>
            <span>Over <strong className="text-[#2C2C2C]">12,400</strong> roles at top companies</span>
          </div>

          <h1
            className="text-5xl md:text-[68px] font-bold text-[#2C2C2C] mb-5 leading-[1.06] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find your next
            <br />
            <span className="text-[#5A7A6A]">great opportunity.</span>
          </h1>
          <p className="text-lg text-[#6E7A6E] max-w-lg mx-auto leading-relaxed">
            Discover roles at the world&apos;s most admired companies. Your next chapter starts here.
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="bg-white rounded-[22px] border border-[#E4EBE6] shadow-xl shadow-black/[0.05] p-2 flex flex-col md:flex-row gap-2">
            {/* Job search input */}
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={17} className="text-[#5A7A6A] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 outline-none bg-transparent text-[#2C2C2C] placeholder:text-[#A8A8A8] text-[15px]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X size={14} className="text-[#A8A8A8] hover:text-[#6E7A6E]" />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E4EBE6] shadow-xl shadow-black/[0.06] z-20 overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-[#EEF3EF]">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <TrendingUp size={11} className="text-[#5A7A6A]" />
                      <p className="text-[11px] font-semibold text-[#6E7A6E] uppercase tracking-wider">Trending</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((t) => (
                        <button
                          key={t}
                          onClick={() => { setSearchQuery(t); setShowSuggestions(false); }}
                          className="px-3 py-1.5 bg-[#EBF2EE] text-[#5A7A6A] text-xs rounded-lg hover:bg-[#5A7A6A] hover:text-white transition-colors font-medium"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[11px] font-semibold text-[#6E7A6E] uppercase tracking-wider mb-2">Recent</p>
                    {RECENT_SEARCHES.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setSearchQuery(r); setShowSuggestions(false); }}
                        className="flex items-center gap-2 w-full py-2 text-sm text-[#2C2C2C] hover:text-[#5A7A6A] transition-colors text-left"
                      >
                        <Search size={12} className="text-[#A8A8A8]" />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block w-px bg-[#E4EBE6] my-2" />

            {/* Location input */}
            <div className="flex items-center gap-3 px-4 py-3 md:min-w-[200px]">
              <MapPin size={17} className="text-[#A8A8A8] flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 outline-none bg-transparent text-[#2C2C2C] placeholder:text-[#A8A8A8] text-[15px]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#5A7A6A] hover:bg-[#3D5C4E] text-white px-8 py-3 rounded-[16px] font-semibold transition-all duration-200 text-[15px] shadow-md shadow-[#5A7A6A]/30 whitespace-nowrap hover:-translate-y-0.5"
            >
              Search Jobs
            </button>
          </div>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex items-center gap-3 flex-wrap justify-center"
        >
          <span className="text-sm text-[#7A7A7A]">Popular:</span>
          {TRENDING.map((t) => (
            <button
              key={t}
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(t)}`)}
              className="text-sm text-[#6E7A6E] hover:text-[#5A7A6A] transition-colors underline underline-offset-2 decoration-[#E4EBE6] hover:decoration-[#5A7A6A]"
            >
              {t}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "12,400+", label: "Active Jobs" },
            { value: "3,200+", label: "Companies" },
            { value: "850k+", label: "Job Seekers" },
            { value: "94%", label: "Placement Rate" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 + i * 0.07 }}
              className="bg-white rounded-2xl p-4 border border-[#E4EBE6] text-center shadow-sm shadow-black/[0.02] hover:shadow-md hover:shadow-[#5A7A6A]/10 hover:border-[#5A7A6A]/30 transition-all duration-200 group"
            >
              <div
                className="text-xl font-bold text-[#5A7A6A] group-hover:text-[#3D5C4E] transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#7A7A7A] mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
