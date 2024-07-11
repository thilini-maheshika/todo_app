import Home from "../pages/view/Home";
import WelcomePage from "../pages/view/WelcomePage";
import AddTask from "../pages/view/AddTask";
import EditTask from "../pages/view/EditTask";
import Main from "../layout/Main";

const mainRoutes = [
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <WelcomePage />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "addtask",
                element: <AddTask />
            },
            {
                path: "editask",
                element: <EditTask />
            },
        ]
    }
];

export { mainRoutes };