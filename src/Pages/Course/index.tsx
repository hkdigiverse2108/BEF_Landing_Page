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
      <Seo title="UPSC & Competitive Exam Courses Online | Achiwon" description="Explore UPSC & competitive exam courses at Achiwon. Get structured learning, expert guidance, AI-driven tools & smart study plans for exam success." />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.bharatexamfest.com/#organization",
              name: "Achiwon",
              url: "https://www.bharatexamfest.com/",
              logo: "https://www.bharatexamfest.com/logo.png",
              description: "Achiwon is an AI-powered UPSC & competitive exam preparation platform offering structured courses, mock tests, workshops and smart study tools.",
              sameAs: ["https://www.facebook.com/bharatexamfest", "https://www.instagram.com/bharatexamfest", "https://www.youtube.com/@bharatexamfest"],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.bharatexamfest.com/#website",
              url: "https://www.bharatexamfest.com/",
              name: "Achiwon",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.bharatexamfest.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "WebPage",
              "@id": "https://www.bharatexamfest.com/course#webpage",
              url: "https://www.bharatexamfest.com/course",
              name: "UPSC & Competitive Exam Courses – Achiwon",
              description: "Explore a comprehensive list of UPSC & competitive exam preparation courses on Achiwon with structured learning, AI tools, mock practice and expert guidance.",
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
                    description: "Structured UPSC preparation covering prelims, mains & practice tests designed for aspirants.",
                    provider: {
                      "@type": "Organization",
                      name: "Achiwon",
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
                  name: "What types of courses are available on Achiwon?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Achiwon offers UPSC and competitive exam preparation courses, including strategy, mock tests, AI tools and topic-wise learning modules.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I enroll in a course on Achiwon?",
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
                    text: "Some courses on Achiwon may be free, while advanced or expert-led courses may require payment or subscription.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <div className="pb-5 container container-p ">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 hidden">Courses</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {courses?.map((item: CourseType, index: number) => (
            <CourseCard key={index} course={item} />
          ))}
        </div>
        {/* ================= UPSC SEO CONTENT ================= */}
        <section className="mt-14 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Best UPSC Courses by Achiwon</h2>

          <p>The process of preparing for the UPSC examination is not only hard work, but it also requires proper guidance, organized learning, and smart planning. Achiwon provides highly structured UPSC courses that enable aspirants to build a strong conceptual understanding, exam-focused training, and sustained assessment to succeed in one of India’s most competitive examinations.</p>

          <p>Our UPSC courses are designed by professional mentors, subject experts, and former aspirants who understand the evolving UPSC syllabus, answer writing patterns, and evaluation criteria. Whether you are a first-time aspirant or a repeat candidate, Achiwon ensures a clear and effective path toward success.</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">Why Choose Achiwon for UPSC Preparation?</h3>

          <p>Achiwon is a reputed academic platform offering a balanced blend of academic excellence and practical exam-oriented learning. Our courses help aspirants develop strong fundamentals and analytical abilities required for the Civil Services Examination.</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">Major Features of Our UPSC Courses</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Complete UPSC syllabus coverage</li>
            <li>Learning aligned with the latest UPSC exam pattern</li>
            <li>Interactive mentorship sessions and workshops</li>
            <li>Regular UPSC mock tests with detailed analysis</li>
            <li>Conceptual clarity across all GS subjects</li>
            <li>Flexible learning opportunities for students</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">UPSC Exam Syllabus Covered</h3>

          <h4 className="text-lg font-semibold text-gray-800 mt-4">Preliminary Examination</h4>
          <p>General Studies Paper I and CSAT Paper II with strong topic-wise conceptual clarity.</p>

          <h4 className="text-lg font-semibold text-gray-800 mt-6">Main Examination</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>General Studies I, II, III and IV</li>
            <li>Essay writing techniques</li>
            <li>Optional subject guidance</li>
            <li>Presentation of current affairs</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6">Personality Test (Interview)</h4>
          <p>Mock interviews, communication skill enhancement, and personality development sessions.</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">UPSC Subject-wise Learning</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>History (Ancient, Medieval, Modern and World)</li>
            <li>Geography (Physical, Indian and World)</li>
            <li>Indian Polity and Constitution</li>
            <li>Indian Economy</li>
            <li>Environment and Ecology</li>
            <li>Science and Technology</li>
            <li>Ethics, Integrity and Aptitude (GS Paper IV)</li>
            <li>Government Policies and Current Affairs</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">Concept Clarification and Strategy Workshops</h3>
          <p>Achiwon conducts special UPSC strategy workshops focusing on answer writing, revision techniques, time management, and examination psychology.</p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4">Benefits of UPSC Workshops</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Direct interaction with experienced UPSC mentors</li>
            <li>Previous years’ UPSC question paper analysis</li>
            <li>Essay writing and ethics case study sessions</li>
            <li>Optional subject orientation classes</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">UPSC Exam Pattern Overview</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Prelims:</strong> Objective-based screening test
            </li>
            <li>
              <strong>Mains:</strong> Descriptive and analytical answer writing
            </li>
            <li>
              <strong>Interview:</strong> Personality testing
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">UPSC Mock Tests and Performance Analysis</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full-length Prelims and Mains mock tests</li>
            <li>Topic-wise sectional tests</li>
            <li>AI-powered performance analysis</li>
            <li>In-depth explanations of answers</li>
            <li>One-on-one mentor feedback</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">Who Can Join Our UPSC Courses?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>First-time UPSC aspirants</li>
            <li>College students</li>
            <li>Working professionals</li>
            <li>Repeat candidates</li>
          </ul>

          <h3 className="text-xl font-semibold text-primary mt-10">Prepare Your UPSC with Achiwon</h3>
          <p>Cracking the UPSC exam requires discipline, clarity, and expert guidance. Achiwon provides complete UPSC courses, specialized workshops, thorough syllabus coverage, and exam-oriented mock tests to help aspirants achieve their civil services goals.</p>

          <p className="font-medium">Register today and take your first step toward UPSC success with Achiwon.</p>
        </section>
      </div>
    </>
  );
};

export default Course;
