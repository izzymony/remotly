"use client";

import React, { useState, useMemo } from 'react';
import { Search as SearchIcon } from "lucide-react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react";
import { ApplySidebar } from "@/app/components/job/ApplySidebar";
import CompanyLogo from '@/app/components/shared/CompanyLogo';
import { type JobListing } from '@/types/jobs';
import { useSavedJobs } from '@/app/components/provider';

export function SearchResults({ 
  query = "", 
  location = "",
  remoteOnly = false,
  selectedTypes = [],
  selectedCategories = []
}: { 
  query?: string; 
  location?: string;
  remoteOnly?: boolean;
  selectedTypes?: string[];
  selectedCategories?: string[];
}) {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const { savedJobs, toggleSaveJob } = useSavedJobs();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['jobs-infinite-20', query, location],
    queryFn: async ({ pageParam = 1 }) => {
      let url = `/api/jobs?page=${pageParam}&limit=20`;
      if (query) url += `&q=${encodeURIComponent(query)}`;
      if (location) url += `&location=${encodeURIComponent(location)}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('failed to fetch jobs from API');
      }

      const responseData = await res.json();
      return {
        jobs: responseData.jobs || responseData.data || [],
        totalPages: responseData.totalPages || 1,
        page: responseData.page || pageParam,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.jobs.length > 0 || lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const rawListings = data?.pages.flatMap((page) => page.jobs) || [];
  
  const listings = useMemo(() => {
    return rawListings.filter((job) => {
      if (remoteOnly && !job.remote) return false;
      if (selectedTypes.length && !selectedTypes.includes(job.employmentType || "Full-time")) return false;
      if (selectedCategories.length && !selectedCategories.includes(job.category || "")) return false;
      return true;
    });
  }, [rawListings, remoteOnly, selectedTypes, selectedCategories]);

  const activeJob = selectedJob ?? listings[0] ?? null;

  const handleCardClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleCloseSidebar = () => {
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse w-full bg-white border border-[#E4EBE6] h-[180px] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-5">
        <div className="p-8 text-center text-red-500 font-medium bg-white border border-[#E4EBE6] rounded-2xl">
          Failed to load job listings. Please refresh or try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Open Roles
          </h2>
          <p className="mt-0.5 text-xs font-medium text-[#6E7A6E]">
            {listings.length} {listings.length === 1 ? "role" : "roles"} available
          </p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 xl:col-span-4 space-y-4">
          {listings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E4EBE6] bg-white p-8 text-center">
              <SearchIcon className="mx-auto h-8 w-8 text-[#A8A8A8]" />
              <h3 className="mt-4 text-base font-semibold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>No roles found</h3>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#6E7A6E]">
                Try adjusting your search terms, location, or selected filters to see more opportunities.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {listings.map((job: JobListing) => (
                  <div
                    className={`bg-white rounded-2xl p-5 border cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#5A7A6A]/[0.05] flex flex-col h-full ${
                      activeJob?.id === job.id
                        ? 'border-[#5A7A6A] shadow-md shadow-[#5A7A6A]/[0.06] bg-[#FAF9F7]/30'
                        : 'border-[#E4EBE6]'
                    }`}
                    onClick={() => handleCardClick(job)}
                    key={job.id}
                  >
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="flex items-start gap-3">
                        <CompanyLogo
                          companyName={job.company}
                          companyLogoUrl={job.companyLogoUrl}
                          size={40}
                        />
                        <div>
                          <h3
                            className="font-bold text-[#2C2C2C] group-hover:text-[#5A7A6A] transition-colors text-[15px] leading-tight mb-0.5"
                            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                          >
                            {job.title}
                          </h3>
                          <p className="text-[#6E7A6E] text-xs font-semibold">{job.company}</p>
                        </div>
                      </div>
                      {(() => {
                        const jobId = typeof job.id === 'string' ? parseInt(job.id) : job.id;
                        const isSaved = savedJobs.has(jobId);
                        return (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (jobId) toggleSaveJob(jobId);
                            }}
                            aria-label={isSaved ? "Unsave job" : "Save job"}
                            className="p-1.5 rounded-xl hover:bg-[#FAF9F7] text-[#7A7A7A] hover:text-[#5A7A6A] transition-colors flex-shrink-0"
                          >
                            <Bookmark
                              size={16}
                              className={isSaved ? "text-[#5A7A6A] fill-[#5A7A6A]" : "text-[#7A7A7A] group-hover:text-[#5A7A6A]"}
                            />
                          </button>
                        );
                      })()}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#6E7A6E] bg-[#FAF9F7] px-2 py-0.5 rounded-md">
                        <MapPin size={11} className="text-[#7A7A7A]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#6E7A6E] bg-[#FAF9F7] px-2 py-0.5 rounded-md">
                        <DollarSign size={11} className="text-[#7A7A7A]" /> {job.salary}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2 border-t border-[#EEF3EF]">
                      <div className="flex gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-wider ${
                            job.remote ? "bg-[#E8F1F5] text-[#5E6EA0]" : "bg-[#FAF9F7] text-[#6E7A6E] border border-[#EEF3EF]"
                          }`}
                        >
                          {job.employmentType || "Full-time"}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-wider bg-[#EBF2EE] text-[#5A7A6A]">
                          {job.provider}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasNextPage && (
                <div className="mt-6 flex justify-center pb-8">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-6 py-2.5 bg-[#5A7A6A] hover:bg-[#3D5C4E] text-white text-sm font-semibold rounded-xl cursor-pointer shadow-sm shadow-[#5A7A6A]/20 transition-colors"
                  >
                    {isFetchingNextPage ? 'Loading more...' : 'Load more results'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="md:block md:col-span-7 xl:col-span-8 mt-6 md:mt-0">
          {activeJob ? (
            <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-[#E4EBE6] bg-white p-1">
              <ApplySidebar
                job={activeJob}
                onApply={() => window.open(activeJob.url, "_blank")}
                onClose={handleCloseSidebar}
                variant="inline"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E4EBE6] bg-white p-10 text-center h-full flex flex-col items-center justify-center">
              <SearchIcon className="mx-auto h-8 w-8 text-[#A8A8A8]" />
              <h3 className="mt-4 text-base font-semibold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>No roles selected</h3>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#6E7A6E]">
                Select a job from the list to view full details and apply.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Job details">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleCloseSidebar} />
          <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl overflow-hidden animate-[slideInRight_0.3s_ease-out]">
            <ApplySidebar
              job={selectedJob}
              onApply={() => window.open(selectedJob.url, "_blank")}
              onClose={handleCloseSidebar}
              variant="overlay"
            />
          </div>
        </div>
      )}
    </div>
  );
}
