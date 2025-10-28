import { FaFacebook, FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import type { ContactType } from "../Types";


export const LOGIN_URL = "http://course.bharatexamfest.com/"


export const APP_LINKS = {
    PLAY_STORE: "#",
    APP_STORE: "#",
} as const;


export const CONTACT: ContactType = {
    number: "+91 91063 60330",
    emailInfo: "info@bharatexamfest.com",
    emailHelp: "help@bharatexamfest.com",
    emailSales: "sales@bharatexamfest.com",
    address: "501-502, Silver Trade Center, Mota Varachhha, Surat, Gujarat, India-394101."
}

export const SOCIAL_MEDIA = [
    { title: "instagram", link: "https://www.instagram.com/bharatexamfest", icon: FaInstagram },
    { title: "x", link: "https://x.com/Bharatexamfest", icon: FaXTwitter },
    { title: "youtube", link: "https://www.youtube.com/@BharatExamFest", icon: ImYoutube },
    { title: "facebook", link: "https://www.facebook.com/bharatexamfest", icon: FaFacebook },
    { title: "linkedIn", link: "https://www.linkedin.com/company/bharat-exam-fest/", icon: FaLinkedin },
    { title: "telegram", link: "https://t.me/BHARATEXAMFEST", icon: FaTelegramPlane }
]