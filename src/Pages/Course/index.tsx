import { URL_KEYS } from "../../Constants";
import CourseCard from "../../Components/Course/CourseCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";
import Loader from "../../Components/Common/Loader";
import Seo from "../../Components/Common/Seo";
import StructuredData from "../../Components/Common/StructuredData";

const Course = () => {
  const { data: courseData, isLoading: courseLoading } = useGetApiQuery({
    url: URL_KEYS.COURSE.ALL,
  });

  const courses = courseData?.data?.course_data;

  if (courseLoading) return <Loader />;

  return (
    <>
      <Seo
        title="UPSC & Competitive Exam Courses Online | Bharat Exam Fest"
        description="Explore UPSC & competitive exam courses at Bharat Exam Fest. Get structured learning, expert guidance, AI-driven tools & smart study plans for exam success."
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.bharatexamfest.com/#organization",
              name: "Bharat Exam Fest",
              url: "https://www.bharatexamfest.com/",
              logo: "https://www.bharatexamfest.com/logo.png",
              description:
                "Bharat Exam Fest is an AI-powered UPSC & competitive exam preparation platform offering structured courses, mock tests, workshops and smart study tools.",
              sameAs: [
                "https://www.facebook.com/bharatexamfest",
                "https://www.instagram.com/bharatexamfest",
                "https://www.youtube.com/@bharatexamfest",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.bharatexamfest.com/#website",
              url: "https://www.bharatexamfest.com/",
              name: "Bharat Exam Fest",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.bharatexamfest.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "WebPage",
              "@id": "https://www.bharatexamfest.com/course#webpage",
              url: "https://www.bharatexamfest.com/course",
              name: "UPSC & Competitive Exam Courses – Bharat Exam Fest",
              description:
                "Explore a comprehensive list of UPSC & competitive exam preparation courses on Bharat Exam Fest with structured learning, AI tools, mock practice and expert guidance.",
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.bharatexamfest.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Courses",
                    item: "https://www.bharatexamfest.com/course",
                  },
                ],
              },
            },
            {
              "@type": "ItemList",
              "@id": "https://www.bharatexamfest.com/course#courseList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Course",
                    url: "https://www.bharatexamfest.com/course/details/690cd08aafdfb3c84119416f",
                    name: "UPSC Exam Preparation Course",
                    description:
                      "Structured UPSC preparation covering prelims, mains & practice tests designed for aspirants.",
                    provider: {
                      "@type": "Organization",
                      name: "Bharat Exam Fest",
                      sameAs: "https://www.bharatexamfest.com/",
                    },
                  },
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.bharatexamfest.com/course#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What types of courses are available on Bharat Exam Fest?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Bharat Exam Fest offers UPSC and competitive exam preparation courses, including strategy, mock tests, AI tools and topic-wise learning modules.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I enroll in a course on Bharat Exam Fest?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can view course details and enroll by clicking on the specific course link, logging in, and following the registration instructions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are the courses free or paid?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Some courses on Bharat Exam Fest may be free, while advanced or expert-led courses may require payment or subscription.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <div className="pb-5 container container-p ">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 hidden">
          Courses
        </h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {courses?.map((item: CourseType, index: number) => (
            <CourseCard key={index} course={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
