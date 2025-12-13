export * from "./Header";
export * from "./Footer";
export * from "./Links";

import districtsByState from "./district.json";

export const REACH_FROM_OPTIONS = [
  { label: "Youtube", value: "youtube" },
  { label: "Google", value: "google" },
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Website", value: "website" },
  { label: "App", value: "app" },
  { label: "Friend", value: "friend" },
  { label: "Other", value: "other" },
];

export const FINAL_DISTRICTS: string[] = Array.from(
  new Set(
    districtsByState.states
      .flatMap((s) => s.districts)
      .filter((d): d is string => typeof d === "string" && d.trim().length > 0)
      .map((d) => d.trim())
      .sort((a, b) => a.localeCompare(b))
  )
);

