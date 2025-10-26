import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { ROUTES } from "../Constants";

export const Social_Icons = [FaInstagram, FaTwitter, FaTelegramPlane, ImYoutube]


export const Help_Support = [
    { label: "About us", path: ROUTES.HELP_SUPPORT.ABOUT_US },
    { label: "Legality", path: ROUTES.HELP_SUPPORT.ILLEGALITY },
    { label: "Terms & conditions", path: ROUTES.HELP_SUPPORT.TERM_CONDITION },
    { label: "Privacy Policy", path: ROUTES.HELP_SUPPORT.PRIVACY_POLICY },
    { label: "Refund policy", path: ROUTES.HELP_SUPPORT.REFUND_POLICY },
];