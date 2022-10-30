import React from "react";
import "./styles/App.css"
import {HashRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <>
            <HashRouter>
                <Navbar/>
                <AppRouter/>
            </HashRouter>
        </>
    );
}

export default App;
