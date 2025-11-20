import { Modal } from "antd";

interface YTModalType {
  playVideo: boolean;
  setPlayVideo: any;
  videoLink: string;
}

const YoutubeVideoModal = ({
  playVideo,
  setPlayVideo,
  videoLink,
}: YTModalType) => {

  const getEmbedLink = (url: string): string => {
    if (!url) return "";

    let videoId = "";

    try {

      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtube.com/embed/")) {
        return url;
      }

      if (url.includes("drive.google.com")) {
        if (url.includes("/file/d/")) {
          videoId = url.split("/file/d/")[1]?.split("/")[0];
        } else if (url.includes("id=")) {
          videoId = url.split("id=")[1]?.split("&")[0];
        }

        return videoId
          ? `https://drive.google.com/file/d/${videoId}/preview`
          : url;
      }

      return url;
    } catch (err) {
      console.error("Invalid video URL:", err);
      return url;
    }
  };
  const embedUrl = getEmbedLink(videoLink);

  return (
    <div>
      <Modal
        footer={false}
        title=""
        open={playVideo}
        onCancel={() => setPlayVideo(false)}
        closable={false}
        maskClosable={true}
        keyboard={false}
        centered
        destroyOnHidden={true}
        className="YT-Modal"
      >
        {playVideo && (
          <iframe
            width="100%"
            height="400"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </Modal>
    </div>
  );
};

export default YoutubeVideoModal;
