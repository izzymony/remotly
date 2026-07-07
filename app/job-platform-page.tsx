"use client";

import {
  Briefcase,
  Check,
  MapPin,
  Moon,
  Search as SearchIcon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";


const brandAccent = "#FF4F01";

type JobType = "Full-time" | "Part-time" | "Remote" | "Contract";
type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead";

type JobListing = {
  id: string;
  title: string;
  company: string;
  companyDescription: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  salary: string;
  posted: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  logo: string;
  applyUrl: string;
};



const jobTypes: JobType[] = ["Full-time", "Part-time", "Remote", "Contract"];
const experienceLevels: ExperienceLevel[] = ["Entry", "Mid", "Senior", "Lead"];

const jobs: JobListing[] = [
  {
    id: "product-designer",
    title: "Senior Product Designer",
    company: "Brightline Studio",
    companyDescription:
      "Brightline Studio builds modern SaaS products for distributed teams that need clear workflows and fast decisions.",
    location: "New York, NY",
    type: "Full-time",
    experience: "Senior",
    salary: "$130k - $165k",
    posted: "Posted 2 days ago",
    summary:
      "Lead product discovery, design systems, and high-impact workflows across a growing B2B platform.",
    responsibilities: [
      "Own end-to-end product design for core platform experiences.",
      "Run discovery sessions and translate insights into prototypes.",
      "Partner with engineering and product on delivery quality.",
      "Contribute to the design system and accessibility standards.",
    ],
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    logo: "BS",
    applyUrl: "https://example.com/apply/product-designer",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    company: "Northstar Labs",
    companyDescription:
      "Northstar Labs creates developer tools that help teams ship reliable web applications with less friction.",
    location: "Remote",
    type: "Remote",
    experience: "Mid",
    salary: "$115k - $145k",
    posted: "Posted 4 days ago",
    summary:
      "Build polished, accessible interfaces for a fast-growing developer platform using modern web technologies.",
    responsibilities: [
      "Develop responsive UI components and application flows.",
      "Improve performance, accessibility, and test coverage.",
      "Collaborate with designers on interaction details.",
      "Ship production features in small, reliable iterations.",
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Testing Library"],
    logo: "NL",
    applyUrl: "https://example.com/apply/frontend-engineer",
  },
  {
    id: "growth-marketing",
    title: "Growth Marketing Manager",
    company: "Orbit Commerce",
    companyDescription:
      "Orbit Commerce powers modern storefronts for brands that want fast launches, clean analytics, and loyal customers.",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Mid",
    salary: "$90k - $120k",
    posted: "Posted 1 week ago",
    summary:
      "Own acquisition experiments, lifecycle campaigns, and conversion optimization across the funnel.",
    responsibilities: [
      "Plan and execute multi-channel growth experiments.",
      "Analyze campaign performance and customer segments.",
      "Partner with design and content on landing pages.",
      "Report insights and recommendations to leadership.",
    ],
    skills: ["SEO", "Lifecycle", "Analytics", "Experimentation"],
    logo: "OC",
    applyUrl: "https://example.com/apply/growth-marketing",
  },
  {
    id: "backend-contractor",
    title: "Backend API Contractor",
    company: "Pulse Health",
    companyDescription:
      "Pulse Health connects care teams with simple tools for scheduling, messaging, and patient coordination.",
    location: "Chicago, IL",
    type: "Contract",
    experience: "Senior",
    salary: "$85 - $115/hr",
    posted: "Posted 3 days ago",
    summary:
      "Design and ship secure API services for patient workflows, notifications, and internal operations.",
    responsibilities: [
      "Build REST and event-driven API services.",
      "Improve reliability, observability, and security posture.",
      "Document integration patterns for partner teams.",
      "Support release planning and technical handoff.",
    ],
    skills: ["Node.js", "PostgreSQL", "API Design", "AWS"],
    logo: "PH",
    applyUrl: "https://example.com/apply/backend-api-contractor",
  },
  {
    id: "customer-success",
    title: "Customer Success Associate",
    company: "Mosaic HR",
    companyDescription:
      "Mosaic HR helps people teams modernize onboarding, feedback, and employee experience programs.",
    location: "Denver, CO",
    type: "Part-time",
    experience: "Entry",
    salary: "$35 - $48/hr",
    posted: "Posted 5 days ago",
    summary:
      "Support new customers, guide onboarding, and help teams get value from HR workflows.",
    responsibilities: [
      "Guide customers through onboarding milestones.",
      "Respond to support questions with clear documentation.",
      "Identify product feedback and escalation patterns.",
      "Support renewal and expansion conversations.",
    ],
    skills: ["Customer Support", "Documentation", "CRM", "Communication"],
    logo: "MH",
    applyUrl: "https://example.com/apply/customer-success",
  },
  {
    id: "data-platform-lead",
    title: "Data Platform Lead",
    company: "Cobalt Finance",
    companyDescription:
      "Cobalt Finance builds transparent financial planning tools for operators who need accurate, real-time decisions.",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Lead",
    salary: "$170k - $215k",
    posted: "Posted today",
    summary:
      "Shape the data platform strategy, mentor engineers, and deliver scalable analytics infrastructure.",
    responsibilities: [
      "Define the roadmap for data infrastructure and governance.",
      "Mentor data engineers and partner with analytics teams.",
      "Improve data quality, lineage, and platform reliability.",
      "Lead architecture reviews for high-impact initiatives.",
    ],
    skills: ["Data Modeling", "dbt", "Snowflake", "Leadership"],
    logo: "CF",
    applyUrl: "https://example.com/apply/data-platform-lead",
  },
];

const filterMatches = (
  job: JobListing,
  keyword: string,
  location: string,
  selectedJobTypes: Set<JobType>,
  selectedLevels: Set<ExperienceLevel>,
) => {
  const haystack = [
    job.title,
    job.company,
    job.location,
    job.summary,
    job.type,
    job.experience,
    ...job.skills,
  ]
    .join(" ")
    .toLowerCase();

  const keywordMatches =
    !keyword || haystack.includes(keyword.trim().toLowerCase());
  const locationMatches =
    !location ||
    job.location.toLowerCase().includes(location.trim().toLowerCase()) ||
    (location.trim().toLowerCase() === "remote" && job.location === "Remote");
  const typeMatches =
    selectedJobTypes.size === 0 || selectedJobTypes.has(job.type);
  const levelMatches =
    selectedLevels.size === 0 || selectedLevels.has(job.experience);

  return keywordMatches && locationMatches && typeMatches && levelMatches;
};

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: T[];
  selected: Set<T>;
  onToggle: (option: T) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
        {title}
      </legend>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-brand focus:ring-brand"
              checked={selected.has(option)}
              onChange={() => onToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function JobCard({ job, onSelect }: { job: JobListing; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-full flex-col gap-5 rounded-[1.25rem] border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand/60 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: brandAccent }}
          >
            {job.logo}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
              {job.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {job.company}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          {job.type}
        </span>
      </div>

      <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-zinc-400" />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-zinc-400" />
          {job.experience}
        </div>
        <div className="font-semibold text-zinc-950 dark:text-zinc-100">
          {job.salary}
        </div>
      </div>

      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {job.summary}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          {job.posted}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3">
          View Details
          <Check className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function QuickViewDrawer({
  job,
  onClose,
}: {
  job: JobListing | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = job ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  if (!job) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${job.title} details`}
        className="absolute inset-y-0 right-0 flex w-full max-w-xl translate-x-0 flex-col bg-white shadow-2xl dark:bg-zinc-950"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: brandAccent }}
            >
              {job.logo}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand">{job.company}</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {job.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-200 p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-3 rounded-[1.25rem] bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-zinc-400" />
              {job.type} · {job.experience}
            </div>
            <div className="font-semibold text-zinc-950 dark:text-zinc-100">
              {job.salary}
            </div>
          </div>

          <section className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Company
            </h3>
            <p className="rounded-[1.25rem] border border-zinc-200 bg-white p-4 leading-7 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {job.companyDescription}
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Responsibilities
            </h3>
            <ul className="space-y-3 rounded-[1.25rem] border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 leading-6 text-zinc-700 dark:text-zinc-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Skills & Requirements
            </h3>
            <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-[1.25rem] bg-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-brand/20"
          >
            Apply Now
          </a>
        </div>
      </aside>
    </div>
  );
}

export default function JobPlatformPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<Set<JobType>>(
    () => new Set(),
  );
  const [selectedLevels, setSelectedLevels] = useState<Set<ExperienceLevel>>(
    () => new Set(),
  );
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) =>
        filterMatches(job, keyword, location, selectedJobTypes, selectedLevels),
      ),
    [keyword, location, selectedJobTypes, selectedLevels],
  );

  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes((current) => {
      const next = new Set(current);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const toggleLevel = (level: ExperienceLevel) => {
    setSelectedLevels((current) => {
      const next = new Set(current);
      next.has(level) ? next.delete(level) : next.add(level);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[1.25rem] text-white shadow-sm"
              style={{ backgroundColor: brandAccent }}
            >
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Remotify</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://example.com/post-a-job"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 sm:inline-flex"
            >
              Post a Job
            </a>
            <button aria-labal="Toggle dark mode"
              type="button"
              onClick={() => setIsDark((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,79,1,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(255,79,1,0.08),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-20 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-sm font-semibold text-brand">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Curated roles for modern teams
              </div>
              <h1 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
                Find your next career move.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Browse thoughtful opportunities from ambitious companies, filter by what matters,
                and open a quick view when a role feels right.
              </p>
            </div>

            <form
              className="rounded-[1.25rem] border border-zinc-200 bg-white p-3 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none md:p-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <label className="relative block">
                  <span className="sr-only">Job Title / Keywords</span>
                  <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Job Title / Keywords"
                    className="h-12 w-full rounded-[1.25rem] border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:bg-zinc-900"
                  />
                </label>
                <label className="relative block">
                  <span className="sr-only">Location</span>
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Location"
                    className="h-12 w-full rounded-[1.25rem] border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:bg-zinc-900"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1.25rem] bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-brand/20"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:grid-cols-[18rem_1fr]">
          <aside className="rounded-[1.25rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedJobTypes(new Set());
                  setSelectedLevels(new Set());
                  setKeyword("");
                  setLocation("");
                }}
                className="text-sm font-semibold text-brand hover:text-orange-600"
              >
                Reset
              </button>
            </div>
            <div className="space-y-7">
              <FilterGroup
                title="Job Type"
                options={jobTypes}
                selected={selectedJobTypes}
                onToggle={toggleJobType}
              />
              <FilterGroup
                title="Experience Level"
                options={experienceLevels}
                selected={selectedLevels}
                onToggle={toggleLevel}
              />
            </div>
          </aside>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Open roles</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"} available
                </p>
              </div>
              <a
                href="https://example.com/post-a-job"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:hidden"
              >
                Post a Job
              </a>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={() => setSelectedJob(job)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
                <SearchIcon className="mx-auto h-10 w-10 text-zinc-400" />
                <h3 className="mt-4 text-lg font-semibold">No roles found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  Try adjusting your search terms, location, or selected filters to see more
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <QuickViewDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
