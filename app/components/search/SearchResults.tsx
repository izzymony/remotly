"use client"
import React, { useState, useMemo } from 'react'
import { Search as SearchIcon } from "lucide-react";
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleCardClick = (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleCloseSidebar = () => {
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse w-full bg-gray-100 border border-gray-200 h-[180px] rounded-[20px]" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse w-full bg-gray-100 border border-gray-200 h-[180px] rounded-[20px]" />
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 border border-gray-200 h-[180px] rounded-[20px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-orange-500">Open roles</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {listings.length} {listings.length === 1 ? "role" : "roles"} available
          </p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 xl:col-span-4">
          {listings.length === 0 ? (
            <div className="rounded-[1.25rem] border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <SearchIcon className="mx-auto h-10 w-10 text-zinc-400" />
              <h3 className="mt-4 text-lg font-semibold">No roles found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Try adjusting your search terms, location, or selected filters to see more opportunities.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {listings.map((job: JobListing) => (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-[20px] p-5 border cursor-pointer group transition-all hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-200 flex flex-col h-full ${selectedJob?.id === job.id ? 'border-[#F05A22] shadow-md shadow-orange-100' : 'border-[#EAEAEA]'}`}
                    onClick={() => handleCardClick(job)}
                    key={job.id}
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
                      {(() => {
                        const jobId = typeof job.id === 'string' ? parseInt(job.id) : job.id;
                        const isSaved = savedJobs.has(jobId);
                        return (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (jobId) toggleSaveJob(jobId);
                            }}
                            className="p-2 rounded-xl hover:bg-gray-50 transition-colors flex-shrink-0"
                          >
                            <Bookmark size={18} className={isSaved ? "text-[#F05A22] fill-[#F05A22]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"} />
                          </button>
                        );
                      })()}
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
                          className={`px-2.5 py-1 text-[11px] rounded-full font-semibold ${job.remote ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                        >
                          {job.employmentType || "Full-time"}
                        </span>
                        <span className="px-2.5 py-1 text-[11px] rounded-full font-semibold bg-orange-50 text-[#F05A22] capitalize">
                          {job.provider}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasNextPage && (
                <div className="mt-6 flex justify-center pb-8">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-6 py-2.5 bg-orange-500 rounded-full text-white font-medium rounded-xl cursor-pointer shadow-sm"
                  >
                    {isFetchingNextPage ? 'Loading more...' : 'Load 20 more results'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="md:block md:col-span-7 xl:col-span-8">
          {selectedJob ? (
<div className="sticky top-6 h-[calc(100vh-6rem)] overflow-y-auto">
               <ApplySidebar
                job={selectedJob}
                onApply={() => window.open(selectedJob.url, "_blank")}
                onClose={handleCloseSidebar}
                variant="inline"
              />
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900 h-full flex flex-col items-center justify-center">
              <SearchIcon className="mx-auto h-10 w-10 text-zinc-400" />
              <h3 className="mt-4 text-lg font-semibold">Select a job</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Click on any job card to view details and apply
              </p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseSidebar} />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl overflow-hidden"
            >
              <ApplySidebar
                job={selectedJob}
                onApply={() => window.open(selectedJob.url, "_blank")}
                onClose={handleCloseSidebar}
                variant="overlay"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
