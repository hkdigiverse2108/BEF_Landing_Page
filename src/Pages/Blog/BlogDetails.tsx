import { useState, useEffect, useMemo } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import Loader from "../../Components/Common/Loader";
import Seo from "../../Components/Common/Seo";
import BlogReadingProgressBar from "../../Components/Blog/BlogReadingProgressBar";
import BlogTableOfContents, { type HeadingItem } from "../../Components/Blog/BlogTableOfContents";
import BlogInteractiveQuiz from "../../Components/Blog/BlogInteractiveQuiz";
import { BlogBlueAdBanner, BlogOrangeAdBanner } from "../../Components/Blog/BlogAdBanners";
import BlogRelatedSection from "../../Components/Blog/BlogRelatedSection";
import { LuChevronRight, LuClock, LuCalendar } from "react-icons/lu";
import { slugify } from "../../Utils/blogUrl";

export const BlogDetails = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  const { id, categorySlug, slug } = useParams<{ id?: string; categorySlug?: string; slug?: string }>();
  const navigate = useNavigate();

  const blogIdentifier = id || slug;

  const { data: blogData, isLoading: blogLoading } = useGetApiQuery(
    { url: `${URL_KEYS.BLOG.ONE}${blogIdentifier}` },
    { skip: !blogIdentifier }
  );
  const blog = blogData?.data || {};

  useEffect(() => {
    if (!blogIdentifier) {
      navigate(ROUTES.BLOG.BLOG);
    }
  }, [blogIdentifier, navigate]);

  function formatDate(iso?: string) {
    if (!iso) return "Updated recently";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Parse H2 and H3 headings from dynamic description HTML
  const { parsedHtml, headings } = useMemo(() => {
    if (!blog?.description) {
      return { parsedHtml: "", headings: [] as HeadingItem[] };
    }

    const headingList: HeadingItem[] = [];
    let counter = 0;

    // Use regex to parse and inject unique IDs to headings
    const updatedHtml = blog.description.replace(
      /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
      (match: string, tag: string, attrs: string, content: string) => {
        counter++;
        const cleanText = content.replace(/<[^>]+>/g, "").trim();
        // Extract existing id if any
        const idMatch = attrs.match(/id=["']([^"']+)["']/i);
        const headingId = idMatch ? idMatch[1] : `section-${counter}-${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;

        const level = tag.toLowerCase() === "h2" ? 2 : 3;
        headingList.push({
          id: headingId,
          text: cleanText,
          level,
        });

        if (idMatch) {
          return match;
        }
        return `<${tag}${attrs} id="${headingId}">${content}</${tag}>`;
      }
    );

    return { parsedHtml: updatedHtml, headings: headingList };
  }, [blog?.description]);

  // Set default active heading
  useEffect(() => {
    if (headings.length > 0 && !activeHeadingId) {
      setActiveHeadingId(headings[0].id);
    }
  }, [headings, activeHeadingId]);

  // Active section tracking on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveHeadingId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Google SEO Schema (BlogPosting JSON-LD)
  useEffect(() => {
    if (!blog?._id) return;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.subTitle || blog.title,
      "image": [blog.image || "https://bharatexamfest.com/logo.png"],
      "datePublished": blog.createdAt || new Date().toISOString(),
      "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": blog.author?.name || "Achiwon Editorial Team",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bharat Exam Fest (BEF)",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bharatexamfest.com/logo.png",
        },
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href,
      },
    };

    let scriptTag = document.getElementById("blog-posting-schema") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "blog-posting-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById("blog-posting-schema");
      if (el) el.remove();
    };
  }, [blog]);

  // Make any embedded HTML quizzes interactive
  useEffect(() => {
    const quizContainer = document.querySelector("#achiwon-quiz, .mcq-box");
    if (!quizContainer) return;

    const submitBtn = quizContainer.querySelector("button");
    if (!submitBtn) return;

    const handleQuizSubmit = (e: Event) => {
      e.preventDefault();
      const questions = quizContainer.querySelectorAll("[data-answer]");
      let score = 0;
      questions.forEach((q) => {
        const selected = q.querySelector<HTMLInputElement>("input:checked");
        const correctAns = (q.getAttribute("data-answer") || "").trim().toLowerCase();
        if (selected && selected.value.trim().toLowerCase() === correctAns) {
          score++;
        }
      });

      let resultDiv = quizContainer.querySelector<HTMLElement>(".mcq-result");
      if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.className = "mcq-result";
        quizContainer.appendChild(resultDiv);
      }
      resultDiv.textContent = `Your Score: ${score} / ${questions.length} — ${
        score === questions.length
          ? "Excellent! Perfect score!"
          : score >= Math.ceil(questions.length * 0.6)
          ? "Good job! Keep practising."
          : "Keep practising and try again."
      }`;
      resultDiv.hidden = false;
      resultDiv.style.display = "block";
    };

    submitBtn.addEventListener("click", handleQuizSubmit);
    return () => submitBtn.removeEventListener("click", handleQuizSubmit);
  }, [parsedHtml]);

  if (blogLoading) return <Loader />;
  if (!blog?._id) return null;

  const authorName = blog.author?.name || "Achiwon Editorial Team";
  const authorRole = blog.author?.role || "UPSC Faculty & Mentor";
  const authorAvatar =
    blog.author?.avatar || "https://randomuser.me/api/portraits/women/44.jpg";

  const hasEmbeddedAdBanner = parsedHtml.includes("ad-banner");
  const hasEmbeddedQuiz = parsedHtml.includes("achiwon-quiz") || parsedHtml.includes("mcq-box");

  return (
    <>
      <Seo
        title={blog.metaTitle || `${blog.title} | Bharat Exam Fest`}
        description={blog.metaDescription || blog.subTitle || blog.title}
        noIndex={true}
      />

      <div className="min-h-screen w-full bg-white flex flex-col font-sans text-[#0F172A]">
        {/* Top Reading Progress Bar */}
        <BlogReadingProgressBar />

        <main className="container container-p py-4 sm:py-10 max-w-full overflow-x-hidden">
        {/* Dynamic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-[#64748B]">
          <NavLink to={ROUTES.HOME} className="hover:text-[#124699] transition-colors">
            Home
          </NavLink>
          <LuChevronRight className="text-gray-400" />
          <NavLink to={ROUTES.BLOG.BLOG} className="hover:text-[#124699] transition-colors">
            Blogs
          </NavLink>
          <LuChevronRight className="text-gray-400" />
          <NavLink
            to={`/blog/${slugify(blog.category || categorySlug || "upsc-preparation")}`}
            className="font-semibold text-[#124699] hover:underline transition-colors"
          >
            {blog.category || "UPSC Preparation"}
          </NavLink>
          <LuChevronRight className="text-gray-400" />
          <span className="max-w-[130px] sm:max-w-md truncate text-[#0F172A] font-medium" title={blog.title}>
            {blog.title}
          </span>
        </nav>

        {/* 2-Column Responsive Layout: Left TOC + Right Article Content */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 items-start">
          {/* Left Sticky Sidebar with Dynamic Table of Contents */}
          <BlogTableOfContents
            headings={headings}
            activeId={activeHeadingId}
            blogTitle={blog.title}
          />

          {/* Right Main Article */}
          <article className="min-w-0 max-w-full overflow-hidden bg-white rounded-2xl border border-gray-200/80 p-3.5 sm:p-8 lg:p-10 shadow-xs">
            {/* Category Badges / Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex rounded-full bg-[#EDF4FF] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#124699]">
                {blog.category || "UPSC Preparation"}
              </span>
              {blog.tags && blog.tags.slice(0, 3).map((tag: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200/60"
                >
                  {tag.replace(/^#/, "")}
                </span>
              ))}
            </div>

            {/* Main Title */}
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight tracking-tight break-words">
              {blog.title}
            </h1>

            {/* Subtitle / Hook */}
            {blog.subTitle && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#475569] leading-relaxed break-words">
                {blog.subTitle}
              </p>
            )}

            {/* Tags / Topics Row */}
            {blog.tags && blog.tags.length > 3 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {blog.tags.slice(3).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-[#475569]"
                  >
                    #{tag.replace(/^#/, "")}
                  </span>
                ))}
              </div>
            )}

            {/* Author & Meta Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-gray-100 py-4 text-xs sm:text-sm text-[#64748B]">
              <div className="flex items-center gap-3">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-2xs"
                />
                <div>
                  <p className="font-bold text-[#0F172A] leading-none">{authorName}</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{authorRole}</p>
                </div>
              </div>

              <span className="hidden sm:inline-block h-4 w-px bg-gray-200" />

              <div className="flex items-center gap-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <LuCalendar className="text-sm text-[#124699]" />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <LuClock className="text-sm text-[#F48224]" />
                  {blog.readTime || "8 min read"}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {blog.image && (
              <figure className="my-8 overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
                <img
                  src={blog.image}
                  alt={blog.title}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full max-h-[460px] object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </figure>
            )}

            {/* Primary Blue CTA Banner (if not already embedded in body) */}
            {!hasEmbeddedAdBanner && (
              <BlogBlueAdBanner
                title="Prepare Smarter for UPSC 2026"
                subtitle="Test your preparation with our curated 10-question practice test and unlock scholarship discounts on Sure Shot Prelims."
                buttonText="Take Free Practice Test"
                link={ROUTES.FREE_PRACTICE}
              />
            )}

            {/* Dynamic Blog Body Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />

            {/* Interactive MCQ Quiz Box (if blog has quiz data and not embedded in HTML) */}
            {!hasEmbeddedQuiz && blog.quiz && blog.quiz.length > 0 && (
              <BlogInteractiveQuiz
                quizItems={blog.quiz}
                title={`Quick Concept Quiz: ${blog.title.slice(0, 40)}...`}
              />
            )}

            {/* Orange Practice CTA Banner (if not already embedded in body) */}
            {!hasEmbeddedAdBanner && (
              <BlogOrangeAdBanner
                title="Test Your Exam Speed & Accuracy"
                subtitle="Get detailed analytics, question-wise elimination tips, and learn where you stand among top UPSC aspirants."
                buttonText="Explore Practice Module"
                link={ROUTES.FREE_PRACTICE}
              />
            )}

            {/* Related Blogs Section */}
            <BlogRelatedSection
              currentBlogId={blog._id}
              category={blog.category}
            />
          </article>
        </div>
      </main>
      </div>
    </>
  );
};

export default BlogDetails;
