import { Button } from "antd";
import BlogCard from "../../Components/Blog/BlogCard";
import SectionHeader from "../../Components/Home/SectionHeader";
import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import Loader from "../../Components/Common/Loader";
import type { BlogType } from "../../Types";

const Blog = () => {
  const [viewAll, setViewAll] = useState(false);

  const { data: blogData, isLoading: blogLoading } = useGetApiQuery({ url: URL_KEYS.BLOG.ALL });
  const blogs = blogData?.data?.blog_data || [];

  const FilteredBlog = viewAll ? blogs : blogs.slice(0, 3);

  if (blogLoading) return <Loader />;

  return (
    <section id="blog" className="container container-p">
      <SectionHeader title="Latest Blog" desc="Unlock the Power of Knowledge with Our Blog" className="pb-6 " />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:px-24 ">
        {FilteredBlog?.map((val: BlogType) => (
          <BlogCard key={val?._id} blog={val} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button onClick={() => setViewAll(!viewAll)} htmlType="submit" type="primary" className="btn primary_btn !h-12 !rounded-full">
          {viewAll ? "View Less" : "View All"}
        </Button>
      </div>
    </section>
  );
};

export default Blog;
