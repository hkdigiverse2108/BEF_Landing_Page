import { useState, type SyntheticEvent } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { LectureType, ModuleType } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import LectureCard from "../Common/LectureCard";

const CourseLecturesTab = ({ Modules }: { Modules: ModuleType[] }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [selectedModule, setSelectedModule] = useState(Modules[0]?._id);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm")); // true for sm and larger

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?moduleFilter=${selectedModule}&typeFilter=course`,
  });

  const Lectures = data?.data?.lecture_data || [];

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedModule(newValue);
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
            scrollButtons="auto"
            allowScrollButtonsMobile
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
        <div className="w-full flex flex-col gap-1">
          {Lectures?.map((lecture: LectureType) => (
            <LectureCard
              key={lecture?._id}
              lecture={lecture}
              setPlayVideo={setPlayVideo}
              setVideoLink={setVideoLink}
            />
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
