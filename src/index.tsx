import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./components/App";


const root = document.getElementById("root");

if(!root) {
    throw new Error("No root node");
}
const container = createRoot(root);

container.render(<App/>)