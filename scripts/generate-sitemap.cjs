/**
 * Automated Sitemap Generator for Achiwon (BEF_Landing_Page)
 * Generates public/sitemap.xml with live domain https://achiwon.com
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://achiwon.com";
const API_BASE_URL = "http://localhost:4455";

// Static routes from PageRoutes.tsx & index.tsx
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/free-upsc-mock-test", priority: "0.9", changefreq: "daily" },
  { path: "/upsc-mock-test-instruction", priority: "0.7", changefreq: "weekly" },
  { path: "/upsc-pyq-practice", priority: "0.8", changefreq: "daily" },
  { path: "/upsc-mock-test-analysis", priority: "0.8", changefreq: "daily" },
  { path: "/pyq", priority: "0.9", changefreq: "weekly" },
  { path: "/upsc-prelims-pyq", priority: "0.9", changefreq: "weekly" },
  { path: "/course", priority: "0.9", changefreq: "weekly" },
  { path: "/workshop", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  // Help & Support / Legal
  { path: "/help-support/aboutUs", priority: "0.5", changefreq: "monthly" },
  { path: "/help-support/termsCondition", priority: "0.4", changefreq: "monthly" },
  { path: "/help-support/privacyPolicy", priority: "0.4", changefreq: "monthly" },
  { path: "/help-support/refundPolicy", priority: "0.4", changefreq: "monthly" },
  { path: "/help-support/legality", priority: "0.4", changefreq: "monthly" },
  { path: "/student/account-delete", priority: "0.3", changefreq: "monthly" },
];

// Blog categories
const blogCategories = [
  "upsc-preparation",
  "career-guidance",
  "upsc-prelims",
  "current-affairs",
  "csat",
  "governance-polity",
  "economy",
  "upsc-mains",
  "science-technology",
  "history-culture",
];

const slugify = (text) => {
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

async function generateSitemap(customApiUrl) {
  const apiEndpoint = (customApiUrl || process.env.VITE_API_BASE_URL || API_BASE_URL).replace(/\/$/, "");
  const currentDate = new Date().toISOString().split("T")[0];
  const urlEntries = [];

  // 1. Static Routes
  for (const route of staticRoutes) {
    urlEntries.push({
      loc: `${BASE_URL}${route.path}`,
      lastmod: currentDate,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // 2. Blog Category Routes
  for (const cat of blogCategories) {
    urlEntries.push({
      loc: `${BASE_URL}/blog/${cat}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  // 3. Dynamic Courses
  try {
    const res = await fetch(`${apiEndpoint}/course/all`);
    const data = await res.json();
    const courses = data?.data?.course_data || [];
    for (const c of courses) {
      if (c._id) {
        urlEntries.push({
          loc: `${BASE_URL}/course/details/${c._id}`,
          lastmod: c.updatedAt ? c.updatedAt.split("T")[0] : currentDate,
          changefreq: "weekly",
          priority: "0.8",
        });
      }
    }
    console.log(`Fetched ${courses.length} courses.`);
  } catch (err) {
    console.warn("Could not fetch courses from API:", err.message);
  }

  // 4. Dynamic Workshops
  try {
    const res = await fetch(`${apiEndpoint}/workshop/all`);
    const data = await res.json();
    const workshops = data?.data?.workshop_data || [];
    for (const w of workshops) {
      if (w._id) {
        urlEntries.push({
          loc: `${BASE_URL}/workshop/details/${w._id}`,
          lastmod: w.updatedAt ? w.updatedAt.split("T")[0] : currentDate,
          changefreq: "weekly",
          priority: "0.8",
        });
      }
    }
    console.log(`Fetched ${workshops.length} workshops.`);
  } catch (err) {
    console.warn("Could not fetch workshops from API:", err.message);
  }

  // 5. Dynamic Blogs
  try {
    const res = await fetch(`${apiEndpoint}/blog/all`);
    const data = await res.json();
    const blogs = data?.data?.blog_data || [];
    for (const b of blogs) {
      const catSlug = slugify(b.category || "upsc-preparation");
      const identifier = b.slug || b._id;
      if (identifier) {
        urlEntries.push({
          loc: `${BASE_URL}/blog/${catSlug}/${identifier}`,
          lastmod: b.updatedAt ? b.updatedAt.split("T")[0] : currentDate,
          changefreq: "monthly",
          priority: "0.7",
        });
      }
    }
    console.log(`Fetched ${blogs.length} blogs.`);
  } catch (err) {
    console.warn("Could not fetch blogs from API:", err.message);
  }

  // 6. Dynamic PYQs (Years and Subject-wise Slugs)
  try {
    const res = await fetch(`${apiEndpoint}/pyq/meta`);
    const data = await res.json();
    const pyqMeta = data?.data || [];

    // Hub routes
    urlEntries.push({
      loc: `${BASE_URL}/pyq`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.9",
    });
    urlEntries.push({
      loc: `${BASE_URL}/pyq/explore-topics`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    });
    urlEntries.push({
      loc: `${BASE_URL}/upsc-prelims/previous-year-question-paper`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.9",
    });

    for (const item of pyqMeta) {
      const year = item.year;
      // Year level URLs
      urlEntries.push({
        loc: `${BASE_URL}/pyq/${year}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });
      urlEntries.push({
        loc: `${BASE_URL}/pyq/${year}/gs-paper`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });
      urlEntries.push({
        loc: `${BASE_URL}/upsc-prelims/previous-year-question-paper/${year}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });
      urlEntries.push({
        loc: `${BASE_URL}/upsc-prelims/previous-year-question-paper/${year}/gs-paper`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });

      // Subject level URLs
      if (Array.isArray(item.subjects)) {
        for (const sub of item.subjects) {
          const subSlug = sub.slug || slugify(sub.name);
          if (subSlug) {
            urlEntries.push({
              loc: `${BASE_URL}/pyq/${year}/gs-paper/${subSlug}`,
              lastmod: currentDate,
              changefreq: "weekly",
              priority: "0.8",
            });
            urlEntries.push({
              loc: `${BASE_URL}/upsc-prelims/previous-year-question-paper/${year}/gs-paper/${subSlug}`,
              lastmod: currentDate,
              changefreq: "weekly",
              priority: "0.8",
            });
          }
        }
      }
    }
    console.log(`Fetched and generated sitemap for ${pyqMeta.length} PYQ years.`);
  } catch (err) {
    console.warn("Could not fetch PYQ metadata for sitemap:", err.message);
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml.trim(), "utf-8");
  console.log(`Successfully generated ${sitemapPath} with ${urlEntries.length} URLs.`);

  // Also write robots.txt with reference to sitemap
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /payment/
Disallow: /course/register
Disallow: /course/payment
Disallow: /workshop/register
Disallow: /workshop/payment

Sitemap: ${BASE_URL}/sitemap.xml
`;
  const robotsPath = path.join(publicDir, "robots.txt");
  fs.writeFileSync(robotsPath, robotsTxt.trim(), "utf-8");
  console.log(`Successfully generated ${robotsPath}`);

  return xml.trim();
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
