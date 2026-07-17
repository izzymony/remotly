"use client";
import React from 'react';
import type { JobListing } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import {
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

import CompanyLogo from '@/app/components/shared/CompanyLogo';

export function JobCard({
  jobs: passedJobs,
  onSelect,
  onSave,
  savedJobs = new Set(),
}: {
  jobs?: JobListing[];
  onSelect?: (job: JobListing) => void;
  onSave?: (jobId: number) => void;
  savedJobs?: Set<number>;
}) {
  const { data: fetchedJobs = [], isLoading, isError } = useQuery<JobListing[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch('/api/jobs');
      if (!res.ok) {
        throw new Error('failed to fetch jobs from API');
      }
      const data = await res.json();
      return data.jobs || data.data || [];
    },
  });

  const listings = passedJobs ?? fetchedJobs;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white border border-[#E4EBE6] h-[180px] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 font-medium bg-white rounded-2xl border border-[#E4EBE6]">
        Failed to load job listings. Please refresh or try again later.
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="p-6 text-center text-[#6E7A6E] font-medium bg-white rounded-2xl border border-[#E4EBE6]">
        No active job listings found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((job: JobListing) => {
        const jobId = typeof job.id === 'string' ? parseInt(job.id) : job.id;
        const isSaved = savedJobs.has(jobId);
        return (
          <div
            className="bg-white rounded-2xl p-5 border border-[#E4EBE6] cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#5A7A6A]/[0.06] hover:border-[#5A7A6A]/30 flex flex-col justify-between"
            key={job.id}
            onClick={() => onSelect?.(job)}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <CompanyLogo
                    companyName={job.company}
                    companyLogoUrl={job.companyLogoUrl}
                    size={42}
                  />
                  <div>
                    <h3
                      className="font-bold text-[#2C2C2C] group-hover:text-[#5A7A6A] transition-colors text-[16px] leading-tight mb-1"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {job.title}
                    </h3>
                    <p className="text-[#6E7A6E] text-sm font-medium">{job.company}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSave && jobId) onSave(jobId);
                  }}
                  aria-label={isSaved ? "Unsave job" : "Save job"}
                  className="p-2 rounded-xl hover:bg-[#FAF9F7] text-[#7A7A7A] hover:text-[#5A7A6A] transition-colors flex-shrink-0"
                >
                  <Bookmark
                    size={17}
                    className={isSaved ? "text-[#5A7A6A] fill-[#5A7A6A]" : "text-[#7A7A7A] group-hover:text-[#5A7A6A]"}
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="flex items-center gap-1 text-[11px] font-medium text-[#6E7A6E] bg-[#FAF9F7] px-2.5 py-1 rounded-lg">
                  <MapPin size={11} className="text-[#7A7A7A]" /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-[#6E7A6E] bg-[#FAF9F7] px-2.5 py-1 rounded-lg">
                  <DollarSign size={11} className="text-[#7A7A7A]" /> {job.salary}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-[#6E7A6E] bg-[#FAF9F7] px-2.5 py-1 rounded-lg">
                  <Clock size={11} className="text-[#7A7A7A]" /> {job.postedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-3 border-t border-[#EEF3EF]">
              <div className="flex gap-1.5 flex-wrap">
                <span
                  className={`px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider ${
                    job.remote
                      ? "bg-[#E8F1F5] text-[#5E6EA0]"
                      : "bg-[#FAF9F7] text-[#6E7A6E] border border-[#EEF3EF]"
                  }`}
                >
                  {job.employmentType || (job.remote ? "Remote" : "On-site")}
                </span>
                <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider bg-[#EBF2EE] text-[#5A7A6A]">
                  {job.provider}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}