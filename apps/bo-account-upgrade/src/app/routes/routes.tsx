import { Outlet } from "react-router-dom";
import BOLevel2Primer from "../pages/level-2/primer/page";

export const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <BOLevel2Primer />,
      },
      {
        path: "kyc-lvl2",
        element: <div>Level 2 setting up </div>,
      },
      {
        path: "kyc-lvl3",
        element: <div>Level 3</div>,
      },
    ],
  },
];
