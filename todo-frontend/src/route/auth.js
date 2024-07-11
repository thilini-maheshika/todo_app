import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import ErrorPage from "../pages/error/ErrorPage";

const authRoutes = [
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    // {
    //     path: "*",
    //     element: <ErrorPage />
    // },
];

export { authRoutes };