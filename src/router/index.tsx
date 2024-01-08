import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_URL,
});
export default router;
