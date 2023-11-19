import { RouteObject } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <div>COMING SOON</div>,
      },
    ],
  },
];

export default routes;
