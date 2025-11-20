// import { Button, Modal } from "antd";
// import { useState, type FC } from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter,
// } from "react-icons/fa";
// import {
//   IoCheckmarkDoneSharp,
//   IoCopyOutline,
//   IoLinkOutline,
// } from "react-icons/io5";
// import { PiShareFat } from "react-icons/pi";
// import { RiWhatsappFill } from "react-icons/ri";

// const ShareModal: FC<{ referralCode?: string }> = ({ referralCode }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pageUrl, setPageUrl] = useState("");
//   const [copyText, setCopyText] = useState("");
//   const [isCopied, setIsCopied] = useState(false);

//   const handleOpen = () => {
//     const currentUrl = window.location.href;
//     setPageUrl(currentUrl);
//     setCopyText(referralCode ? referralCode : currentUrl);
//     setIsOpen(true);
//   };

//   const handleClose = () => setIsOpen(false);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(copyText);
//     setIsCopied(true);

//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   const openShareLink = (platform: string) => {
//     const encodedURl = encodeURIComponent(pageUrl);
//     const ShareURL = referralCode
//       ? `Join me on DigiSkill and start learning amazing skills!
// Use my referral code: ${referralCode} to get special benefits! \n Signup here: ${encodedURl}`
//       : encodedURl;
//     let shareUrl = "";

//     switch (platform) {
//       case "whatsapp":
//         shareUrl = `https://api.whatsapp.com/send?text=${ShareURL}`;
//         break;
//       case "telegram":
//         shareUrl = `https://t.me/share/url?url=${ShareURL}`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${ShareURL}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${ShareURL}`;
//         break;
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${ShareURL}`;
//         break;
//       case "instagram":
//         shareUrl = `https://www.instagram.com/?url=${ShareURL}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <>
//       <Button
//         icon={<PiShareFat />}
//         onClick={handleOpen}
//         className="flex items-center max-sm:!p-2"
//       >
//         <span className="max-sm:hidden font-semibold">Share</span>
//       </Button>

//       <Modal
//         open={isOpen}
//         onCancel={handleClose}
//         footer={null}
//         centered
//         className="!p-0 share-modal"
//       >
//         <div className=" p-3 space-y-3">
//           {/* Title */}
//           <h2 className="text-2xl font-semibold text-primary">
//             {referralCode ? "Invite Friends" : "Social Share"}
//           </h2>

//           {/* Share Icons */}
//           <p className=" text-gray-700 font-medium">
//             {" "}
//             {referralCode ? "Invite Friends" : " Share this link"} via
//           </p>

//           <div className="flex gap-4 ">
//             <button
//               onClick={() => openShareLink("facebook")}
//               className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
//             >
//               <FaFacebookF className="text-blue-600 text-2xl" />
//             </button>

//             <button
//               onClick={() => openShareLink("twitter")}
//               className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
//             >
//               <FaTwitter className="text-sky-500 text-2xl" />
//             </button>

//             <button
//               onClick={() => openShareLink("instagram")}
//               className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
//             >
//               <FaInstagram className="text-pink-600 text-2xl" />
//             </button>

//             <button
//               onClick={() => openShareLink("whatsapp")}
//               className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
//             >
//               <RiWhatsappFill className="text-green-500 text-2xl" />
//             </button>

//             <button
//               onClick={() => openShareLink("linkedin")}
//               className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
//             >
//               <FaLinkedin className="text-blue-700 text-2xl" />
//             </button>
//           </div>

//           {/* Copy Link */}
//           <p className=" text-gray-700 font-medium">
//             {" "}
//             {referralCode ? "Copy Reffer Code" : " Copy Link"}
//           </p>

//           <div
//             className={`flex items-center justify-between border rounded-lg px-3 py-3  cursor-pointer
//               ${
//                 isCopied
//                   ? "border-green-500 text-green-600"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//             onClick={handleCopyLink}
//           >
//             <div className="flex items-center gap-2 overflow-hidden">
//               <IoLinkOutline className="text-xl text-blue-500" />
//               <span className="truncate">{copyText}</span>
//             </div>

//             {isCopied ? (
//               <IoCheckmarkDoneSharp className="text-green-600 text-xl" />
//             ) : (
//               <IoCopyOutline className="text-xl" />
//             )}
//           </div>

//           {/* Copy Button */}
//           <button className="btn primary_btn  !h-12 w-full    ">
//             {referralCode ? "Copy Reffer Code" : " Copy URL"}
//           </button>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default ShareModal;

import React, { useState } from "react";
import { Modal, Button, Tooltip } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { PiShareFat } from "react-icons/pi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import {
  IoCheckmarkDoneSharp,
  IoCopyOutline,
  IoLinkOutline,
} from "react-icons/io5";

const ShareModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <>
      <Button
        icon={<PiShareFat />}
        onClick={handleOpen}
        className="flex items-center max-sm:!p-2  "
      >
        <span className="max-sm:hidden font-semibold">Share</span>
      </Button>

      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        centered
       
      >
        <div className=" p-3 space-y-3">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-primary">Social Share</h2>

          {/* Share Icons */}
          <p className=" text-gray-700 font-medium"> Share this link via</p>

          <div className="flex gap-4 ">
            <button
              onClick={() => openShareLink("facebook")}
              className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
            >
              <FaFacebookF className="text-blue-600 text-2xl" />
            </button>

            <button
              onClick={() => openShareLink("twitter")}
              className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
            >
              <FaTwitter className="text-sky-500 text-2xl" />
            </button>

            <button
              onClick={() => openShareLink("instagram")}
              className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
            >
              <FaInstagram className="text-pink-600 text-2xl" />
            </button>

            <button
              onClick={() => openShareLink("whatsapp")}
              className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
            >
              <RiWhatsappFill className="text-green-500 text-2xl" />
            </button>

            <button
              onClick={() => openShareLink("linkedin")}
              className="size-12 flex items-center justify-center rounded-xl bg-gray-50 shadow hover:scale-110 transition"
            >
              <FaLinkedin className="text-blue-700 text-2xl" />
            </button>
          </div>

          {/* Copy Link */}
          <p className=" text-gray-700 font-medium">Copy Link</p>

          <div
            className={`flex items-center justify-between border rounded-lg px-3 py-3  cursor-pointer 
              ${
                isCopied
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 bg-gray-50"
              }`}
            onClick={handleCopyLink}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <IoLinkOutline className="text-xl text-blue-500" />
              <span className="truncate">{pageUrl}</span>
            </div>

            {isCopied ? (
              <IoCheckmarkDoneSharp className="text-green-600 text-xl" />
            ) : (
              <IoCopyOutline className="text-xl" />
            )}
          </div>

          {/* Copy Button */}
          <button className="btn primary_btn  !h-12 w-full    ">
            Copy URL
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
