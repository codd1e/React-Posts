import React from "react";
import "./styles/App.css"
import {HashRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path='/about' element={<About/>}/>
                    <Route exact path='/' element={<Posts/>}/>
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
