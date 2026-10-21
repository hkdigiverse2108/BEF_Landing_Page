import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../Layout";
import { PageRoutes } from "./PageRoutes";
import { ROUTES } from "../Constants";
import MockTestIntroPage from "../Pages/MockTest/MockTestIntroPage";
import MockTestInstructionPage from "../Pages/MockTest/MockTestInstructionPage";
import MockTestPracticePage from "../Pages/MockTest/MockTestPracticePage";
import MockTestAnalysisPage from "../Pages/MockTest/MockTestAnalysisPage";

export const Router = createBrowserRouter([
  {
    path: ROUTES.MOCK_TEST.INTRO,
    element: <MockTestIntroPage />,
  },
  {
    path: ROUTES.MOCK_TEST.INSTRUCTION,
    element: <MockTestInstructionPage />,
  },
  {
    path: ROUTES.MOCK_TEST.TEST,
    element: <MockTestPracticePage />,
  },
  {
    path: ROUTES.MOCK_TEST.ANALYSIS,
    element: <MockTestAnalysisPage />,
  },
  {
    path: "/free-practice",
    element: <Navigate to={ROUTES.MOCK_TEST.INTRO} replace />,
  },
  {
    element: <Layout />,
    children: PageRoutes,
  },
]);
