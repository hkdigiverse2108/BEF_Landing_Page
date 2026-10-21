export const LANDING_PAGE_URL = (
  import.meta.env.VITE_LANDING_PAGE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3335")
).replace(/\/$/, "");

export const slugify = (text?: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const getBlogUrl = (blog?: { category?: string; slug?: string; _id?: string }): string => {
  const catSlug = slugify(blog?.category || "upsc-preparation");
  const identifier = blog?.slug || blog?._id || "";
  return `/blog/${catSlug}/${identifier}`;
};
