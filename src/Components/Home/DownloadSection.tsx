import { ImagePath } from "../../Constants";
import AnimationLine from "../Common/AnimationLine";

const DownloadSection = () => {
  return (
    <section id="download" className="pt-20 relative">
      <div className="container container-p">
        <div
          data-aos="fade-in"
          className=" bg-success-dark rounded-4xl px-4 sm:px-12 md:px-24 pb-12 relative "
        >
          {/* Vertical Line Animation */}
          <AnimationLine />

          {/* Row */}
          <div className="flex flex-col md:flex-row items-center justify-center ">
            {/* Left Content */}
            <div
              data-aos="fade-right"
              className="order-2 max-md:pt-14 md:order-1 w-full "
            >
              <div className="free_text">
                <div className=" text-white text-left mb-6">
                  <h2 className=" text-2xl sm:text-4xl font-extrabold mb-5">
                    Prepare, Compete, and Win Big!
                  </h2>
                  <p className="text-xs sm:text-xl">
                    Download the Bharat Exam Fest app for free on the App Store
                    and Play Store. Participate in mega contests and stand a
                    chance to win the biggest cash prizes—because your
                    preparation deserves more than just success!
                  </p>
                </div>
                <ul className="flex flex-col sm:flex-row gap-5 items-center  mt-4">
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-sm:px-12 px-6 py-3 bg-white border border-primary rounded-xl  hover:shadow-sm shadow-black"
                    >
                      <img
                        src={`${ImagePath}common/appstore_orange.png`}
                        alt="App Store"
                      />
                    </a>
                  </li>
                  <li >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-sm:px-12 px-6 py-3  bg-white border border-primary rounded-xl  hover:shadow-sm shadow-black"
                    >
                      <img
                        src={`${ImagePath}common/appstore_orange.png`}
                        alt="Play Store"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Images */}
            <div
              data-aos="fade-up"
              className="order-1  md:order-2 w-full mt-[-30px] md:mt-0 flex  items-center free_img relative"
            >
              <img
                src={`${ImagePath}download/download-screen01.png`}
                alt="Screen 1"
                className="relative max-sm:w-1/2 -mt-[65px] scale-90 "
              />
              <img
                src={`${ImagePath}download/download-screen01.png`}
                alt="Screen 2"
                className="absolute top-0 max-sm:w-1/2 right-7 sm:left-1/2 -ml-18 -mt-16 scale-110 "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
