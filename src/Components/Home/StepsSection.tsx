import { ImagePath } from "../../Constants";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import type { StepType } from "../../Types";
import { useState } from "react";
import { IoPlayCircle } from "react-icons/io5";
import { Modal } from "antd";

const StepsSection = ({ steps }: { steps: StepType[] }) => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section id="steps" className="pb-20 sm:pb-30 md:pb-40 lg:pb-55  container-p  ">
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
          <div className="relative -mb-20 md:-mb-35 lg:-mb-50">
            <img src={`${ImagePath}steps/yt_thumb.jpg`} className="w-fit h-fit " alt="Yt-thumbnail" data-aos="fade-up" />
            <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center  ">
              <button onClick={() => setPlayVideo(true)} className="!text-7xl text-primary">
                <IoPlayCircle />
              </button>
            </div>
          </div>
        </div>

        <Modal footer={false} title="" open={playVideo} onCancel={() => setPlayVideo(false)} closable={false} maskClosable={true} keyboard={false} centered destroyOnHidden={true}>
          {playVideo && <iframe width="100%" height="400" src="https://www.youtube.com/embed/0Trxb5WfBKc?autoplay=1&rel=0&modestbranding=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        </Modal>
      </div>
    </section>
  );
};

export default StepsSection;
