"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ArrowUpRight, Building2, MapPin, Briefcase, Star } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  companies?: unknown[];
}

export function CompanyCard({ companies: passedCompanies }: CompanyCardProps) {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const { data: fetchedData, isLoading, error } = useQuery({
    queryKey: ["companies"],
    enabled: !passedCompanies,
    queryFn: async () => {
      const res = await fetch("/api/companies", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch companies from API");
      }

      const payload = await res.json();
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.companies)) return payload.companies;
      if (Array.isArray(payload?.data)) return payload.data;
      return [];
    },
  });

  if (!passedCompanies && isLoading) return (
    <div className="flex h-48 w-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple border-t-transparent" />
    </div>
  );
  if (!passedCompanies && error) return <div className="p-4 text-sm text-red-500">Error loading companies</div>;

  const data = passedCompanies ?? fetchedData;

  // Generate deterministic rating & reviews count for companies
  const getMockRating = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = 4.0 + (Math.abs(hash) % 10) / 10;
    const reviews = 12 + (Math.abs(hash) % 180);
    return { score: score.toFixed(1), reviews };
  };

  return (
    <div className="grid px-0 mt-6 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((company: Record<string, unknown>, index: number) => {
        const companyId = String(company.company_id || company.id || company.name || `company-${index}`);
        const isFollowing = Boolean(followed[companyId]);
        const companyName = String(company.name ?? "");
        const ratingInfo = getMockRating(companyName);

        const logoValue = typeof company.logo_url === "string"
          ? company.logo_url
          : typeof company.logo === "string"
            ? company.logo
            : "";
        const hasValidImageUrl = (() => {
          if (!logoValue) return false;
          if (typeof logoValue !== "string") return false;
          if (logoValue.startsWith("#")) return false;
          try {
            const parsed = new URL(logoValue);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
          } catch {
            return false;
          }
        })();

        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm shadow-black/[0.01] transition-all hover:border-purple/30 hover:shadow-lg hover:shadow-purple/[0.06]"
            key={companyId}
          >
            {/* Soft background hover gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-light/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-light bg-border-light shadow-sm">
                {hasValidImageUrl ? (
                  <Image
                    src={logoValue}
                    alt={companyName}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: typeof company.logo === 'string' && company.logo.startsWith('#') ? company.logo : '#7C3AED' }}
                  >
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFollowed((current) => ({ ...current, [companyId]: !current[companyId] }));
                }}
                className={`flex h-8 items-center justify-center rounded-lg px-4 text-xs font-semibold transition-all duration-200 border ${
                  isFollowing
                    ? "bg-purple text-white border-purple hover:bg-purple-dark hover:border-purple-dark"
                    : "border-border bg-white text-charcoal hover:border-purple hover:bg-purple-light hover:text-purple"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className="relative z-10 mt-5">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Link href={`/companies/${companyId}`} className="block">
                  <h3 className="text-[17px] font-bold tracking-tight text-charcoal transition-colors group-hover:text-purple">
                    {companyName}
                  </h3>
                </Link>
                {/* Purple Star Rating badge */}
                <div className="flex items-center gap-1 bg-purple-light text-purple-dark px-2 py-0.5 rounded-lg text-xs font-semibold">
                  <Star size={11} className="fill-purple-dark text-purple-dark" />
                  <span>{ratingInfo.score}</span>
                  <span className="text-[10px] text-purple/60 font-medium font-mono">({ratingInfo.reviews})</span>
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-charcoal-50">
                {String(company.description || company.tagline || "Explore opportunities with this team and discover what it's like to work here.")}
              </p>
            </div>

            <div className="relative z-10 mt-4.5 flex flex-wrap items-center gap-2">
              {company.industry ? (
                <span className="flex items-center gap-1.5 rounded-lg border border-border-light bg-border-light px-2.5 py-1 text-[11px] font-medium text-charcoal-50">
                  <Briefcase size={12} className="text-charcoal-30" />
                  {String(company.industry)}
                </span>
              ) : null}
              {company.location ? (
                <span className="flex items-center gap-1.5 rounded-lg border border-border-light bg-border-light px-2.5 py-1 text-[11px] font-medium text-charcoal-50">
                  <MapPin size={12} className="text-charcoal-30" />
                  {String(company.location)}
                </span>
              ) : null}
            </div>

            <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border-light pt-3.5 transition-colors group-hover:border-purple/10">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-light text-purple">
                  <Building2 size={13} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-charcoal">
                  <span className="text-purple">{String(company.job_count ?? company.openJobs ?? 0)}</span> open roles
                </span>
              </div>
              <Link
                href={`/companies/${companyId}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-border-light text-charcoal-50 transition-all hover:bg-purple hover:text-white"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
