import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context/context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        <Loader/>
    }

    return (
        <>
            {
                isAuth
                ? (
                        <Routes>
                            {
                                privateRoutes.map(route =>
                                <Route key={route.path} element={route.element} path={route.path} index={route.exact}/>
                                )
                            }
                        </Routes>
                        )
                : (
                        <Routes>
                            {
                                publicRoutes.map(route =>
                                <Route key={route.path} element={route.element} path={route.path} index={route.exact}/>
                                )
                            }
                        </Routes>
                        )
            }
        </>
    );
};

export default AppRouter;