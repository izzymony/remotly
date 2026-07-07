import { NextResponse } from "next/server";
import { apifyToken } from "@/lib/tokens";

export async function GET() {
  const token = apifyToken;
  const url = `https://api.apify.com/v2/datasets/ZPQ2Lv1aQWWJ2Oz0L/items?token=${token}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch companies: ${res.status}`);
    }

    const data = await res.json();
    const companies = Array.isArray(data) ? data : Array.isArray(data?.companies) ? data.companies : [];

    return NextResponse.json({ companies });
  } catch {
    return NextResponse.json({ companies: [] }, { status: 500 });
  }
}