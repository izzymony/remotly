"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { JobCard } from "@/app/components/shared/JobCard";
import { useSavedJobs } from "@/app/components/provider";

export function FeaturedJobs() {
  const router = useRouter();
  const { savedJobs, toggleSaveJob } = useSavedJobs();
  
  const featuredListings = JOBS.filter((j) => j.featured).map((j) => ({
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
    <section className="bg-[#FFFFFF] py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-9">
          <div>
            <h2 className="text-3xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Featured jobs
            </h2>
            <p className="text-[#6B7280]">Handpicked roles from our top partner companies.</p>
          </div>
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#F05A22] hover:gap-3 transition-all"
          >
            View all jobs <ArrowRight size={15} />
          </Link>
        </div>

        <div className="">
          <JobCard 
            jobs={featuredListings} 
            onSelect={(job) => router.push(`/jobs/${job.id}`)}
            onSave={toggleSaveJob}
            savedJobs={savedJobs}
          />
        </div>
      </div>
    </section>
  );
}
