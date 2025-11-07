import { useState, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { LectureType, ModuleType } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

const CourseLecturesTab = ({ Modules }: { Modules: ModuleType[] }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [selectedModule, setSelectedModule] = useState(Modules[0]?._id);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm")); // true for sm and larger

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?moduleFilter=${selectedModule}`,
  });

  const Lectures = data?.data?.lecture_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
  };

  const LectureCard = ({ lecture }: { lecture: LectureType }) => {
    return (
      <div
        key={lecture?._id}
        className="flex max-sm:flex-col gap-4 bg-white rounded-lg  border border-gray-200 p-2 h-fit items-stretch"
      >
        {/* Image */}
        <figure
          onClick={() => {
            setPlayVideo(true);
            setVideoLink(lecture?.link);
          }}
        >
          <img
            src={lecture?.image}
            alt={lecture?.title}
            className="w-full h-full sm:w-fit sm:h-23 rounded-lg object-cover"
          />
        </figure>

        {/* Content */}
        <div className="flex flex-col  gap-2 justify-between ">
          {/* Tags */}
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-gray-200 px-1.5 py-0.5 rounded">
              {lecture?.language}{" "}
            </span>
            <span className="text-primary font-semibold">
              {lecture?.subjectName}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-semibold text-sm sm:text-base">
            {lecture?.title}
          </h2>

          {/* Instructor */}
          <p className="text-gray-600 text-xs font-medium sm:text-sm">
            {lecture?.subtitle}
          </p>

          {/* Date */}
          <p className="text-gray-600 text-xs font-medium">{lecture?.date}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex max-sm:flex-col gap-4" data-aos="fade-up">
        <div className="sm:!w-1/2 md:!w-1/3">
          <Tabs
            value={selectedModule}
            onChange={handleTabChange}
            textColor="primary"
            variant="scrollable"
            // variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            // orientation="vertical"
            orientation={isMdUp ? "vertical" : "horizontal"}
            aria-label="primary tabs example"
            className="LecturesTabs max-sm:!w-full sm:!w-full !flex !justify-between !gap-4 border-b sm:border sm:rounded-lg border-gray-300 "
            sx={{
              "& .MuiTabs-flexContainer ": {
                justifyContent: "space-between",
              },
            }}
          >
            {Modules?.map((module: ModuleType, index) => {
              return (
                <Tab key={index} value={module?._id} label={module?.name} />
              );
            })}
          </Tabs>
        </div>
        <div className="w-full">
          {Lectures?.map((lecture: LectureType) => (
            <LectureCard key={lecture?._id} lecture={lecture} />
          ))}
        </div>
      </div>
      <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </>
  );
};

export default CourseLecturesTab;
