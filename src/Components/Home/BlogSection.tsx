import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { Button } from "antd";
import { FormatBlogTime } from "../../Utils/FormatBlogTime";
import type { BlogType } from "../../Types";
import {  useState } from "react";

const BlogSection = ({ blogs }: { blogs: BlogType[] }) => {
  const [viewAll, setViewAll] = useState(false);

  const FilteredBlog = viewAll ? blogs : blogs.slice(0, 3);

  return (
    <section id="blog" className="container container-p">
      {/* Section Header */}
      <SectionHeader title="Latest Blog" desc="Unlock the Power of Knowledge with Our Blog" className="pb-6 " />

      {/* Blog Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:px-24 ">
        {FilteredBlog?.map((val: BlogType) => (
          <div key={val._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" data-aos="fade-up">
            {/* Blog Image */}
            <div className="relative">
              <img src={val.image} alt={val.title} className="w-full object-cover" />
              <span className="bg-white/10 backdrop-blur-md absolute top-3 left-3 text-white text-xs  px-3 py-1 rounded-full shadow ">{FormatBlogTime(val.createdAt)}</span>
            </div>

            {/* Blog Content */}
            <div className="p-4 sm:p-6 space-y-6 flex flex-col justify-between bg ">
              <h3 className="text-lg sm:text-xl font-semibold text-primary  ">{val.title}</h3>
              <p className=" text-sm sm:text-base ">{val.subTitle}</p>
              {/* <p className=" text-sm sm:text-base ">{val.description}</p> */}
              <Link to={""} className="inline-block text-primary font-semibold hover:underline text-sm sm:text-base">
                READ MORE
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button
          onClick={() => setViewAll(!viewAll)}
          htmlType="submit"
          type="primary"
          //  className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary/90 transition-colors"
          className="btn primary_btn !h-12 !rounded-full"
        >
          {viewAll ? "View Less" : "View All"}
        </Button>
      </div>
    </section>
  );
};

export default BlogSection;
