import type { NextRequest } from "next/server";
import { fetchJobsFromProviders } from "@/lib/job";
import type { ProviderFilter } from "@/types/jobs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1;
  const limit =
    Number.parseInt(url.searchParams.get("limit") ?? "12", 10) || 12;
  const providerParam = url.searchParams.get("provider");
  const provider: ProviderFilter =
    providerParam === "adzuna" || providerParam === "indeed"
      ? providerParam
      : "all";

  const response = await fetchJobsFromProviders({
    q: url.searchParams.get("q") ?? undefined,
    location: url.searchParams.get("location") ?? undefined,
    country: url.searchParams.get("country") ?? undefined,
    page,
    limit,
    provider,
  });

  

  return Response.json(response, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
