import React, {Suspense} from "react";
import {createRoot} from "react-dom/client";
import {App} from "./components/App/AppMainComponent/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About} from "./pages/about";
import {Shop} from "./pages/shop";


const root = document.getElementById("root");

if (!root) {
    throw new Error("No root node");
}
const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/about",
                element: <Suspense><About/></Suspense>
            },
            {
                path: "/shop",
                element: <Suspense><Shop/></Suspense>
            }
        ]
    }
]);
container.render(
    <RouterProvider router={router}/>)