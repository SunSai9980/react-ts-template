import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];
console.log(import.meta.env.VITE_APP_URL);
const router = createBrowserRouter(routes);
export default router;
