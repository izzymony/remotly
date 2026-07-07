"use client";

import { ArrowRight } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import { JobCard } from "@/app/components/shared/JobCard";

export function FeaturedJobs() {
  const featuredJobs = JOBS.filter((j) => j.featured);

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
          <button

            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#F05A22] hover:gap-3 transition-all"
          >
            View all jobs <ArrowRight size={15} />
          </button>
        </div>

        <div className="">
          <JobCard />
        </div>
      </div>
    </section>
  );
}
