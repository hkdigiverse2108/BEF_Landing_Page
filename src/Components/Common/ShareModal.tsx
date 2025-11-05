import React, { useState } from "react";
import { Modal, Button } from "antd";
import { WhatsAppOutlined, LinkedinOutlined, TwitterOutlined, CopyOutlined, SendOutlined } from "@ant-design/icons";
import { PiShareFat } from "react-icons/pi";

const ShareModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const handleOpen = () => {
    const currentUrl = window.location.href;
    setPageUrl(currentUrl);

    navigator.clipboard.writeText(currentUrl);

    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const openShareLink = (platform: string) => {
    const encodedUrl = encodeURIComponent(pageUrl);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Button icon={<PiShareFat />} onClick={handleOpen} className="flex items-center gap-2">
        <span className="max-sm:hidden">Share</span>
      </Button>

      <Modal open={isOpen} onCancel={handleClose} footer={null} centered title="Share">
        <div className="flex flex-col gap-4 items-center justify-center text-center ">
          <div className="flex justify-center gap-6 text-3xl mt-2">
            <WhatsAppOutlined onClick={() => openShareLink("whatsapp")} className="!text-green-500 cursor-pointer hover:scale-110 transition-transform" />
            <SendOutlined onClick={() => openShareLink("telegram")} className="!text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
            <LinkedinOutlined onClick={() => openShareLink("linkedin")} className="!text-blue-700 cursor-pointer hover:scale-110 transition-transform" />
            <TwitterOutlined onClick={() => openShareLink("twitter")} className="!  !text-sky-500 cursor-pointer hover:scale-110 transition-transform" />
          </div>


          <div className="flex justify-between items-center border border-gray-300 rounded-md p-2 w-full  bg-gray-50 break-all">
            {pageUrl}{" "}
            <Button
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(pageUrl);
              }}
            ></Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
