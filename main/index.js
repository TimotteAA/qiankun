import App from "./App.jsx";
import New from "./pages/New";
import Fuck from "./pages/Fuck";
import ErrorPage from "./pages/Errors";
import React from "react";
import ReactDom from "react-dom/client"

// import { registerMicroApps, start } from 'qiankun';
import { registerMicroApps, start } from "./micro-fe"

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "new",
                element: <New />
            },
            {
                path: "fuck",
                element: <Fuck />
            }
        ],
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

registerMicroApps([
    {
        name: 'react-app1', // app name registered
        entry: '//localhost:9000',
        container: '#reactContainer',
        activeRule: '/new',
    },
    {
        name: 'react-app2',
        entry: '//localhost:9001',
        container: '#reactContainer',
        activeRule: '/fuck',
    },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />)

