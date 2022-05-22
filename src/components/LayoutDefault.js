import Toolbar from "./Toolbar";
import React from "react";

export default function LayoutDefault({children}) {
    return (
        <div>
            <Toolbar/>
            {children}
        </div>
    );
}
