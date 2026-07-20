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
    <section className="relative overflow-hidden bg-white px-5 pt-24 pb-20">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-purple/[0.04] blur-3xl" style={{ background: "radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent 70%)" }} />
        <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] rounded-full bg-blue/[0.03] blur-3xl" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.06), transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-light rounded-full border border-purple/20 text-sm text-purple-dark mb-8 shadow-sm shadow-black/[0.03]">
              <div className="flex -space-x-1">
                {["A", "B", "C"].map((l, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-purple to-purple-dark border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
                    {l}
                  </div>
                ))}
              </div>
              <span>Over <strong className="text-charcoal">12,400</strong> roles at top companies</span>
            </div>

            <h1
              className="text-5xl lg:text-6xl font-bold text-charcoal mb-5 leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Discover your next
              <br />
              <span className="text-purple">career opportunity</span>
            </h1>
            <p className="text-lg text-charcoal-50 max-w-lg leading-relaxed mb-8">
              Explore thousands of vetted jobs at world-class companies. Connect with employers who value your skills.
            </p>

            {/* Stats boxes - compact row */}
            <div className="flex gap-3 mb-10">
              <div className="bg-purple-light p-3 rounded-lg">
                <div className="text-sm font-bold text-purple-dark">500+</div>
                <div className="text-xs text-purple-dark/70">Companies Joined</div>
              </div>
              <div className="bg-blue/10 p-3 rounded-lg border border-blue/20">
                <div className="text-sm font-bold text-blue">12.4k+</div>
                <div className="text-xs text-blue/70">Active Roles</div>
              </div>
            </div>
          </motion.div>

          {/* Right column: Visual element (placeholder for NextHire hero image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="relative h-64 lg:h-96 bg-gradient-to-br from-purple/5 to-blue/5 rounded-3xl border border-border shadow-lg overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, var(--purple) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--blue) 0%, transparent 50%)"
              }} />
              <div className="relative text-center">
                <div className="text-6xl font-bold text-purple/20 mb-2">👔</div>
                <p className="text-charcoal-50 font-medium">Your career journey</p>
                <p className="text-charcoal-30 text-sm">starts here</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          <div className="bg-white rounded-2xl border border-border shadow-lg shadow-black/[0.06] p-2 flex flex-col md:flex-row gap-2">
            {/* Job search input */}
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={17} className="text-purple flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 outline-none bg-transparent text-charcoal placeholder:text-charcoal-30 text-[15px]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X size={14} className="text-charcoal-30 hover:text-charcoal-50" />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border shadow-lg shadow-black/[0.08] z-20 overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-border-light">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <TrendingUp size={11} className="text-purple" />
                      <p className="text-[11px] font-semibold text-charcoal-50 uppercase tracking-wider">Trending</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((t) => (
                        <button
                          key={t}
                          onClick={() => { setSearchQuery(t); setShowSuggestions(false); }}
                          className="px-3 py-1.5 bg-purple-light text-purple-dark text-xs rounded-lg hover:bg-purple hover:text-white transition-colors font-medium"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[11px] font-semibold text-charcoal-50 uppercase tracking-wider mb-2">Recent</p>
                    {RECENT_SEARCHES.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setSearchQuery(r); setShowSuggestions(false); }}
                        className="flex items-center gap-2 w-full py-2 text-sm text-charcoal hover:text-purple transition-colors text-left"
                      >
                        <Search size={12} className="text-charcoal-30" />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block w-px bg-border my-2" />

            {/* Location input */}
            <div className="flex items-center gap-3 px-4 py-3 md:min-w-[200px]">
              <MapPin size={17} className="text-charcoal-30 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 outline-none bg-transparent text-charcoal placeholder:text-charcoal-30 text-[15px]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-purple hover:bg-purple-dark text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-[15px] shadow-md shadow-purple/30 whitespace-nowrap hover:-translate-y-0.5"
            >
              Search Jobs
            </button>
          </div>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <span className="text-sm text-charcoal-50">Popular:</span>
          {TRENDING.map((t) => (
            <button
              key={t}
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(t)}`)}
              className="text-sm text-charcoal-50 hover:text-purple transition-colors underline underline-offset-2 decoration-border hover:decoration-purple"
            >
              {t}
            </button>
          ))}
        </motion.div>

        {/* Stats row */}
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
              transition={{ delay: 0.35 + i * 0.07 }}
              className="bg-white rounded-xl p-4 border border-border text-center shadow-sm shadow-black/[0.02] hover:shadow-md hover:shadow-purple/10 hover:border-purple/30 transition-all duration-200 group"
            >
              <div
                className="text-lg font-bold text-purple group-hover:text-purple-dark transition-colors"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-charcoal-50 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
