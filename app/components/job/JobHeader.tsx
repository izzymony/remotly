"use client";

import { Bookmark, BookmarkCheck, DollarSign, MapPin, Briefcase, TrendingUp, Clock } from "lucide-react";
import { type Job } from "@/app/data/jobs";
import { type Company } from "@/app/data/companies";
import  CompanyLogo  from "@/app/components/shared/CompanyLogo";

export function JobHeader({
  job,
  company,
  isSaved,
  onSave,
}: {
  job: Job;
  company: Company;
  isSaved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
      <div className="flex items-start gap-4 mb-6">
        <CompanyLogo company={company} size={62} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#111111] leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {job.title}
          </h1>
          <p className="text-[#6B7280] mt-1">
            {job.company} · {job.location}
          </p>
        </div>
        <button
          onClick={onSave}
          className="p-2 rounded-xl border border-[#EAEAEA] hover:border-[#F05A22] transition-colors"
        >
          {isSaved ? (
            <BookmarkCheck size={19} className="text-[#F05A22]" />
          ) : (
            <Bookmark size={19} className="text-[#6B7280]" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-5">
        {[
          { icon: <DollarSign size={13} />, label: job.salary },
          { icon: <MapPin size={13} />, label: job.location },
          { icon: <Briefcase size={13} />, label: job.type },
          { icon: <TrendingUp size={13} />, label: job.level },
          { icon: <Clock size={13} />, label: `Posted ${job.posted}` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-sm text-[#6B7280] bg-[#FFFFFF] px-3 py-1.5 rounded-lg border border-[#EAEAEA]">
            <span className="text-[#F05A22]">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span key={skill} className="px-3 py-1.5 bg-[#FFF3EE] text-[#F05A22] text-sm rounded-lg font-medium">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
