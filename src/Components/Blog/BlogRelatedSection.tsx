import React from "react";
import { NavLink } from "react-router-dom";
import { LuArrowRight, LuClock, LuCalendar } from "react-icons/lu";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { BlogType } from "../../Types";
import { getBlogUrl } from "../../Utils/blogUrl";

interface BlogRelatedSectionProps {
  currentBlogId: string;
  category?: string;
}

export const BlogRelatedSection: React.FC<BlogRelatedSectionProps> = ({
  currentBlogId,
  category,
}) => {
  const { data: blogData, isLoading } = useGetApiQuery({
    url: URL_KEYS.BLOG.ALL,
  });

  const allBlogs: BlogType[] = blogData?.data?.blog_data || [];

  // Filter out current blog and take top 3
  const relatedBlogs = allBlogs
    .filter((b) => b._id !== currentBlogId)
    .slice(0, 3);

  if (isLoading || relatedBlogs.length === 0) return null;

  function formatDate(iso?: string) {
    if (!iso) return "Recently Updated";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#124699]">
            Continue Learning
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Related Articles &amp; Analysis
          </h2>
        </div>

        <NavLink
          to={ROUTES.BLOG.BLOG}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#124699] hover:text-[#F48224] transition-colors"
        >
          <span>View all articles</span>
          <LuArrowRight className="text-base" />
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBlogs.map((b) => (
          <article
            key={b._id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#124699]/40 hover:shadow-lg"
          >
            <NavLink
              to={getBlogUrl(b)}
              className="block aspect-video w-full overflow-hidden bg-gray-100"
            >
              {b.image ? (
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#124699]/10 to-[#F48224]/10 text-xs font-bold text-[#124699]">
                  UPSC Study Article
                </div>
              )}
            </NavLink>

            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#124699]">
                {b.category || category || "UPSC Preparation"}
              </span>

              <h3 className="mt-2 text-base font-bold text-[#0F172A] line-clamp-2 transition-colors group-hover:text-[#124699]">
                <NavLink to={getBlogUrl(b)}>
                  {b.title}
                </NavLink>
              </h3>

              {b.subTitle && (
                <p className="mt-2 text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {b.subTitle}
                </p>
              )}

              <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-[#94A3B8] border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <LuCalendar className="text-xs" />
                  {formatDate(b.createdAt)}
                </span>
                <span className="flex items-center gap-1 font-medium text-[#124699]">
                  <LuClock className="text-xs" />
                  {b.readTime || "6 min read"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogRelatedSection;
