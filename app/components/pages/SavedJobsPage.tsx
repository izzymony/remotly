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
    <div className="pt-16 min-h-screen bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Saved Jobs
            </h1>
            <p className="text-[#6B7280] text-sm mt-0.5">
              {savedJobsList.length} saved position
              {savedJobsList.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/jobs"
            className="bg-[#F05A22] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#D94E1A] transition-colors shadow-sm inline-block"
          >
            Find More Jobs
          </Link>
        </div>

        <div className="bg-white rounded-[20px] border border-[#EAEAEA] flex items-center gap-2 px-4 py-3 mb-6">
          <Search size={15} className="text-[#6B7280]" />
          <input
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#9CA3AF]"
            placeholder="Search saved jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X size={13} className="text-[#9CA3AF]" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[24px] border border-[#EAEAEA]">
            <div className="w-14 h-14 rounded-full bg-[#FFF3EE] flex items-center justify-center mx-auto mb-4">
              <Bookmark size={22} className="text-[#F05A22]" />
            </div>
            <h3 className="font-bold text-[#111111] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {searchQuery ? "No matching saved jobs" : "No saved jobs yet"}
            </h3>
            <p className="text-sm text-[#6B7280] mb-6">
              {searchQuery
                ? "Try a different search term."
                : "Start exploring and save roles you're interested in."}
            </p>
            {!searchQuery && (
              <Link
                href="/jobs"
                className="bg-[#F05A22] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#D94E1A] transition-colors inline-block"
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
