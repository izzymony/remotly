"use client";

import { Hero } from "@/app/components/landing/Hero";
import { Categories } from "@/app/components/landing/Categories";
import { FeaturedJobs } from "@/app/components/landing/FeaturedJobs";
import { TopCompanies } from "@/app/components/landing/TopCompanies";
import { HowItWorks } from "@/app/components/landing/HowItWorks";
import { Testimonials } from "@/app/components/landing/Testimonials";
import { CTA } from "@/app/components/landing/CTA";
import { Footer } from "@/app/components/landing/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Hero />
      <Categories />
      <FeaturedJobs />
      <TopCompanies />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
