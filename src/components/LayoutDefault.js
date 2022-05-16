import Toolbar from "./Toolbar";
import React from "react";

export default function LayoutDefault({children}) {
    //isLoginOpen={isLoginOpen} toggleLogin={() => setIsLoginOpen(!isLoginOpen)}
    return <div className="App-header">
        <Toolbar />
        {children}
    </div>;
}