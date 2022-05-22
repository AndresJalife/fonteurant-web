import Toolbar from "./Toolbar";
import React from "react";

export default function LayoutDefault({children}) {
    return (
        <div className="App-header">
            <Toolbar/>
            {children}
        </div>
    );
}
