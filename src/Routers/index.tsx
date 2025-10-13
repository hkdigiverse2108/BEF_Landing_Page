import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { PageRoutes } from "./PageRoutes";

export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children : PageRoutes
  },
]);
