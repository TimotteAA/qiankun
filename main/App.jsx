import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header";

import { start } from "./micro-fe"

const App = () => {
    React.useEffect(() => {
        start();
    }, [])

    return <div>
        <h1>老子是主应用</h1>
        <Header />
        <div>
            <Outlet />
        </div>
        <div>
            <h3>子应用渲染区域</h3>
            <div id="reactContainer"></div>
        </div>
    </div>
}

export default App;
