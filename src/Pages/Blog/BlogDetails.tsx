import { Link, useParams } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import Loader from "../../Components/Common/Loader";
import { useState } from "react";

const BlogDetails = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { id } = useParams();
  console.log(id);
  const { data: blogData, isLoading: blogLoading } = useGetApiQuery({
    url: `${URL_KEYS.BLOG.ONE}${id}`,
  });
  const blog = blogData?.data || [];
  console.log(blog);

  function formatDate(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (blogLoading) return <Loader />;

  return (
    <main className="container container-p">
      <article className="  bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full  transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Content */}
        <div className="p-6 sm:p-10">
          {/* Date */}
          {blog.createdAt && (
            <p className="text-sm text-gray-500 mb-2">
              {formatDate(blog.createdAt)}
            </p>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
            {blog.title}
          </h1>

          {/* Subtitle */}
          {blog.subTitle && (
            <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
              {blog.subTitle}
            </p>
          )}

          {/* Description */}
          {blog.description && (
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          )}
        </div>
      </article>
    </main>
  );
};

export default BlogDetails;
