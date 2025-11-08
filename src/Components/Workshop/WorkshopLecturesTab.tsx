import { useState } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { LectureType } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import LectureCard from "../Common/LectureCard";

const WorkshopLecturesTab = ({ id }: { id?: string }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${id}`,
  });

  const Lectures = data?.data?.lecture_data;

  return (
    <div className="space-y-4" data-aos="fade-up">
      {Lectures?.map((lecture: LectureType) => (
        <LectureCard
          key={lecture?._id}
          lecture={lecture}
          setPlayVideo={setPlayVideo}
          setVideoLink={setVideoLink}
        />
      ))}
      <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </div>
  );
};

export default WorkshopLecturesTab;
