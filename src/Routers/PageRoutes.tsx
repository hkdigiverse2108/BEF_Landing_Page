import { ROUTES } from "../Constants";
import Course from "../Pages/Course";
import CourseDetails from "../Pages/Course/CourseDetails";
import Home from "../Pages/Home";
import Workshop from "../Pages/Workshop";

export const PageRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.WORKSHOP,
    element: <Workshop />,
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
];
