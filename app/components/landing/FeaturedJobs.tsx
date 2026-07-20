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
    <section className="bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-purple uppercase mb-3">
              Featured jobs
            </span>
            <h2
              className="text-3xl font-bold text-charcoal mb-1.5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Handpicked for you
            </h2>
            <p className="text-charcoal-50">Top roles from our partner companies.</p>
          </div>
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-purple hover:text-purple-dark transition-colors group"
          >
            View all jobs
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <JobCard
          jobs={featuredListings}
          onSelect={(job) => router.push(`/jobs/${job.id}`)}
          onSave={toggleSaveJob}
          savedJobs={savedJobs}
        />
      </div>
    </section>
  );
}
