import { Link } from "react-router-dom";
import type { BlogType } from "../../Types";
import { FormatBlogTime } from "../../Utils/FormatBlogTime";

const BlogCard = ({ blog }: { blog: BlogType }) => {
    
  return (
    <div key={blog._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" data-aos="fade-up">
      {/* Blog Image */}
      <div className="relative">
        <img src={blog.image} alt={blog.title} className="w-full object-cover" />
        <span className="bg-white/10 backdrop-blur-md absolute top-3 left-3 text-white text-xs  px-3 py-1 rounded-full shadow ">{FormatBlogTime(blog.createdAt)}</span>
      </div>

      {/* Blog Content */}
      <div className="p-4 sm:p-6 space-y-6 flex flex-col justify-between bg ">
        <h3 className="text-lg sm:text-xl font-semibold text-primary  ">{blog.title}</h3>
        <p className=" text-sm sm:text-base ">{blog.subTitle}</p>
        {/* <p className=" text-sm sm:text-base ">{blog.description}</p> */}
        <Link to={""} className="inline-block text-primary font-semibold hover:underline text-sm sm:text-base">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
