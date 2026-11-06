import { FaLightbulb } from "react-icons/fa";
import { MdLibraryAddCheck, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiFileCheckFill } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";

export const InstructionButtons = [
  {
    label: "100% Sure",
    icon: <MdLibraryAddCheck className="text-lg" />,
    color: "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700",
    placement: "topLeft",
    tooltipLabel: "Confident about your answer? Select this when you’re absolutely certain it’s correct!",
    tooltipColor: "#dbeafe",
  },
  {
    label: "Logic Play",
    icon: <FaLightbulb className="text-lg" />,
    color: "bg-gradient-to-r from-rose-700 via-rose-500 to-rose-700",
    placement: "top",
    tooltipLabel: "Use elimination or aptitude techniques to solve the question! Click here to showcase your tactical skills!",
    tooltipColor: "#fce7f3",
  },
  {
    label: "Intuition Hit",
    icon: <MdVisibility className="text-lg" />,
    color: "bg-gradient-to-r from-sky-700 via-sky-500 to-sky-700",
    placement: "topRight",
    tooltipLabel: "Trusting your gut? Select this when you feel the answer is in your reach, even without full certainty!",
    tooltipColor: "#dff2fe",
  },
  {
    label: "Blind Fire",
    icon: <MdVisibilityOff className="text-lg" />,
    color: "bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700",
    placement: "bottomLeft",
    tooltipLabel: "Taking a wild guess? Choose this when you're answering without any clue!",
    tooltipColor: "#fef3c6",
  },
  {
    label: "Fear - Driver Skip",
    icon: <RiFileCheckFill className="text-lg" />,
    color: "bg-gradient-to-r from-green-700 via-green-500 to-green-700",
    placement: "bottomRight",
    tooltipLabel:
      '"Want to attempt but afraid of taking the risk? " using this will help you to decide if you should be bolder or if skipping is the safer choice! & No mark deduction or gain in this button',
    tooltipColor: "#dcfce7",
  },
  {
    label: "Skip",
    icon: <TbMessageQuestion className="text-lg" />,
    color: "bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700",
    placement: "bottom",
    tooltipLabel: '"Not feeling this one? Click to skip and move to the next question"',
    tooltipColor: "#f3e8ff",
  },
];

