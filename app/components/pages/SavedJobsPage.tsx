"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Bookmark } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { JobCard } from "@/app/components/shared/JobCard";
import { useSavedJobs } from "@/app/components/provider";

export function SavedJobsPage() {
  const router = useRouter();
  const { savedJobs, toggleSaveJob } = useSavedJobs();
  const [searchQuery, setSearchQuery] = useState("");

  const savedJobsList = JOBS.filter((j) => savedJobs.has(j.id));
  const filtered = savedJobsList.filter(
    (j) =>
      !searchQuery ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const jobListings = filtered.map((j) => ({
    id: String(j.id),
    title: j.title,
    company: j.company,
    location: j.location,
    description: j.description,
    salary: j.salary,
    employmentType: j.type,
    postedAt: j.posted,
    remote: j.remote,
    provider: "indeed" as const,
  }));

  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F7]">
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Saved Jobs
            </h1>
            <p className="text-[#6E7A6E] text-sm mt-1 font-medium">
              {savedJobsList.length} saved position
              {savedJobsList.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/jobs"
            className="bg-[#5A7A6A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3D5C4E] transition-colors shadow-sm shadow-[#5A7A6A]/20 inline-block"
          >
            Find More Jobs
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-[#E4EBE6] flex items-center gap-2.5 px-4 py-3 mb-6 shadow-sm shadow-black/[0.01]">
          <Search size={15} className="text-[#7A7A7A]" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[#2C2C2C] placeholder:text-[#A8A8A8]"
            placeholder="Search saved jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X size={13} className="text-[#A8A8A8] hover:text-[#6E7A6E]" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E4EBE6] shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF2EE] flex items-center justify-center mx-auto mb-4">
              <Bookmark size={22} className="text-[#5A7A6A]" />
            </div>
            <h3 className="font-bold text-[#2C2C2C] mb-2 text-[17px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {searchQuery ? "No matching saved jobs" : "No saved jobs yet"}
            </h3>
            <p className="text-sm text-[#6E7A6E] mb-6 max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? "Try a different search term or check spelling."
                : "Start exploring remote-friendly roles and save your favorites."}
            </p>
            {!searchQuery && (
              <Link
                href="/jobs"
                className="bg-[#5A7A6A] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#3D5C4E] transition-colors text-sm shadow-sm inline-block"
              >
                Explore Jobs
              </Link>
            )}
          </div>
        ) : (
          <JobCard
            jobs={jobListings}
            onSelect={(job) => router.push(`/jobs/${job.id}`)}
            onSave={toggleSaveJob}
            savedJobs={savedJobs}
          />
        )}
      </div>
    </div>
  );
}
