import CourseRegister from "../Pages/Course/CourseRegister";
import { ROUTES } from "../Constants";
import Course from "../Pages/Course";
import CourseDetails from "../Pages/Course/CourseDetails";
import Home from "../Pages/Home";
import Workshop from "../Pages/Workshop";
import WorkshopRegister from "../Pages/Workshop/WorkshopRegister";
import HelpSupport from "../Pages/Help&Support";
import WorkshopPayment from "../Pages/Workshop/WorkshopPayment";
import CoursePayment from "../Pages/Course/CoursePayment";
import Blog from "../Pages/Blog";
import PageNotFound from "../Components/Common/PageNotFound";
import PaymentSuccess from "../Components/Common/PaymentSuccess";
import PaymentFailed from "../Components/Common/PaymentFailed";

export const PageRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.BLOG,
    element: <Blog />,
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
