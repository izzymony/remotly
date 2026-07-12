"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, X, Sparkles } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#FFFFFF] px-5 pt-20 pb-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#F05A22]/[0.07] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-8%] w-[500px] h-[500px] rounded-full bg-[#F24E1E]/[0.04] blur-3xl" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#FCB400]/[0.04] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#EAEAEA] text-sm text-[#6B7280] mb-7 shadow-sm">
            <Sparkles size={13} className="text-[#F05A22]" />
            <span>
              Over <strong className="text-[#111111]">12,400</strong> jobs from top-tier companies
            </span>
          </div>

          <h1
            className="text-5xl md:text-[72px] font-bold text-[#111111] mb-5 leading-[1.07] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Find your next
            <br />
            <span className="text-[#F05A22]">opportunity.</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-lg mx-auto leading-relaxed">
            Discover roles at the world&apos;s best tech companies. Your next chapter starts here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] shadow-2xl shadow-black/[0.06] p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={17} className="text-[#F05A22] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                  className="flex-1 outline-none bg-transparent text-[#111111] placeholder:text-[#9CA3AF] text-[15px]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X size={14} className="text-[#9CA3AF]" />
                  </button>
                )}
              </div>

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#EAEAEA] shadow-xl z-20 overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-[#F5F5F5]">
                    <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2.5">Trending</p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setSearchQuery(t);
                            setShowSuggestions(false);
                          }}
                          className="px-3 py-1.5 bg-[#FFF3EE] text-[#F05A22] text-xs rounded-lg hover:bg-[#F05A22] hover:text-white transition-colors font-medium"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Recent</p>
                    {RECENT_SEARCHES.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setSearchQuery(r);
                          setShowSuggestions(false);
                        }}
                        className="flex items-center gap-2 w-full py-2 text-sm text-[#111111] hover:text-[#F05A22] transition-colors text-left"
                      >
                        <Search size={12} className="text-[#9CA3AF]" />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block w-px bg-[#EAEAEA] my-2" />

            <div className="flex items-center gap-3 px-4 py-3 md:min-w-[200px]">
              <MapPin size={17} className="text-[#9CA3AF] flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 outline-none bg-transparent text-[#111111] placeholder:text-[#9CA3AF] text-[15px]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#F05A22] hover:bg-[#D94E1A] text-white px-8 py-3 rounded-[18px] font-semibold transition-colors text-[15px] shadow-md shadow-orange-200/50 whitespace-nowrap"
            >
              Search Jobs
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex items-center gap-3 flex-wrap justify-center"
        >
          <span className="text-sm text-[#9CA3AF]">Trending:</span>
          {TRENDING.map((t) => (
            <button
              key={t}
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(t)}`)}
              className="text-sm text-[#6B7280] hover:text-[#F05A22] transition-colors underline underline-offset-2 decoration-[#EAEAEA]"
            >
              {t}
            </button>
          ))}
        </motion.div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
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
              transition={{ delay: 0.35 + i * 0.06 }}
              className="bg-white rounded-2xl p-4 border border-[#EAEAEA] text-center"
            >
              <div className="text-xl font-bold text-[#F05A22]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#6B7280] mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
