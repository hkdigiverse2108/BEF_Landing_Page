import { Link } from "react-router-dom";
import { ImagePath } from "../../Constants";
import SectionHeader from "./SectionHeader";

interface Blog {
  id: number | string;
  title: string;
  sub_title: string;
  image: string;
  created_at: string; // e.g., "2 days ago"
}

const blog = [
  {
    id: 1,
    title:
      "Bharat Exam Fest – The Ultimate Free AI Platform for UPSC Aspirants in 2025",
    sub_title:
      "Crack UPSC Prelims & Mains with AI-Driven Study Plans, Answer Writing, and Free Test Series",
    image: `${ImagePath}blog/blog1.jpg`,
    created_at: "2 days ago",
  },
  {
    id: 2,
    title:
      "Bharat Exam Fest – The Ultimate Free AI Platform for UPSC Aspirants in 2025",
    sub_title:
      "Crack UPSC Prelims & Mains with AI-Driven Study Plans, Answer Writing, and Free Test Series",
    image: `${ImagePath}blog/blog1.jpg`,
    created_at: "2 days ago",
  },
  {
    id: 3,
    title:
      "Bharat Exam Fest – The Ultimate Free AI Platform for UPSC Aspirants in 2025",
    sub_title:
      "Crack UPSC Prelims & Mains with AI-Driven Study Plans, Answer Writing, and Free Test Series",
    image: `${ImagePath}blog/blog1.jpg`,
    created_at: "2 days ago",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="container-p">
      {/* Section Header */}
      <SectionHeader
        title="Latest Blog"
        desc="Unlock the Power of Knowledge with Our Blog"
        className="pb-6 "
      />

      {/* Blog Cards Grid */}
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:px-24 ">
          {blog.map((val: Blog) => (
            <div
              key={val.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
            >
              {/* Blog Image */}
              <div className="relative">
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full object-cover"
                />
                <span className="absolute top-3 left-3 text-white text-xs  px-3 py-1 rounded-full shadow">
                  {val.created_at}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-4 sm:p-6 space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-primary  ">
                  {val.title}
                </h3>
                <p className=" text-sm sm:text-base ">{val.sub_title}</p>
                <Link
                  to={''}
                  className="inline-block text-primary font-semibold hover:underline text-sm sm:text-base"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary/90 transition-colors">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
