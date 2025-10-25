import { ImagePath, URL_KEYS } from "../../Constants";
import SectionHeader from "./SectionHeader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { Link } from "react-router-dom";
import type { StepType } from "../../Types";


// const steps: Step[] = [
//   {
//     title: "Download & Sign Up with Referral Code",
//     description: "Start your journey by downloading the Bharat Exam Fest app, available for both Android and Apple devices. Use a referral code during sign-up to access exclusive benefits and start your journey!",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
//   {
//     title: "Step Two: Complete Your Profile",
//     description: "Fill in your details and academic background to receive personalized scholarship recommendations.",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
//   {
//     title: "Step Three: Apply Easily",
//     description: "Browse, select, and apply to scholarships directly from your dashboard with one click.",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
//   {
//     title: "Download & Sign Up with Referral Code",
//     description: "Start your journey by downloading the Bharat Exam Fest app, available for both Android and Apple devices. Use a referral code during sign-up to access exclusive benefits and start your journey!",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
//   {
//     title: "Step Two: Complete Your Profile",
//     description: "Fill in your details and academic background to receive personalized scholarship recommendations.",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
//   {
//     title: "Step Three: Apply Easily",
//     description: "Browse, select, and apply to scholarships directly from your dashboard with one click.",
//     youtube_link: "https://www.youtube.com/watch?v=abcdef",
//     thumbnail_image: `${ImagePath}/steps/YT_thumbnail.jpg`,
//   },
// ];

const StepsSection = () => {
  const { data } = useGetApiQuery({ url: URL_KEYS.HOW_IT_WORK.ALL });

  const steps = data?.data?.how_it_work_data;

  console.log("featureData : ", data?.data?.how_it_work_data);

  return (
    <section id="steps" className="pb-20 sm:pb-30 md:pb-40 lg:pb-55  container-p ">
      <div className="how_it_works container bg-white rounded-2xl sm:p-4 py-9  " id="how_it_work">
        <div className="space-y-5 h-fit ">
          <SectionHeader
            title="How it works - 5 easy steps"
            desc="Simple steps to smarter preparation—because your success is our
              mission!"
            className="py-8 "
          />

          <div className="how_it_inner ">
            <div className="step_block max-lg:px-3 max-lg:overflow-hidden ">
              <ul>
                {steps?.map((step: StepType, i: number) => (
                  <li className={`${i % 2 === 1 ? `even-step` : `odd-step`}  px-5 `} key={i}>
                    <div className="step_text !px-0" data-aos="fade-right">
                      <h4 className=" max-md:text-start max-sm:text-sm">{step.title}</h4>
                      <p className="max-md:text-start max-sm:text-sm">{step.description}</p>
                    </div>

                    <div className={`${i % 2 === 1 ? ` md:me-7 ` : `md:ms-7`} step_number `}>
                      <h3 className="mb-5">{String(i + 1).padStart(2, "0")}</h3>
                    </div>

                    <div className="step_img" data-aos="fade-left">
                      <Link to={step.link} target="_blank" rel="noopener noreferrer" className="popup-youtube play-button" data-toggle="modal" data-target="#myModal" title="Download & Sign Up with Referral Code">
                        <img src={`${step.thumbnailImage}`} alt="image" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className=" h-fit px-6 sm:px-18">
          <img src={`${ImagePath}steps/yt_thumb.jpg`} className="w-fit h-fit -mb-20 md:-mb-35 lg:-mb-50" alt="Yt-thumbnail" data-aos="fade-up" />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
