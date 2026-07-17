"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Eye,
  FileText,
  ChevronRight,
  Users,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";
import { JOBS } from "@/app/data/jobs";
import { COMPANIES } from "@/app/data/companies";
import CompanyLogo from "@/app/components/shared/CompanyLogo";

import Link from "next/link";
import { useSavedJobs } from "@/app/components/provider";

export function DashboardPage() {
  const { savedJobs } = useSavedJobs();
  const savedJobsList = JOBS.filter((j) => savedJobs.has(j.id));
  const recommendedJobs = JOBS.filter((j) => !savedJobs.has(j.id) && j.featured).slice(0, 4);

  const stats = [
    { label: "Saved Jobs", value: savedJobsList.length, icon: <Bookmark size={18} />, color: "#5A7A6A", bg: "#EBF2EE" },
    { label: "Applications", value: 3, icon: <FileText size={18} />, color: "#40787A", bg: "#E7F2F2" },
    { label: "Profile Views", value: 48, icon: <Eye size={18} />, color: "#6E7A6E", bg: "#F0F4F1" },
    { label: "Interviews", value: 1, icon: <Users size={18} />, color: "#7A755A", bg: "#F5F4EE" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F7]">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Welcome back, Alex 👋
            </h1>
            <p className="text-[#6E7A6E] text-sm mt-1 font-medium">
              Here&apos;s your job search and application activity.
            </p>
          </div>
          <Link
            href="/jobs"
            className="bg-[#5A7A6A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#3D5C4E] transition-colors text-sm shadow-sm shadow-[#5A7A6A]/20 inline-block"
          >
            Find Jobs
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[#E4EBE6] p-5 shadow-sm shadow-black/[0.01]">
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ backgroundColor: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold text-[#2C2C2C]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#7A7A7A] font-semibold mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 mb-7 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-[#2C2C2C] text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Profile completion
              </h2>
              <p className="text-xs text-[#6E7A6E] mt-0.5 font-medium">
                Complete your profile to unlock 4x higher recruiter visibility
              </p>
            </div>
            <span className="text-lg font-bold text-[#5A7A6A] font-mono" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              72%
            </span>
          </div>
          <div className="h-2.5 bg-[#FAF9F7] border border-[#EEF3EF] rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-[#5A7A6A] rounded-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Resume uploaded", done: true },
              { label: "Skills added", done: true },
              { label: "Portfolio link", done: false },
              { label: "LinkedIn connected", done: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full font-medium ${
                  item.done ? "bg-[#EBF2EE] text-[#3D5C4E]" : "bg-[#FAF9F7] text-[#7A7A7A] border border-[#E4EBE6]"
                }`}
              >
                {item.done ? (
                  <CheckCircle size={12} className="text-[#5A7A6A]" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-[#7A7A7A]/60" />
                )}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Saved Jobs */}
          <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EEF3EF]">
              <h2 className="font-bold text-[#2C2C2C] text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Saved Jobs
              </h2>
              <Link href="/saved" className="text-xs text-[#5A7A6A] hover:underline font-semibold">
                View all
              </Link>
            </div>
            {savedJobsList.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark size={20} className="mx-auto mb-2 text-[#A8A8A8]" />
                <p className="text-sm text-[#7A7A7A]">No saved jobs yet</p>
                <Link href="/jobs" className="mt-3 text-xs text-[#5A7A6A] hover:underline inline-block font-semibold">
                  Explore Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {savedJobsList.slice(0, 4).map((job) => {
                  const company = COMPANIES.find((c) => c.id === job.companyId)!;
                  return (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF9F7] transition-all duration-150 text-left group block"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <CompanyLogo company={company} size={36} />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#2C2C2C] text-sm truncate group-hover:text-[#5A7A6A] transition-colors">
                            {job.title}
                          </p>
                          <p className="text-xs text-[#6E7A6E] mt-0.5">{job.company} · {job.salary}</p>
                        </div>
                        <ChevronRight size={13} className="text-[#A8A8A8] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommended */}
          <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EEF3EF]">
              <h2 className="font-bold text-[#2C2C2C] text-[15px]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Recommended for you
              </h2>
              <Link href="/jobs" className="text-xs text-[#5A7A6A] hover:underline font-semibold">
                Explore
              </Link>
            </div>
            <div className="space-y-1">
              {recommendedJobs.map((job) => {
                const company = COMPANIES.find((c) => c.id === job.companyId)!;
                return (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF9F7] transition-all duration-150 text-left group block"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <CompanyLogo company={company} size={36} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#2C2C2C] text-sm truncate group-hover:text-[#5A7A6A] transition-colors">
                          {job.title}
                        </p>
                        <p className="text-xs text-[#6E7A6E] mt-0.5">{job.company} · {job.salary}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#5A7A6A] bg-[#EBF2EE] px-2 py-1 rounded-lg flex-shrink-0 font-mono uppercase tracking-wider">
                        <Sparkles size={9} /> Match
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
            <h2 className="font-bold text-[#2C2C2C] text-[15px] mb-4 pb-2 border-b border-[#EEF3EF]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Recent searches
            </h2>
            <div className="space-y-0.5">
              {["Senior React Engineer", "Product Designer Remote", "ML Engineer SF", "Engineering Manager"].map(
                (search) => (
                  <Link
                    key={search}
                    href={`/jobs?q=${encodeURIComponent(search)}`}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#FAF9F7] transition-all duration-150 text-left text-sm text-[#6E7A6E] hover:text-[#5A7A6A] block"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-[#A8A8A8]" />
                      <span className="font-medium">{search}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Applications status */}
          <div className="bg-white rounded-3xl border border-[#E4EBE6] p-6 shadow-sm">
            <h2 className="font-bold text-[#2C2C2C] text-[15px] mb-4 pb-2 border-b border-[#EEF3EF]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Applications
            </h2>
            <div className="space-y-2.5">
              {[
                { title: "Frontend Engineer", company: "Stripe", status: "Interview", statusColor: "#5A7A6A", statusBg: "#EBF2EE" },
                { title: "Product Designer", company: "Figma", status: "Applied", statusColor: "#6E7A6E", statusBg: "#FAF9F7" },
                { title: "ML Research Engineer", company: "OpenAI", status: "Reviewed", statusColor: "#7A755A", statusBg: "#F5F4EE" },
              ].map((app) => (
                <div key={app.title} className="flex items-center justify-between p-3.5 rounded-xl border border-[#E4EBE6] hover:border-[#5A7A6A]/20 hover:bg-[#FAF9F7] transition-all duration-150">
                  <div>
                    <p className="font-semibold text-[#2C2C2C] text-sm">{app.title}</p>
                    <p className="text-xs text-[#6E7A6E] mt-0.5 font-medium">{app.company}</p>
                  </div>
                  <span
                    className="text-[11px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-[#E4EBE6]"
                    style={{ color: app.statusColor, backgroundColor: app.statusBg }}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
