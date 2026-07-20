"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANIES } from "@/app/data/companies";
import { CompanyCard } from "@/app/components/shared/CompanyCard";

export function TopCompanies() {
  const topCompanies = COMPANIES.slice(0, 6);

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-purple uppercase mb-3">
              Top companies
            </span>
            <h2
              className="text-3xl font-bold text-charcoal mb-1.5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Join world-class teams
            </h2>
            <p className="text-charcoal-50">The most innovative companies hiring right now.</p>
          </div>
          <Link
            href="/companies"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-purple hover:text-purple-dark transition-colors group"
          >
            All companies
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <CompanyCard companies={topCompanies} />
      </div>
    </section>
  );
}
