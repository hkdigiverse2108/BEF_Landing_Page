import CourseRegister from "../Pages/Course/CourseRegister";
import { ROUTES } from "../Constants";
import Course from "../Pages/Course";
import CourseDetails from "../Pages/Course/CourseDetails";
import Home from "../Pages/Home";
import Workshop from "../Pages/Workshop";
import WorkshopRegister from "../Pages/Workshop/WorkshopRegister";
import HelpSupport from "../Pages/Help&Support";

export const PageRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.WORKSHOP.WORKSHOP,
    element: <Workshop />,
  },
  {
    path: ROUTES.WORKSHOP.REGISTER,
    element: <WorkshopRegister />,
  },
  {
    path: ROUTES.COURSE.COURSE,
    element: <Course />,
  },
  {
    path: ROUTES.COURSE.DETAILS,
    element: <CourseDetails />,
  },
  {
    path: ROUTES.COURSE.DETAILS,
    element: <CourseDetails />,
  },
  {
    path: ROUTES.COURSE.REGISTER,
    element: <CourseRegister />,
  },
  {
    path: ROUTES.HELP_SUPPORT.BASE,
    element: <HelpSupport />,
  },
];
