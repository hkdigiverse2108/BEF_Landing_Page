import { ROUTES } from "../Constants";

export const HeaderItems = [
  { Title: "Workshop", link: ROUTES.WORKSHOP.WORKSHOP },
  {
    Title: "Course",
    link: ROUTES.COURSE.COURSE,
    child: [
      { Title: "BEF Special ( Without Lecture )", link: "" },
      { Title: "BEF PRO ( With Lecture )", link: "" },
    ],
  },
  // {
  //   Title: "Download Now",
  //   child: [
  //     { Title: "Android App", link: "" },
  //     { Title: "IOS App", link: "" },
  //   ],
  // },
];
