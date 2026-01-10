import { lazy } from "react";
import { ROUTES } from "../Constants";

import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import HelpSupport from "../Pages/Help&Support";
import PaymentSuccess from "../Components/Common/PaymentSuccess";
import PaymentFailed from "../Components/Common/PaymentFailed";
import PageNotFound from "../Components/Common/PageNotFound";
import PaymentStatus from "../Components/Common/PaymentStatus";

const Course = lazy(() => import("../Pages/Course"));
const CourseDetails = lazy(() => import("../Pages/Course/CourseDetails"));
const CourseRegister = lazy(() => import("../Pages/Course/CourseRegister"));
const CoursePayment = lazy(() => import("../Pages/Course/CoursePayment"));

const Workshop = lazy(() => import("../Pages/Workshop"));
const WorkshopDetails = lazy(() => import("../Pages/Workshop/WorkshopDetails"));
const WorkshopRegister = lazy(() => import("../Pages/Workshop/WorkshopRegister"));
const WorkshopPayment = lazy(() => import("../Pages/Workshop/WorkshopPayment"));

// import CourseRegister from "../Pages/Course/CourseRegister";
// import { ROUTES } from "../Constants";
// import Course from "../Pages/Course";
// import CourseDetails from "../Pages/Course/CourseDetails";
// import Home from "../Pages/Home";
// import Workshop from "../Pages/Workshop";
// import WorkshopRegister from "../Pages/Workshop/WorkshopRegister";
// import HelpSupport from "../Pages/Help&Support";
// import WorkshopPayment from "../Pages/Workshop/WorkshopPayment";
// import CoursePayment from "../Pages/Course/CoursePayment";
// import Blog from "../Pages/Blog";
// import PageNotFound from "../Components/Common/PageNotFound";
// import PaymentSuccess from "../Components/Common/PaymentSuccess";
// import PaymentFailed from "../Components/Common/PaymentFailed";
// import BlogDetails from "../Pages/Blog/BlogDetails";
// import WorkshopDetails from "../Pages/Workshop/WorkshopDetails";

export const PageRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.BLOG.BLOG,
    element: <Blog />,
  },
  {
    path: ROUTES.BLOG.DETAILS,
    element: <BlogDetails />,
  },
  {
    path: ROUTES.WORKSHOP.WORKSHOP,
    element: <Workshop />,
  },
  {
    path: ROUTES.WORKSHOP.DETAILS,
    element: <WorkshopDetails />,
  },
  {
    path: ROUTES.WORKSHOP.REGISTER,
    element: <WorkshopRegister />,
  },
  {
    path: ROUTES.WORKSHOP.PAYMENT,
    element: <WorkshopPayment />,
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
    path: ROUTES.COURSE.REGISTER,
    element: <CourseRegister />,
  },
  {
    path: ROUTES.COURSE.PAYMENT,
    element: <CoursePayment />,
  },
  {
    path: ROUTES.HELP_SUPPORT.BASE,
    element: <HelpSupport />,
  },
  {
    path: ROUTES.PAYMENT.STATUS,
    element: <PaymentStatus />,
  },
  {
    path: ROUTES.PAYMENT.SUCCESS,
    element: <PaymentSuccess />,
  },
  {
    path: ROUTES.PAYMENT.FAILED,
    element: <PaymentFailed />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
