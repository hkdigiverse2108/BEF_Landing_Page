import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { LectureType } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import LectureCard from "../Common/LectureCard";
import { Empty } from "antd";

const WorkshopLecturesTab = ({ id }: { id?: string }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${id}`,
  });

  const Lectures = data?.data?.lecture_data;
  if (Lectures?.length === 0) return <Empty />;

  return (
    <div className="space-y-4" data-aos="fade-up">
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
      <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </div>
  );
};

export default WorkshopLecturesTab;
