import { useState, useMemo, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import Loader from "../../Components/Common/Loader";
import Seo from "../../Components/Common/Seo";
import type { BlogType } from "../../Types";
import { FormatBlogTime } from "../../Utils/FormatBlogTime";
import { getBlogUrl, slugify } from "../../Utils/blogUrl";
import {
  LuChevronRight,
  LuArrowRight,
  LuClock,
  LuCalendar,
} from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const Blog = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 100% Dynamic Backend Data - Zero Static Mock Data
  const { data: blogData, isLoading: blogLoading } = useGetApiQuery({
    url: URL_KEYS.BLOG.ALL,
  });

  const blogs: BlogType[] = useMemo(() => {
    return blogData?.data?.blog_data || [];
  }, [blogData]);

  // Show comprehensive UPSC categories plus any custom categories from database
  const categories = useMemo(() => {
    const defaultCategories = [
      "All",
      "UPSC Preparation",
      "Current Affairs",
      "Career Guidance",
      "UPSC Prelims",
      "UPSC Mains",
      "CSAT",
      "Resources",
      "Governance & Polity",
      "Economy",
      "Science & Tech",
      "History & Culture",
    ];
    const set = new Set<string>(defaultCategories);
    blogs.forEach((b) => {
      if (b.category && b.category.trim()) {
        set.add(b.category.trim());
      }
    });
    return Array.from(set);
  }, [blogs]);

  // Sync route param /blog/:categorySlug with selectedCategory filter
  useEffect(() => {
    if (categorySlug) {
      const cleanSlug = categorySlug.toLowerCase().trim();
      const matched = categories.find(
        (c) => slugify(c).toLowerCase() === cleanSlug
      );
      if (matched) {
        setSelectedCategory(matched);
      } else {
        const fallback = categorySlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setSelectedCategory(fallback);
      }
    } else {
      setSelectedCategory("All");
    }
    setCurrentPage(1);
  }, [categorySlug, categories]);

  // Featured blogs dynamically filtered by isFeatured toggle from backend
  // Only displayed on the main "All" blogs page; completely skipped when filtering by category
  const featuredBlogs = useMemo(() => {
    if (selectedCategory !== "All") return [];
    return blogs.filter((b) => b.isFeatured === true);
  }, [blogs, selectedCategory]);

  // Filtered and sorted blogs for library grid
  const filteredAndSortedBlogs = useMemo(() => {
    let list = [...blogs];

    // Filter by selected category
    if (selectedCategory !== "All") {
      const targetSlug = slugify(selectedCategory);
      list = list.filter((b) => {
        if (!b.category) return false;
        return (
          slugify(b.category) === targetSlug ||
          b.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );
      });
    }

    // Sort by createdAt
    list.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [blogs, selectedCategory, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBlogs.slice(start, start + itemsPerPage);
  }, [filteredAndSortedBlogs, currentPage, itemsPerPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      navigate(ROUTES.BLOG.BLOG);
    } else {
      navigate(`/blog/${slugify(category)}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const blogsEl = document.getElementById("blogs");
    if (blogsEl) {
      blogsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (blogLoading) return <Loader />;

  return (
    <>
      <Seo
        title={
          selectedCategory === "All"
            ? "UPSC Preparation & Study Library | Achiwon"
            : `${selectedCategory} Blogs & Guidance | Achiwon`
        }
        description={
          selectedCategory === "All"
            ? "Focused resources and field-tested strategies for aspirants preparing across Prelims, Mains and Personality Test."
            : `Explore comprehensive ${selectedCategory} articles, strategy guides, and study materials for UPSC CSE.`
        }
        noIndex={true}
      />

      <div className="min-h-screen w-full bg-white flex flex-col font-sans text-[#0F172A]">
        <main id="top" className="flex-1">
          {/* Hero & Featured Section (Only shown on main "All" blogs view) */}
          {selectedCategory === "All" && (
            <section className="border-b border-gray-200">
              <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 lg:px-8 lg:pb-20 lg:pt-8">
                {/* Breadcrumb */}
                <nav
                  aria-label="Breadcrumb"
                  className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-[#64748B]"
                >
                  <NavLink
                    to={ROUTES.HOME}
                    className="hover:text-[#124699] transition-colors"
                  >
                    Home
                  </NavLink>
                  <LuChevronRight className="text-sm text-gray-400" />
                  <NavLink
                    to={ROUTES.BLOG.BLOG}
                    className="hover:text-[#124699] transition-colors"
                  >
                    Blogs
                  </NavLink>
                </nav>

                {/* Hero Title & Subtitle Grid */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#124699] border border-[#124699]/15">
                      <span className="h-2 w-2 rounded-full bg-[#F48224] animate-pulse" />
                      Achiwon study library
                    </div>
                    <h1 className="max-w-3xl font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                      UPSC Preparation
                    </h1>
                    <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#64748B]">
                      Focused resources and field-tested strategies for aspirants
                      preparing across Prelims, Mains and the Personality Test.
                    </p>
                  </div>

                  <div className="hidden lg:col-span-5 lg:block">
                    <div className="border-l-4 border-[#F48224] pl-5 py-1">
                      <p className="font-heading text-lg font-bold text-[#0F172A]">
                        Make It Your Final Attempt
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        Build your study plan with authoritative guides, PYQ analysis
                        and practical exam intelligence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Featured Blog Container */}
                {featuredBlogs.length > 0 && (
                  <div className="mt-10 sm:mt-12">
                    {featuredBlogs.length === 1 ? (
                      // SINGLE FEATURED BLOG: Render as static card without any scroll/carousel
                      <div className="rounded-2xl bg-gradient-to-r from-[#124699] via-[#124699] to-[#F48224] p-[2px] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <FeaturedCard blog={featuredBlogs[0]} />
                      </div>
                    ) : (
                      // MULTIPLE FEATURED BLOGS: Wrap in Swiper carousel with Autoplay
                      <div className="relative">
                        <Swiper
                          modules={[Autoplay, Pagination]}
                          autoplay={{ delay: 4500, disableOnInteraction: false }}
                          loop={true}
                          pagination={{ clickable: true }}
                          className="rounded-2xl pb-8"
                        >
                          {featuredBlogs.map((item) => (
                            <SwiperSlide key={item._id}>
                              <div className="rounded-2xl bg-gradient-to-r from-[#124699] via-[#124699] to-[#F48224] p-[2px] shadow-md transition duration-300 hover:shadow-xl">
                                <FeaturedCard blog={item} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Library Section: Categories, Sorting & Blog Grid */}
          <section id="blogs" className="bg-[#F8FAFC]">
            <div className={`mx-auto max-w-7xl px-4 lg:px-8 ${selectedCategory !== "All" ? "pt-6 pb-14 lg:pt-8 lg:pb-20" : "py-14 lg:py-20"}`}>
              {/* Category-view Breadcrumbs */}
              {selectedCategory !== "All" && (
                <nav
                  aria-label="Breadcrumb"
                  className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-[#64748B]"
                >
                  <NavLink
                    to={ROUTES.HOME}
                    className="hover:text-[#124699] transition-colors"
                  >
                    Home
                  </NavLink>
                  <LuChevronRight className="text-sm text-gray-400" />
                  <NavLink
                    to={ROUTES.BLOG.BLOG}
                    className="hover:text-[#124699] transition-colors"
                  >
                    Blogs
                  </NavLink>
                  <LuChevronRight className="text-sm text-gray-400" />
                  <span className="text-[#0F172A] font-semibold">
                    {selectedCategory}
                  </span>
                </nav>
              )}

              {/* Heading & Controls */}
              <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
                    Browse the library
                  </p>
                  <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                    {selectedCategory === "All"
                      ? "All blogs in the category"
                      : `Blogs in ${selectedCategory}`}
                  </h2>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {selectedCategory === "All"
                      ? "Expert explanations for every stage of your UPSC journey."
                      : `Expert explanations, strategy, and guides for ${selectedCategory}.`}
                  </p>
                </div>

                {/* Sort Toggle */}
                <div
                  className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs"
                  aria-label="Sort articles"
                >
                  <button
                    type="button"
                    onClick={() => setSortOrder("recent")}
                    className={`min-h-10 rounded-md px-4 text-sm font-bold transition-all cursor-pointer ${
                      sortOrder === "recent"
                        ? "bg-[#124699] text-white shadow-xs"
                        : "text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#0F172A]"
                    }`}
                  >
                    Recent
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortOrder("oldest")}
                    className={`min-h-10 rounded-md px-4 text-sm font-bold transition-all cursor-pointer ${
                      sortOrder === "oldest"
                        ? "bg-[#124699] text-white shadow-xs"
                        : "text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#0F172A]"
                    }`}
                  >
                    Oldest
                  </button>
                </div>
              </div>

              {/* Dynamic Category Filter Pills */}
              {categories.length > 1 && (
                <div className="mb-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
                  {categories.map((cat) => {
                    const isActive =
                      selectedCategory === cat ||
                      (selectedCategory !== "All" &&
                        slugify(selectedCategory) === slugify(cat));
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#124699] text-white shadow-xs"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-[#124699] hover:text-[#124699]"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3-Column Blog Cards Grid */}
              {paginatedBlogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedBlogs.map((blog) => (
                    <BlogLibraryCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs my-8">
                  <p className="text-lg font-bold text-[#0F172A]">
                    No articles found in this category.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Add blogs from Developer Panel to display them here dynamically.
                  </p>
                  {selectedCategory !== "All" && (
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("All")}
                      className="mt-4 inline-flex items-center gap-2 font-bold text-[#124699] hover:underline cursor-pointer"
                    >
                      View all blogs <LuArrowRight />
                    </button>
                  )}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav
                  id="pagination"
                  className="mt-14 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Blog pagination"
                >
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="min-h-11 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="hidden sm:inline">← Previous</span>
                    <span className="sm:hidden">←</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#124699] text-white shadow-xs"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="min-h-11 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="hidden sm:inline">Next →</span>
                    <span className="sm:hidden">→</span>
                  </button>
                </nav>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

// ==========================================
// FEATURED BLOG CARD COMPONENT
// ==========================================
const FeaturedCard = ({ blog }: { blog: BlogType }) => {
  const blogUrl = getBlogUrl(blog);
  const cleanTitle = (blog.title || "")
    .replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon")
    .replace(/\bBEF\b/g, "Achiwon");
  const cleanSubTitle = (blog.subTitle || "")
    .replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon")
    .replace(/\bBEF\b/g, "Achiwon");

  return (
    <Link
      to={blogUrl}
      className="group grid overflow-hidden rounded-[calc(1rem-2px)] bg-white lg:grid-cols-2"
    >
      {/* Left side Image */}
      <div className="relative min-h-[260px] sm:min-h-[320px] overflow-hidden bg-gray-100">
        {blog.image ? (
          <img
            src={blog.image}
            alt={cleanTitle}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#124699]/10 to-[#F48224]/10 text-sm font-bold text-[#124699]">
            Achiwon UPSC
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-lg bg-[#124699] px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
          Featured Blog
        </span>
      </div>

      {/* Right side Content */}
      <div className="flex flex-col justify-center bg-white p-6 sm:p-8 lg:p-11">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#F48224]" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
            {blog.category || "Featured Resource"}
          </p>
        </div>

        <h2 className="mt-4 max-w-lg font-heading text-2xl sm:text-3xl font-extrabold leading-tight text-[#0F172A] group-hover:text-[#124699] transition-colors line-clamp-2">
          {cleanTitle}
        </h2>

        <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-[#64748B]">
          <span className="flex items-center gap-1">
            <LuCalendar className="text-[#124699]" />
            {FormatBlogTime(blog.createdAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <LuClock className="text-[#F48224]" />
            {blog.readTime || "5 min read"}
          </span>
        </div>

        <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#64748B] line-clamp-3">
          {cleanSubTitle ||
            blog.description?.replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon").replace(/\bBEF\b/g, "Achiwon").replace(/<[^>]+>/g, "").slice(0, 160) + "..."}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 font-bold text-[#124699] group-hover:text-[#F48224] transition-colors">
          <span>Read the guide</span>
          <LuArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

// ==========================================
// LIBRARY GRID CARD COMPONENT
// ==========================================
const BlogLibraryCard = ({ blog }: { blog: BlogType }) => {
  const blogUrl = getBlogUrl(blog);
  const cleanTitle = (blog.title || "")
    .replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon")
    .replace(/\bBEF\b/g, "Achiwon");

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col h-full">
      <Link to={blogUrl} className="flex flex-col h-full">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          {blog.image ? (
            <img
              src={blog.image}
              alt={cleanTitle}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs font-bold text-gray-400">
              Achiwon
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#124699]">
              {blog.category || "Resources"}
            </p>
            <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-[#0F172A] transition group-hover:text-[#124699] line-clamp-2">
              {cleanTitle}
            </h3>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-[#64748B] pt-4 border-t border-gray-100">
            <span>{FormatBlogTime(blog.createdAt)}</span>
            <span>•</span>
            <span>{blog.readTime || "6 min read"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Blog;
