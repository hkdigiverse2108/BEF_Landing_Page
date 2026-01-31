import { FaFacebook, FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import type { ContactType } from "../Types";

export const LOGIN_URL = "http://course.bharatexamfest.com/";
// export const HK_DIGIVERSE_URL = "https://hkdigiverse.com/";
export const HK_DIGIVERSE_URL = "http://localhost:3334/";

export const APP_LINKS = "https://play.google.com/store/apps/details?id=com.bharat.examfest.app&pcampaignid=web_share";

export const CONTACT: ContactType = {
  NUMBER: "+91 84604 64463",
  EMAIL_INFO: "info@bharatexamfest.com",
  EMAIL_HELP: "help@bharatexamfest.com",
  EMAIL_SALES: "sales@bharatexamfest.com",
  ADDRESS: "501-502, Silver Trade Center, Mota Varachhha, Surat, Gujarat, India-394101.",
};

export const SOCIAL_MEDIA = [
  {
    title: "instagram",
    link: "https://www.instagram.com/bharatexamfest",
    icon: FaInstagram,
  },
  { title: "x", link: "https://x.com/Bharatexamfest", icon: FaXTwitter },
  {
    title: "youtube",
    link: "https://www.youtube.com/@BharatExamFest",
    icon: ImYoutube,
  },
  {
    title: "facebook",
    link: "https://www.facebook.com/bharatexamfest",
    icon: FaFacebook,
  },
  {
    title: "linkedIn",
    link: "https://www.linkedin.com/company/bharat-exam-fest/",
    icon: FaLinkedin,
  },
  {
    title: "telegram",
    link: "https://t.me/BHARATEXAMFEST",
    icon: FaTelegramPlane,
  },
];
