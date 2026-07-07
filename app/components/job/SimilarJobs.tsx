"use client";

import { ArrowRight } from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import CompanyLogo  from "@/app/components/shared/CompanyLogo";
import { type Job } from "@/app/data/jobs";

export function SimilarJobs({
  jobs,
  onSelect,
}: {
  jobs: Job[];
  onSelect: (job: Job) => void;
}) {
  if (jobs.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
      <h3 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Similar jobs
      </h3>
      <div className="space-y-2">
        {jobs.map((sj) => {
          const sjCompany = COMPANIES.find((c) => c.id === sj.companyId)!;
          return (
            <button
              key={sj.id}
              onClick={() => onSelect(sj)}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] transition-colors"
            >
              <CompanyLogo company={sjCompany} size={34} />
              <div>
                <p className="font-medium text-[#111111] text-sm leading-snug">
                  {sj.title}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {sj.company} · {sj.salary}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
