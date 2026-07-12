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
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Job not found</h2>
          <p className="text-[#6B7280] mb-6">The job you are looking for does not exist or has been filled.</p>
          <Link href="/jobs" className="bg-[#F05A22] text-white px-5 py-2.5 rounded-xl font-semibold">
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
    <div className="pt-16 min-h-screen bg-[#FFFFFF]">
      <div className="bg-white border-b border-[#EAEAEA] px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#F05A22] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/jobs" className="hover:text-[#F05A22] transition-colors">Jobs</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium truncate">{job.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 grid lg:grid-cols-[1fr_440px] gap-7">
        <article className="space-y-5">
          <JobHeader
            job={job}
            company={company}
            isSaved={isSaved}
            onSave={() => toggleSaveJob(job.id)}
          />
          <JobOverview job={job} />
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
              <h2 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#6B7280]">
                    <span className="text-[#22C55E] mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <JobRequirements job={job} />
          </div>
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
            <h2 className="font-bold text-[#111111] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Benefits & perks
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {job.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 bg-[#FFFFFF] rounded-xl p-3 border border-[#EAEAEA]">
                  <span className="text-[#F05A22]">★</span>
                  <span className="text-sm text-[#111111]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside>
          <div className="sticky top-24 h-[calc(100vh-7rem)] flex flex-col">
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
