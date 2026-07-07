"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Nav } from "@/app/components/navigation/nav";
import { Hero } from "@/app/components/landing/Hero";
import { Categories } from "@/app/components/landing/Categories";
import { FeaturedJobs } from "@/app/components/landing/FeaturedJobs";
import { TopCompanies } from "@/app/components/landing/TopCompanies";
import { HowItWorks } from "@/app/components/landing/HowItWorks";
import { Testimonials } from "@/app/components/landing/Testimonials";
import { CTA } from "@/app/components/landing/CTA";
import { Footer } from "@/app/components/landing/Footer";
import { SearchHeader } from "@/app/components/search/SearchHeader";
import { ActiveFilters } from "@/app/components/search/ActiveFilters";

import { SearchResults } from "@/app/components/search/SearchResults";
import { JobHeader } from "@/app/components/job/JobHeader";
import { JobOverview } from "@/app/components/job/JobOverview";
import { JobRequirements } from "@/app/components/job/JobRequirements";
import { SimilarJobs } from "@/app/components/job/SimilarJobs";
import { ApplySidebar } from "@/app/components/job/ApplySidebar";
import { SavedJobsPage } from "@/app/components/pages/SavedJobsPage";
import { CompaniesPage } from "@/app/components/pages/CompaniesPage";
import { CompanyProfilePage } from "@/app/components/pages/CompanyProfilePage";
import { DashboardPage } from "@/app/components/pages/DashboardPage";
import { COMPANIES } from "@/app/data/companies";
import { JOBS } from "@/app/data/jobs";
import { CompanyCard } from "./components/shared/CompanyCard";

type Company = typeof COMPANIES[0];
type Job = typeof JOBS[0];

export default function App() {
  const [page, setPage] = useState<string>("landing");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedSearchJob, setSelectedSearchJob] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1, 4]));

  const handleSave = useCallback((jobId: number) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  }, []);

  const handleSetPage = useCallback((p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSetSelectedJob = useCallback((j: Job) => {
    setSelectedJob(j);
  }, []);

  const handleSetSelectedCompany = useCallback((c: Company) => {
    setSelectedCompany(c);
  }, []);

  const handleSearchJobSelect = useCallback((j: any) => {
    setSelectedSearchJob(j);
  }, []);

  const handleCloseSearchSidebar = useCallback(() => {
    setSelectedSearchJob(null);
  }, []);

  const [query, setQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      if (
        query &&
        !job.title.toLowerCase().includes(query.toLowerCase()) &&
        !job.company.toLowerCase().includes(query.toLowerCase()) &&
        !job.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      )
        return false;
      if (remoteOnly && !job.remote) return false;
      if (selectedTypes.length && !selectedTypes.includes(job.type)) return false;
      if (selectedLevels.length && !selectedLevels.includes(job.level)) return false;
      if (selectedCategories.length && !selectedCategories.includes(job.category)) return false;
      return true;
    });
  }, [query, remoteOnly, selectedTypes, selectedLevels, selectedCategories]);

  const activeFilterCount =
    (remoteOnly ? 1 : 0) + selectedTypes.length + selectedLevels.length + selectedCategories.length;

  const clearAllFilters = () => {
    setRemoteOnly(false);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedCategories([]);
    setQuery("");
  };

  const handleHeroSearch = (query: string) => {
    setQuery(query);
  };

  const [applied, setApplied] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFFF]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Nav page={page} setPage={handleSetPage} savedCount={savedJobs.size} />

      {page === "landing" && (
        <>
          <Hero setPage={handleSetPage} onSearch={handleHeroSearch} />
          <Categories setPage={handleSetPage} />
          <FeaturedJobs />
          <TopCompanies
            setPage={handleSetPage}
            setSelectedCompany={handleSetSelectedCompany}
          />
          <HowItWorks />
          <Testimonials />
          <CTA setPage={handleSetPage} />
          <Footer />
        </>
      )}

      {page === "search" && (
        <div className="pt-16 min-h-screen bg-[#FFFFFF]">
          <SearchHeader
            query={query}
            setQuery={setQuery}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeFilterCount={activeFilterCount}
          />
          <ActiveFilters
            remoteOnly={remoteOnly}
            setRemoteOnly={setRemoteOnly}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            clearAllFilters={clearAllFilters}
          />
          <div className="">
          
            <SearchResults
             
            />
          </div>

          <AnimatePresence>
            {selectedSearchJob && (
              <ApplySidebar
                job={selectedSearchJob}
                applied={false}
                onApply={() => {}}
                
                isSaved={savedJobs.has(parseInt(String(selectedSearchJob.id)))}
                onClose={handleCloseSearchSidebar}
                onViewCompany={() => {
                  const company = COMPANIES.find((c) => c.name === selectedSearchJob.company);
                  if (company) {
                    setSelectedCompany(company);
                    handleSetPage("company");
                  }
                }}
                variant="overlay"
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {page === "job" && selectedJob && (
        <div className="pt-16 min-h-screen bg-[#FFFFFF]">
          <div className="bg-white border-b border-[#EAEAEA] px-5 py-3">
            <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-sm text-[#6B7280]">
              <button onClick={() => handleSetPage("landing")} className="hover:text-[#F05A22] transition-colors">Home</button>
              <span>›</span>
              <button onClick={() => handleSetPage("search")} className="hover:text-[#F05A22] transition-colors">Jobs</button>
              <span>›</span>
              <span className="text-[#111111] font-medium truncate">{selectedJob.title}</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-5 py-8 grid lg:grid-cols-[1fr_440px] gap-7">
            <article className="space-y-5">
              <JobHeader
                job={selectedJob}
                company={COMPANIES.find((c) => c.id === selectedJob.companyId)!}
                isSaved={savedJobs.has(selectedJob.id)}
                onSave={() => handleSave(selectedJob.id)}
              />
              <JobOverview job={selectedJob} />
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-6">
                  <h2 className="font-bold text-[#111111] mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {selectedJob.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-[#6B7280]">
                        <span className="text-[#22C55E] mt-0.5">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <JobRequirements job={selectedJob} />
              </div>
              <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-7">
                <h2 className="font-bold text-[#111111] mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Benefits & perks
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedJob.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 bg-[#FFFFFF] rounded-xl p-3 border border-[#EAEAEA]">
                      <span className="text-[#F05A22]">★</span>
                      <span className="text-sm text-[#111111]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <aside>
<div className="sticky top-24 h-[calc(100vh-7rem)] flex flex-col">
               <ApplySidebar
                  job={selectedJob}
                  
                  applied={applied}
                  onApply={() => setApplied(true)}
                  onSave={() => handleSave(selectedJob.id)}
                  isSaved={savedJobs.has(selectedJob.id)}
                  onViewCompany={() => {
                    setSelectedCompany(COMPANIES.find((c) => c.id === selectedJob.companyId)!);
                    handleSetPage("company");
                  }}
                  variant="inline"
                />
              </div>
              <SimilarJobs
                jobs={JOBS.filter((j) => j.id !== selectedJob.id && j.category === selectedJob.category).slice(0, 3)}
                onSelect={(j) => {
                  setSelectedJob(j);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </aside>
          </div>
        </div>
      )}

      {page === "saved" && (
        <SavedJobsPage
          savedJobs={savedJobs}
          onSave={handleSave}
          setPage={handleSetPage}
          setSelectedJob={handleSetSelectedJob}
        />
      )}

      {page === "companies" && (
        <div className="pt-16 min-h-screen bg-[#FFFFFF]">
          <CompaniesPage
            
          />
        </div>
      )}

      {page === "company" && selectedCompany && (
        <CompanyProfilePage
          company={selectedCompany}
          setPage={handleSetPage}
          setSelectedJob={handleSetSelectedJob}
        />
      )}

      {page === "dashboard" && (
        <DashboardPage
          savedJobs={savedJobs}
          setPage={handleSetPage}
          setSelectedJob={handleSetSelectedJob}
        />
      )}
    </div>
  );
}
