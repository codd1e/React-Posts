import React, {useContext, useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context/context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    const navigate = useNavigate();

    // redirect for Auth users
    useEffect(() => {
        if(!isAuth){
            return navigate('/login')
        } else {
            navigate('/posts')
        }
    }, [isAuth])

    if(isLoading){
        return <Loader/>
    }

    return (
        <>
            {
                isAuth
                    ? (
                        <Routes>
                            {
                                privateRoutes.map(route =>
                                    <Route key={route.path} element={route.element} path={route.path} />
                                )
                            }
                        </Routes>
                    )
                    : (
                        <Routes>
                            {
                                publicRoutes.map(route =>
                                    <Route key={route.path} element={route.element} path={route.path} replace />
                                )
                            }
                        </Routes>
                    )
            }
        </>
    );
};

export default AppRouter;