"use client";

import React from 'react';
import { ExternalLink, X, Bookmark, MapPin, DollarSign, Clock, ChevronDown, ChevronUp } from "lucide-react";
import CompanyLogo from "@/app/components/shared/CompanyLogo";
import { type JobListing } from "@/types/jobs";

export function ApplySidebar({
  job,
  applied,
  onApply,
  onSave,
  isSaved,
  onViewCompany,
  onClose,
  variant = "inline",
}: {
  job: JobListing;
  applied?: boolean;
  onApply?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  onViewCompany?: () => void;
  onClose?: () => void;
  variant?: "overlay" | "inline";
}) {
  const isOverlay = variant === "overlay";
  const [expanded, setExpanded] = React.useState(false);

  const description = job.description || "Join our team and help build amazing products. We're looking for talented individuals who are passionate about remote work and making an impact.";
  const shouldTruncate = description.length > 220;
  const displayDescription = shouldTruncate && !expanded
    ? description.slice(0, 220) + "..."
    : description;

  return (
    <div
      className={`h-full flex flex-col bg-white ${isOverlay ? "" : "rounded-2xl border border-[#E4EBE6] shadow-sm shadow-black/[0.01]"}`}
    >
      {/* Header */}
      <div className={`flex-shrink-0 ${isOverlay ? "p-5 border-b border-[#EEF3EF]" : "p-6 pb-4 border-b border-[#EEF3EF]"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-[#EBF2EE]">
              <CompanyLogo
                companyName={job.company}
                companyLogoUrl={job.companyLogoUrl}
                size={40}
              />
            </div>
            <div>
              <h3 className="font-bold text-[#2C2C2C] text-[16px] leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {job.title}
              </h3>
              <p className="text-[#6E7A6E] text-xs font-semibold mt-0.5">{job.company}</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} aria-label="Close details" className="p-2 rounded-xl hover:bg-[#FAF9F7] text-[#7A7A7A] transition-colors">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`space-y-6 ${isOverlay ? "p-5" : "p-6 pt-4"}`}>
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1.5 text-xs text-[#6E7A6E] bg-[#FAF9F7] px-3 py-1.5 rounded-lg border border-[#EEF3EF] font-medium">
              <MapPin size={12} className="text-[#5A7A6A]" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6E7A6E] bg-[#FAF9F7] px-3 py-1.5 rounded-lg border border-[#EEF3EF] font-medium font-mono">
              <DollarSign size={12} className="text-[#5A7A6A]" /> {job.salary}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6E7A6E] bg-[#FAF9F7] px-3 py-1.5 rounded-lg border border-[#EEF3EF] font-medium">
              <Clock size={12} className="text-[#5A7A6A]" /> {job.postedAt}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-[#2C2C2C] font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Description</h4>
            <p className="text-sm text-[#6E7A6E] leading-relaxed whitespace-pre-line">
              {displayDescription}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-bold text-[#5A7A6A] hover:text-[#3D5C4E] transition-colors mt-2"
              >
                {expanded ? (
                  <>Read Less <ChevronUp size={14} /></>
                ) : (
                  <>Read More <ChevronDown size={14} /></>
                )}
              </button>
            )}
          </div>

          {/* Job Details Grid */}
          <div className="space-y-3">
            <h4 className="text-[#2C2C2C] font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Job Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FAF9F7] rounded-xl p-3 border border-[#E4EBE6]">
                <p className="text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-0.5">Job Type</p>
                <p className="text-xs font-semibold text-[#2C2C2C]">{job.employmentType || "Full-time"}</p>
              </div>
              <div className="bg-[#FAF9F7] rounded-xl p-3 border border-[#E4EBE6]">
                <p className="text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-0.5">Source</p>
                <p className="text-xs font-semibold text-[#2C2C2C] capitalize">{job.provider}</p>
              </div>
              <div className="bg-[#FAF9F7] rounded-xl p-3 border border-[#E4EBE6] col-span-2">
                <p className="text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-0.5">Location</p>
                <p className="text-xs font-semibold text-[#2C2C2C]">{job.location}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h4 className="text-[#2C2C2C] font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Tags</h4>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold border ${
                job.remote
                  ? "bg-[#E8F1F5] text-[#5E6EA0] border-[#E8F1F5]"
                  : "bg-[#FAF9F7] text-[#6E7A6E] border-[#E4EBE6]"
              }`}>
                {job.employmentType || "Full-time"}
              </span>
              <span className="px-2.5 py-1 text-[11px] rounded-lg font-semibold bg-[#EBF2EE] text-[#5A7A6A] border border-[#5A7A6A]/10 capitalize">
                {job.provider}
              </span>
              {job.remote && (
                <span className="px-2.5 py-1 text-[11px] rounded-lg font-semibold bg-[#FAF9F7] text-[#5A7A6A] border border-[#5A7A6A]/10">
                  Remote friendly
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={`flex-shrink-0 ${isOverlay ? "p-5 pt-3 border-t border-[#EEF3EF]" : "p-6 pt-4 border-t border-[#EEF3EF]"} space-y-2.5`}>
        <button
          onClick={onApply}
          className="w-full px-6 py-3 bg-[#5A7A6A] hover:bg-[#3D5C4E] rounded-xl text-white font-semibold text-sm shadow-sm shadow-[#5A7A6A]/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          Apply Now <ExternalLink size={15} />
        </button>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2.5 border border-[#E4EBE6] hover:border-[#5A7A6A] rounded-xl text-xs font-semibold text-[#4A4A4A] hover:text-[#5A7A6A] bg-white transition-all flex items-center justify-center gap-1.5"
          >
            <Bookmark size={14} className={isSaved ? "fill-[#5A7A6A] text-[#5A7A6A]" : "text-[#7A7A7A]"} />
            {isSaved ? "Saved" : "Save"}
          </button>
          {onViewCompany && (
            <button
              onClick={onViewCompany}
              className="flex-1 px-4 py-2.5 border border-[#E4EBE6] hover:border-[#5A7A6A] rounded-xl text-xs font-semibold text-[#4A4A4A] hover:text-[#5A7A6A] bg-white transition-all"
            >
              View Company
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
