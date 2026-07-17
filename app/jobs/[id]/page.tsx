"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import { JobHeader } from "@/app/components/job/JobHeader";
import { JobOverview } from "@/app/components/job/JobOverview";
import { JobRequirements } from "@/app/components/job/JobRequirements";
import { SimilarJobs } from "@/app/components/job/SimilarJobs";
import { ApplySidebar } from "@/app/components/job/ApplySidebar";
import { useSavedJobs } from "@/app/components/provider";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { savedJobs, toggleSaveJob } = useSavedJobs();
  const [applied, setApplied] = useState(false);

  const id = params.id;
  const job = JOBS.find((j) => String(j.id) === id);

  if (!job) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center px-5">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Job not found</h2>
          <p className="text-[#6E7A6E] mb-6">The job you are looking for does not exist or has been filled.</p>
          <Link href="/jobs" className="bg-[#5A7A6A] hover:bg-[#3D5C4E] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const company = COMPANIES.find((c) => c.id === job.companyId)!;
  const isSaved = savedJobs.has(job.id);

  const jobListing = {
    id: String(job.id),
    title: job.title,
    company: job.company,
    location: job.location,
    description: job.description,
    salary: job.salary,
    employmentType: job.type,
    postedAt: job.posted,
    remote: job.remote,
    provider: "indeed" as const,
  };

  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F7]">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E4EBE6] px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-semibold text-[#7A7A7A]">
          <Link href="/" className="hover:text-[#5A7A6A] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/jobs" className="hover:text-[#5A7A6A] transition-colors">Jobs</Link>
          <span>›</span>
          <span className="text-[#2C2C2C] truncate font-bold">{job.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 grid lg:grid-cols-[1fr_420px] gap-7">
        <article className="space-y-6">
          <JobHeader
            job={job}
            company={company}
            isSaved={isSaved}
            onSave={() => toggleSaveJob(job.id)}
          />
          <JobOverview job={job} />
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Responsibilities */}
            <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm shadow-black/[0.01]">
              <h2 className="font-bold text-[#2C2C2C] mb-4 text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#6E7A6E] font-medium leading-relaxed">
                    <span className="text-[#5A7A6A] mt-0.5 font-bold">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <JobRequirements job={job} />
          </div>

          {/* Benefits & Perks */}
          <div className="bg-white rounded-3xl border border-[#E4EBE6] p-7 shadow-sm shadow-black/[0.01]">
            <h2 className="font-bold text-[#2C2C2C] mb-5 text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Benefits & Perks
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {job.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 bg-[#FAF9F7] rounded-xl p-3 border border-[#E4EBE6] hover:border-[#5A7A6A]/20 transition-all">
                  <span className="text-[#5A7A6A] text-xs">★</span>
                  <span className="text-xs font-semibold text-[#2C2C2C]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
            <ApplySidebar
              job={jobListing}
              applied={applied}
              onApply={() => setApplied(true)}
              onSave={() => toggleSaveJob(job.id)}
              isSaved={isSaved}
              onViewCompany={() => {
                router.push(`/companies/${job.companyId}`);
              }}
              variant="inline"
            />
          </div>
          <SimilarJobs
            jobs={JOBS.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 3)}
            onSelect={(j) => {
              router.push(`/jobs/${j.id}`);
            }}
          />
        </aside>
      </div>
    </div>
  );
}
