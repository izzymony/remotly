"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { COMPANIES } from "@/app/data/companies";
import { CompanyProfilePage } from "@/app/components/pages/CompanyProfilePage";

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id;
  const company = COMPANIES.find((c) => String(c.id) === id);

  if (!company) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Company not found</h2>
          <p className="text-[#6B7280] mb-6">The company profile you are looking for does not exist.</p>
          <Link href="/companies" className="bg-[#F05A22] text-white px-5 py-2.5 rounded-xl font-semibold">
            Back to companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CompanyProfilePage company={company} />
  );
}
