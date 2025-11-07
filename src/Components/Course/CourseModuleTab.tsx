import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { ModuleType } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";

const CourseModuleTab = ({ id }: { id?: string }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const { data: ModulesData } = useGetApiQuery({
    url: `${URL_KEYS.MODULE.ALL}?courseFilter=${id}`,
  });
  // console.log(ModulesData?.data?.module_data);
  const Modules = ModulesData?.data?.module_data || [];

  return (
    <div className="space-y-4" data-aos="fade-up">
      {Modules?.map((module: ModuleType) => (
        <div
          key={module._id}
          className="flex max-sm:flex-col gap-4 bg-white rounded-lg p-4  border border-gray-200 max-sm:items-center "
        >
          <figure
            onClick={() => {
              if (module?.link) {
                setPlayVideo(true);
                setVideoLink(module?.link);
              }
            }}
          >
            <img
              src={module.image}
              alt={"img"}
              className="w-fit h-50 sm:w-50 sm:h-full rounded-lg object-cover"
            />
          </figure>

          {/* Content */}
          <div className="flex flex-col sm:py-3 gap-5 justify-between ">
            {/* Tags */}
            <div className="flex flex-col gap-2 ">
              <span className="text-xl font-semibold">{module.name}</span>
              <h2 className="text-sm text-gray-700">{module.subTitle}</h2>
            </div>
            <div className="flex  gap-6">
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">
                  {module.totalLecture}
                </span>
                <span>lectures </span>
              </p>
              <span className="border border-gray-200"></span>
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">
                  {module.totalTest}
                </span>
                <span>Tests </span>
              </p>
            </div>
          </div>
        </div>
      ))}
      <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </div>
  );
};

export default CourseModuleTab;
