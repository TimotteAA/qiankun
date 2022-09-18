import React from "react";
import { Link } from "react-router-dom"


const Header = () => {
    return <div>
        我是页面header
        <div>
            <Link to={"new"}>New 页面</Link>
            <Link to={"fuck"}>Fuck 页面</Link>
        </div>

    </div>
}

export default Header;
