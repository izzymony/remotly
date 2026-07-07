import type { JobListing, JobProvider, JobSearchResponse, ProviderFilter, Companies} from '../types/jobs'
import { apifyToken, adzunaAppId, adzunaAppKey } from '@/lib/tokens'
import {supabase} from '@/lib/supabaseClient'
type FetchJobsInput = {
  q?: string;
  location?: string;
  country?: string;
  page?: number;
  limit?: number;
  provider?: ProviderFilter;
};

type ProviderFetchResult = {
  jobs: JobListing[];
  total?: number;
  error?: string;
};

type CompanyResults = {
  display_name: string;
  canonical_name: string;
  count: number;
  average_salary: number;
};

type AdzunaResult = {
  id?: string;
  title?: string;
  description?: string;
  created?: string;
  redirect_url?: string;
  company?: {
    display_name?: string;
  };
  location?: {
    display_name?: string;
    area?: string[];
  };
  category?: {
    label?: string;
  };
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  salary_is_predicted?: string;
  contract_time?: string;
  contract_type?: string;
};

type ApifyResult = {
  id?: string;
  positionName?: string;
  company?: string;
  location?: string;
  salary?: string;
  description?: string;
  rating: number;
  reviews: number;
  url?: string;
  postedAt?: string;
  postingDateParsed?: string;
  jobType?: string[];
  companyInfo?: {
    companyLogo?: string;
    companyDescription?: string;
  };
};

const DEFAULT_COUNTRY = "us";
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;


const client = {
  apifyToken,
  adzunaAppId,
  adzunaAppKey,
}

export async function fetchJobsFromProviders(
  input: FetchJobsInput,
): Promise<JobSearchResponse> {
  const q = normalizeText(input.q);
  const location = normalizeText(input.location);
  const country = normalizeCountry(input.country);
  const page = clamp(
    Number.parseInt(String(input.page ?? 1), 10) || 1,
    1,
    100,
  );
  const limit = clamp(
    Number.parseInt(String(input.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT,
    1,
    MAX_LIMIT,
  );
  const providers = resolveProviders(input.provider);
  const results = await Promise.all(
    providers.map(async (provider) => {
      if (provider === "adzuna") {
        return fetchAdzunaJobs({ q, location, country, page, limit });
      }

      return fetchApifyIndeedJobs({ q, location, country, page, limit });
    }),
  );
  const jobs = results.flatMap((result) => result.jobs);
  const total = Math.max(
    ...results.map((result) => result.total ?? result.jobs.length),
    jobs.length,
  );
  const errors = results.flatMap((result) => (result.error ? [result.error] : []));

  return {
    jobs,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    providers,
    errors,
    query: {
      q,
      location,
      country,
      provider: input.provider ?? "all",
    },
  };
}

export function formatSalary(
  min?: number,
  max?: number,
  currency = "USD",
): string | undefined {
  if (min === undefined && max === undefined) {
    return undefined;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  const minText = typeof min === "number" ? formatter.format(min) : "Competitive";
  const maxText = typeof max === "number" ? formatter.format(max) : "";

  return maxText ? `${minText} - ${maxText}` : minText;
}

export function getInitials(company: string): string {
  const words = company
    .replace(/[^a-zA-Z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (words.length === 0) {
    return "JO";
  }

  return words
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export function getCompanyLogoUrl(domain?: string): string | undefined {
  return domain ? `https://logo.clearbit.com/${domain}` : undefined;
}

export function extractDomain(value?: string): string {
  if (!value) {
    return "";
  }

  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function stripHtml(value?: string): string {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchAdzunaJobs({
  q,
  location,
  country,
  page,
  limit,
}: Required<Pick<FetchJobsInput, "q" | "location" | "country" | "page" | "limit">>): Promise<ProviderFetchResult> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return {
      jobs: [],
      error: "Adzuna API credentials are not configured.",
    };
  }

  const useCountry = country && country !== "us" ? country : "gb"; // Default to gb per user request if not specified or defaults to us

  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${useCountry}/search/${page}?/app_id={client.adzunaAppId}&app_key={client.adzunaAppKey}`,
  );
  url.searchParams.set("app_id", appId);
  url.searchParams.set("app_key", appKey);
  url.searchParams.set("results_per_page", String(limit));
  url.searchParams.set("content-type", "application/json");

  if (q) {
    url.searchParams.set("what", q);
  }

  if (location) {
    url.searchParams.set("where", location);
  }

  try {
    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Adzuna API returned ${response.status}`);
    }

    const data = (await response.json()) as {
      count?: number;
      results?: AdzunaResult[];
    };

    return {
      total: Number(data.count ?? 0),
      jobs: (data.results ?? []).map((result) => normalizeAdzunaJob(result)),
    };
  } catch (error) {
    return {
      jobs: [],
      error: error instanceof Error ? error.message : "Adzuna API request failed.",
    };
  }
}
export async function fetchCompanies(): Promise<Companies[]> {
  const url = `https://api.apify.com/v2/datasets/ZPQ2Lv1aQWWJ2Oz0L/items?token=${apifyToken}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch companies from Apify: ${res.status}`);
  }
  const data = await res.json();
  // Apify returns data as an array directly
  return Array.isArray(data) ? data : data.data || data.results || [];
}
 

async function fetchApifyIndeedJobs({
  q,
  location,
  country,
  page,
  limit,
}: Required<Pick<FetchJobsInput, "q" | "location" | "country" | "page" | "limit">>): Promise<ProviderFetchResult> {
  const token = process.env.APIFY_KEY ;
  
  if (!token) {
    return {
      jobs: [],
      error: "Apify API credentials are not configured.",
    };
  }

  // Fetch from the Apify dataset
  const offset = (page - 1) * limit;
  const url = new URL(`https://api.apify.com/v2/datasets/nb3mVAwI9zR02H8dZ/items?token=${client.apifyToken}`);
  url.searchParams.set("token", token);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  try {
    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Apify API returned ${response.status}`);
    }

    let data = (await response.json()) as ApifyResult[];
    
    // Perform manual filtering since the dataset API doesn't support complex search
    if (q) {
      data = data.filter(job => 
        (job.positionName && job.positionName.toLowerCase().includes(q.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(q.toLowerCase()))
      );
    }
    
    if (location) {
      data = data.filter(job => 
        job.location && job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return {
      total: data.length, // Rough estimate since it's a dataset
      jobs: data.map((result) => normalizeApifyJob(result)),
    };
  } catch (error) {
    return {
      jobs: [],
      error: error instanceof Error ? error.message : "Apify API request failed.",
    };
  }
}

function normalizeAdzunaJob(result: AdzunaResult): JobListing {
  const domain = extractDomain(result.redirect_url);

  return {
    id: `adzuna-${result.id ?? crypto.randomUUID()}`,
    title: result.title ?? "Untitled role",
    company: result.company?.display_name ?? "Company",
    location: result.location?.display_name ?? "Remote",
    description: stripHtml(result.description),
    url: result.redirect_url ?? "https://www.adzuna.com/",
    provider: "adzuna",
    postedAt: result.created,
    companyLogoUrl: getCompanyLogoUrl(domain),
    domain,
    category: result.category?.label,
    salary: formatSalary(
      result.salary_min,
      result.salary_max,
      result.salary_currency,
    ),


    salaryMin: result.salary_min,
    salaryMax: result.salary_max,
    currency: result.salary_currency,
    employmentType: result.contract_time,
    contractType: result.contract_type,
    remote: /remote/i.test(
      `${result.title ?? ""} ${result.location?.display_name ?? ""}`,
    ),
  };
}

function normalizeApifyJob(result: ApifyResult): JobListing {
  const domain = extractDomain(result.url);

  return {
    id: `indeed-${result.id ?? crypto.randomUUID()}`,
    title: result.positionName ?? "Untitled role",
    company: result.company ?? "Company",
    location: result.location ?? "Remote",
    description: stripHtml(result.description),
    url: result.url ?? "https://www.indeed.com/",
    provider: "indeed",
    rating: result.rating,
    CompanyInfo:result.companyInfo,
    jobType:result.jobType,
    postedAt: result.postedAt || result.postingDateParsed,
    companyLogoUrl: result.companyInfo?.companyLogo || getCompanyLogoUrl(domain),
    domain,
    salary: result.salary,
    employmentType: result.jobType && result.jobType.length > 0 ? result.jobType[0] : undefined,
    remote: /remote/i.test(`${result.positionName ?? ""} ${result.location ?? ""}`),
  };
}

function resolveProviders(provider?: ProviderFilter): JobProvider[] {
  if (provider === "adzuna" || provider === "indeed") {
    return [provider];
  }

  return ["adzuna", "indeed"];
}



async function saveJobsToSupabase(jobs: JobListing[]) {
  if (jobs.length === 0) return;

  // Map JobListing properties to match your exact public.jobs schema
  const dbRows = jobs.map((job) => {
    // Determine employment type string from the normalized job
    const jobType = job.employmentType || null;

    return {
      id: job.id,
      position_name: job.title,      // Maps to position_name
      company: job.company,
      location: job.location || null,
      salary: job.salary || null,
      rating: null,                  // Defaulting fields not provided by your current fetchers
      reviews_count: null,           
      job_type: jobType,             // Maps to job_type
      external_apply_link: job.url,  // Maps to external_apply_link
      country: job.currency === "GBP" ? "gb" : "us", // Quick fallback inference or map as needed
      url: job.url,
      description: job.description || null,
      posted_at: job.postedAt ? new Date(job.postedAt).toISOString() : null,
      search_input_type: null,       // jsonb field
      companyLogo: job.companyLogoUrl || null, // Matches camelCase companyLogo column
    };
  });

  const { error } = await supabase
    .from('jobs')
    .upsert(dbRows, { 
      onConflict: 'id', // Resolves duplicate updates cleanly against your primary key
      ignoreDuplicates: false 
    });

  if (error) {
    console.error("Error upserting jobs into Supabase:", error.message);
    throw error;
  }
}


function normalizeCountry(country?: string): string {
  return country?.trim().toLowerCase() || DEFAULT_COUNTRY;
}

function normalizeText(value?: string): string {
  return value?.trim() || "";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
