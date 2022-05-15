import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
            {isAuth
                ? privateRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={route.component}/>
                )
                : publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={route.component}/>
                )
            }
        </Routes>
    );
};

export default AppRouter;
