import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import Loader from "../../Components/Common/Loader";

type HelpSlug =
  | "aboutUs"
  | "illegality"
  | "termsCondition"
  | "privacyPolicy"
  | "refundPolicy";

const HelpSupport = () => {
  const { slug = "" } = useParams<{ slug?: HelpSlug }>();

  const apiMap: Record<HelpSlug, string> = {
    aboutUs: URL_KEYS.HELP_SUPPORT.ABOUT_US,
    illegality: URL_KEYS.HELP_SUPPORT.ILLEGALITY,
    termsCondition: URL_KEYS.HELP_SUPPORT.TERM_CONDITION,
    privacyPolicy: URL_KEYS.HELP_SUPPORT.PRIVACY_POLICY,
    refundPolicy: URL_KEYS.HELP_SUPPORT.REFUND_POLICY,
  };

  const apiUrl = slug ? apiMap[slug] : undefined;

  const { data, isLoading } = useGetApiQuery({ url: apiUrl });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const pageData = data?.data?.[slug];

  if (isLoading) return <Loader />;

  return (
    <section className="container mx-auto px-5 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6 capitalize">
        {slug?.replace("-", " ") === "termsCondition"
          ? "Terms & Condition"
          : slug?.replace("-", " ")}
      </h1>
      <div
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: pageData }}
      />
    </section>
  );
};

export default HelpSupport;
