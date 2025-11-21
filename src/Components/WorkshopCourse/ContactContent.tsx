import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { CONTACT } from "../../Data";

const ContactContent = () => {
  return (
    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      <Link
        to={`tel:${CONTACT?.NUMBER}`}
        className="flex flex-nowrap gap-2 cursor-pointer text-black!"
      >
        <IoCall className="me-2 text-lg text-success" />
        {CONTACT?.NUMBER}
      </Link>
      <span className=" border-t flex border-gray-200  "></span>
      <Link
        to={`https://api.whatsapp.com/send?phone=${
          CONTACT?.NUMBER
        }&text=${encodeURIComponent(`I Need Help In Bharat Exam Fest Web`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-nowrap gap-2 cursor-pointer text-black!"
      >
        <IoLogoWhatsapp className="me-2 text-lg text-success" /> Chat With Us
      </Link>
    </div>
  );
};

export default ContactContent;
