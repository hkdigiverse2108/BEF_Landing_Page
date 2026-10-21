import { Link } from "react-router-dom";
import type { BlogType } from "../../Types";
import { FormatBlogTime } from "../../Utils/FormatBlogTime";
import { LuClock, LuCalendar } from "react-icons/lu";
import { getBlogUrl } from "../../Utils/blogUrl";

const BlogCard = ({ blog }: { blog: BlogType }) => {
  const blogUrl = getBlogUrl(blog);

  return (
    <div
      key={blog?._id}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden h-full hover:-translate-y-1"
      data-aos="fade-up"
    >
      {/* Blog Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Link to={blogUrl} className="block w-full h-full">
          {blog?.image ? (
            <img
              src={blog.image}
              alt={blog?.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#124699]/10 to-[#F48224]/10 text-xs font-bold text-[#124699]">
              Bharat Exam Fest
            </div>
          )}
        </Link>
        <span className="absolute top-3 left-3 bg-[#124699]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
          {blog?.category || "UPSC Preparation"}
        </span>
      </div>

      {/* Blog Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2.5">
            <span className="flex items-center gap-1">
              <LuCalendar className="text-[#124699]" />
              {FormatBlogTime(blog?.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <LuClock className="text-[#F48224]" />
              {blog?.readTime || "8 min read"}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            <Link to={blogUrl}>
              {blog?.title}
            </Link>
          </h3>

          {blog?.subTitle && (
            <p className="mt-2 text-sm text-[#64748B] line-clamp-2 leading-relaxed">
              {blog?.subTitle}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <Link
            to={blogUrl}
            className="inline-flex items-center font-bold text-primary hover:text-accent text-sm tracking-wide transition-colors"
          >
            READ MORE →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
