"use client";

import React from 'react';
import { motion } from "framer-motion";
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
  job: 
   JobListing ;
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
    <motion.div

      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`h-full flex flex-col bg-white ${isOverlay ? "" : "rounded-[24px] border border-[#EAEAEA] shadow-sm"}`}
    >
      <div className={`flex-shrink-0  ${isOverlay ? "p-5 border-b border-gray-100" : "p-6 pb-4 border-b border-[#F5F5F5]"}`}>
        <div className="flex items-center justify-between overflow-y-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-50">
              <CompanyLogo
                companyName={job.company}
                companyLogoUrl={job.companyLogoUrl}
                size={40}
              />
            </div>
            <div>
              <h3 className="font-bold text-[#111111] text-[16px] leading-tight">
                {job.title}
              </h3>
              <p className="text-[#6B7280] text-sm font-medium">{job.company}</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <X size={18} className="text-[#9CA3AF]" />
            </button>
          )}
        </div>
      </div>
       <div>   
      <div className={`flex-1 overflow-y-auto ${isOverlay ? "p-5 space-y-6" : "p-6 pt-4 space-y-6"}`}>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <MapPin size={12} className="text-orange-500" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <DollarSign size={12} className="text-orange-500" /> {job.salary}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <Clock size={12} className="text-orange-500" /> {job.postedAt}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-black font-bold text-base">Description</h4>
          <p className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
            {displayDescription}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm font-semibold text-[#F05A22] hover:text-[#d14a1a] transition-colors mt-2"
            >
              {expanded ? (
                <>Read Less <ChevronUp size={16} /></>
              ) : (
                <>Read More <ChevronDown size={16} /></>
              )}
            </button>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-black font-bold text-base">Job Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Job Type</p>
              <p className="text-sm font-medium text-[#111111]">{job.employmentType || "Full-time"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Source</p>
              <p className="text-sm font-medium text-[#111111] capitalize">{job.provider}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-1">Location</p>
              <p className="text-sm font-medium text-[#111111]">{job.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-black font-bold text-base">Tags</h4>
          <div className="flex gap-2 flex-wrap">
            <span className={`px-3 py-1.5 text-xs rounded-full font-semibold border ${job.remote ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {job.employmentType || "Full-time"}
            </span>
            <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-orange-50 text-[#F05A22] border border-orange-100 capitalize">
              {job.provider}
            </span>
            {job.remote && (
              <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-green-50 text-green-600 border border-green-100">
                Remote
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`flex-shrink-0 ${isOverlay ? "p-5 pt-0" : "p-6 pt-0"} space-y-3`}>
        <button
          onClick={onApply}
          className="w-full px-6 py-3 bg-[#F05A22] rounded-full text-white font-medium shadow-sm hover:bg-[#d14a1a] transition-colors flex items-center justify-center gap-2"
        >
          Apply Now <ExternalLink size={16} />
        </button>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2.5 border border-[#EAEAEA] rounded-full text-sm font-medium text-[#111111] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark size={16} className={isSaved ? "fill-[#F05A22] text-[#F05A22]" : "text-[#6B7280]"} />
            {isSaved ? "Saved" : "Save"}
          </button>
          {onViewCompany && (
            <button
              onClick={onViewCompany}
              className="flex-1 px-4 py-2.5 border border-[#EAEAEA] rounded-full text-sm font-medium text-[#111111] hover:bg-gray-50 transition-colors"
            >
              View Company
            </button>
          )}
        </div>
        </div>
      </div>
    </motion.div>
  );
}
