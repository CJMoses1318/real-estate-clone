import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity env: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (e.g. in Vercel Project Settings > Environment Variables).",
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

// Read-only client for public queries
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});
