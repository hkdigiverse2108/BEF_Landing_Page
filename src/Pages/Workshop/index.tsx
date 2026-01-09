import { Empty, Skeleton } from "antd";
import type { WorkshopType } from "../../Types";
import Loader from "../../Components/Common/Loader";
import WorkshopCard from "../../Components/Workshop/WorkshopCard";
import { useAppSelector } from "../../Store/Hook";
import { useEffect } from "react";
import { ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";
import Seo from "../../Components/Common/Seo";
import StructuredData from "../../Components/Common/StructuredData";

const Workshop = () => {
  const navigate = useNavigate();

  const workshop: WorkshopType[] = useAppSelector(
    (state) => state.workshops.AllWorkshop
  );
  const workshopLoading = useAppSelector(
    (state) => state.workshops.workshopLoading
  );
  const id = workshop[0]?._id ?? "";
  if (!workshopLoading && workshop.length === 1) {
    navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
      replace: true,
    });
  }

  useEffect(() => {
    if (!workshopLoading && workshop.length === 1) {
      navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
        replace: true,
      });
    }
  }, [workshopLoading, workshop]);

  if (workshopLoading) return <Loader />;
  if (!workshopLoading && workshop.length === 0)
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <Empty />
      </div>
    );

  return (
    <>
      <Seo
        title="UPSC & Competitive Exam Workshops | Bharat Exam Fest"
        description="Join expert-led UPSC & competitive exam workshops at Bharat Exam Fest. Learn smart strategies, exam techniques & AI-powered preparation methods to boost your performance."
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
                "Bharat Exam Fest is an AI-powered UPSC and competitive exam preparation platform offering free mock tests, expert workshops, interactive courses and personalized study tools.",
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
              "@id": "https://www.bharatexamfest.com/workshop#webpage",
              url: "https://www.bharatexamfest.com/workshop",
              name: "UPSC & Competitive Exam Workshops – Bharat Exam Fest",
              description:
                "Explore expert-led UPSC and competitive exam workshops on Bharat Exam Fest. Attend interactive sessions on exam strategies, smart preparation tips and AI-enhanced learning.",
              inLanguage: "en",
              isPartOf: {
                "@id": "https://www.bharatexamfest.com/#website",
              },
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
                    name: "Workshop",
                    item: "https://www.bharatexamfest.com/workshop",
                  },
                ],
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.bharatexamfest.com/workshop#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What are the Bharat Exam Fest workshops?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Bharat Exam Fest workshops are expert-led interactive sessions designed for UPSC and competitive exam aspirants to learn strategic preparation techniques, smart study methods and exam insights.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who can attend the workshops on Bharat Exam Fest?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "UPSC and competitive exam aspirants seeking expert guidance, strategy sessions, mock test analysis, and AI-powered tips can attend the Bharat Exam Fest workshops.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do Bharat Exam Fest workshops require registration?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, users may need to register or log in on Bharat Exam Fest to attend workshops, depending on the session format and availability.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are the workshops free or paid?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Workshops on Bharat Exam Fest include both free and premium sessions depending on topic and expert availability.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <div className="container container-p">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 hidden">
          Workshop
        </h1>
        {workshop?.length !== 0 && (
          <>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {workshopLoading
                ? [...Array(3)].map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 15 }}
                    />
                  ))
                : workshop?.map((item: WorkshopType, index: number) => (
                    <WorkshopCard key={index} data={item} />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Workshop;
