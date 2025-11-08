import SectionHeader from "./SectionHeader";
import type { BlogType } from "../../Types";
import BlogCard from "../Blog/BlogCard";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { Button } from "antd";

const BlogSection = ({ blogs }: { blogs: BlogType[] }) => {
  const FilteredBlog = blogs.slice(0, 3);

  return (
    <section id="blog" className="container container-p">
      {/* Section Header */}
      <SectionHeader title="Latest Blog" desc="Unlock the Power of Knowledge with Our Blog" className="pb-6 " />

      {/* Blog Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:px-24 ">
        {FilteredBlog?.map((val: BlogType) => (
          <BlogCard key={val?._id} blog={val} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <NavLink to={ROUTES.BLOG.BLOG}>
          <Button className="btn primary_btn !h-12 !rounded-full"> View All</Button>
        </NavLink>
      </div>
    </section>
  );
};

export default BlogSection;
