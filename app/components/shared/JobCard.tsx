"use client";
import React from 'react'
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

  // 3. Handle Loading State (Prevents an empty blank screen)
  if (isLoading) {
    return (
      <div className="">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-50 border border-gray-200 h-[180px] rounded-[20px]" />
        ))}
      </div>
    );
  }

  // 4. Handle Error State
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Failed to load job listings. Please refresh or try again later.
      </div>
    );
  }

  // 5. Handle Empty API Payload
  if (listings.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
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
          className="bg-white rounded-[20px] p-5 border border-[#EAEAEA] cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-200 flex flex-col"
          key={job.id}
          onClick={() => onSelect?.(job)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <CompanyLogo
                companyName={job.company}
                companyLogoUrl={job.companyLogoUrl}
                size={44}
              />
              <div>
                <h3
                  className="font-bold text-[#111111] group-hover:text-[#F05A22] transition-colors text-[16px] leading-tight mb-1"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {job.title}
                </h3>
                <p className="text-[#6B7280] text-sm font-medium">{job.company}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSave && jobId) onSave(jobId);
              }}
              aria-label={isSaved ? "Unsave job" : "Save job"}
              className="p-2 rounded-xl hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <Bookmark size={18} className={isSaved ? "text-[#F05A22] fill-[#F05A22]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-lg">
              <MapPin size={12} /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-lg">
              <DollarSign size={12} /> {job.salary}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-lg">
              <Clock size={12} /> {job.postedAt}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2 border-t border-[#F5F5F5]">
            <div className="flex gap-1.5 flex-wrap">
              <span
                className={`px-2.5 py-1 text-[11px] rounded-full font-semibold ${job.remote ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
                  }`}
              >
                {job.employmentType || "Full-time"}
              </span>
              <span className="px-2.5 py-1 text-[11px] rounded-full font-semibold bg-orange-50 text-[#F05A22] capitalize">
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