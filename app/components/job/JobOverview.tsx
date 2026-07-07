"use client";

import { type Job } from "@/app/data/jobs";

export function JobOverview({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
      <h2 className="text-lg font-bold text-[#111111] mb-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        About this role
      </h2>
      <p className="text-[#6B7280] leading-relaxed">{job.description}</p>
    </div>
  );
}
