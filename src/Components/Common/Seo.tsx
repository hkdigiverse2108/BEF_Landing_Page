import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string | string[];
  keywords?: string;
  noIndex?: boolean;
  robots?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const getAutoOgImage = (pathname: string): string => {
  const p = pathname.toLowerCase();
  if (p.includes("/pyq") || p.includes("prelims-pyq")) {
    return "/assets/images/og/og_pyq.jpg";
  }
  if (p.includes("/course")) {
    return "/assets/images/og/og_course.jpg";
  }
  if (p.includes("/workshop")) {
    return "/assets/images/og/og_workshop.jpg";
  }
  if (p.includes("mock-test") || p.includes("free-upsc")) {
    return "/assets/images/og/og_mock.jpg";
  }
  return "/assets/images/og/og_home.jpg";
};

const setMeta = (selector: string, attrKey: string, attrVal: string, content?: string) => {
  if (!content) return;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrKey, attrVal);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const Seo = ({
  title,
  description,
  keywords,
  noIndex,
  robots,
  ogImage,
  ogType = "website",
  canonicalUrl,
}: SeoProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const descContent = description
      ? Array.isArray(description)
        ? description.join(", ")
        : description
      : undefined;

    if (descContent) {
      setMeta('meta[name="description"]', "name", "description", descContent);
    }

    if (keywords) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords);
    }

    const robotsContent = robots || (noIndex ? "noindex" : undefined);
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsContent) {
      if (!robotsTag) {
        robotsTag = document.createElement("meta");
        robotsTag.setAttribute("name", "robots");
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute("content", robotsContent);
    } else if (robotsTag) {
      robotsTag.remove();
    }

    // Determine absolute OG Image
    const pathname = window.location.pathname;
    const resolvedOgImage = ogImage || getAutoOgImage(pathname);
    const absoluteOgImage = resolvedOgImage.startsWith("http")
      ? resolvedOgImage
      : `${window.location.origin}${resolvedOgImage.startsWith("/") ? "" : "/"}${resolvedOgImage}`;

    const currentUrl = canonicalUrl || window.location.href;

    // OpenGraph Tags
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    if (descContent) {
      setMeta('meta[property="og:description"]', "property", "og:description", descContent);
    }
    setMeta('meta[property="og:image"]', "property", "og:image", absoluteOgImage);
    setMeta('meta[property="og:url"]', "property", "og:url", currentUrl);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Achiwon");

    // Twitter Card Tags
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    if (descContent) {
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", descContent);
    }
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteOgImage);
    setMeta('meta[name="twitter:site"]', "name", "twitter:site", "@achiwoncse");

    // Canonical link tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", currentUrl);

    return () => {
      if (robotsContent) {
        const currentRobots = document.querySelector('meta[name="robots"]');
        if (currentRobots) {
          currentRobots.remove();
        }
      }
    };
  }, [title, description, keywords, noIndex, robots, ogImage, ogType, canonicalUrl]);

  return null;
};

export default Seo;
