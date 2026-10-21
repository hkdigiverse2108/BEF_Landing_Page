import React, { useState } from "react";
import {
  LuListFilter,
  LuLink,
  LuCheck,
  LuShare2,
  LuChevronDown,
} from "react-icons/lu";
import { FaWhatsapp, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { message } from "antd";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  headings: HeadingItem[];
  activeId: string;
  blogTitle: string;
}

export const BlogTableOfContents: React.FC<BlogTableOfContentsProps> = ({
  headings,
  activeId,
  blogTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    message.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out this UPSC article: ${blogTitle}`);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90; // offset for sticky headers
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // Close mobile dropdown after selection
      setIsMobileOpen(false);
    }
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-5 shadow-xs">
        {/* TOC Header with Mobile Collapsible Toggle */}
        <div
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3 text-[#0F172A] cursor-pointer lg:cursor-default select-none"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF4FF] text-[#124699]">
              <LuListFilter className="text-base sm:text-lg" />
            </span>
            <h3 className="font-extrabold text-xs sm:text-base tracking-tight truncate">
              Table of Contents
            </h3>
            {headings.length > 0 && (
              <span className="shrink-0 rounded-full bg-[#EDF4FF] px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#124699]">
                {headings.length}
              </span>
            )}
          </div>
          <button
            type="button"
            className="shrink-0 lg:hidden text-[11px] font-bold text-[#124699] flex items-center gap-1 bg-[#EDF4FF] px-2 py-1 rounded-lg transition-colors hover:bg-blue-100"
          >
            <span>{isMobileOpen ? "Hide" : "Show"}</span>
            <LuChevronDown
              className={`text-xs transition-transform duration-200 ${
                isMobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* TOC List */}
        {headings.length > 0 ? (
          <nav
            className={`mt-4 max-h-[50vh] overflow-y-auto pr-1 space-y-1 scrollbar-thin text-xs sm:text-sm ${
              isMobileOpen ? "block" : "hidden lg:block"
            }`}
          >
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <button
                  key={heading.id}
                  type="button"
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full text-left py-1.5 px-3 rounded-lg transition-all cursor-pointer truncate ${
                    heading.level === 3 ? "ml-3 text-xs" : "font-medium"
                  } ${
                    isActive
                      ? "bg-[#EDF4FF] font-bold text-[#124699] border-l-2 border-[#F48224]"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A]"
                  }`}
                  title={heading.text}
                >
                  {heading.text}
                </button>
              );
            })}
          </nav>
        ) : (
          <p
            className={`mt-3 text-xs text-[#94A3B8] ${
              isMobileOpen ? "block" : "hidden lg:block"
            }`}
          >
            Quick navigation for key sections in this article.
          </p>
        )}

        {/* Share Section */}
        <div
          className={`mt-5 border-t border-gray-100 pt-4 ${
            isMobileOpen ? "block" : "hidden lg:block"
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
            <LuShare2 /> Share Article
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy Article Link"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-700 transition hover:bg-[#124699] hover:text-white cursor-pointer"
            >
              {copied ? <LuCheck className="text-emerald-600" /> : <LuLink className="text-sm" />}
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <FaWhatsapp className="text-base" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-800 transition hover:bg-black hover:text-white"
            >
              <FaXTwitter className="text-sm" />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] transition hover:bg-[#0A66C2] hover:text-white"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogTableOfContents;
