import BlogCard from "../../Components/Blog/BlogCard";
import SectionHeader from "../../Components/Home/SectionHeader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import Loader from "../../Components/Common/Loader";
import type { BlogType } from "../../Types";

const Blog = () => {
  const { data: blogData, isLoading: blogLoading } = useGetApiQuery({ url: URL_KEYS.BLOG.ALL });
  const blogs = blogData?.data?.blog_data || [];

  if (blogLoading) return <Loader />;

  return (
    <section id="blog" className="container container-p">
      <SectionHeader title="Latest Blog" desc="Unlock the Power of Knowledge with Our Blog" className="pb-6 " />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:px-24 ">
        {blogs?.map((val: BlogType) => (
          <BlogCard key={val?._id} blog={val} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
