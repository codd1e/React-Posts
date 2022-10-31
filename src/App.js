import React, {useEffect, useState} from "react";
import "./styles/App.css"
import {HashRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/context";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, [])

    return (
        <>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading
            }}>
                <HashRouter>
                    <Navbar/>
                    <AppRouter/>
                </HashRouter>
            </AuthContext.Provider>
        </>
    );
}

export default App;
