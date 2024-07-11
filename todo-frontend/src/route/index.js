import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./main";
import { authRoutes } from "./auth";

const allRoutes = [...mainRoutes, ...authRoutes];
export default createBrowserRouter(allRoutes);