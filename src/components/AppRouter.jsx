import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publickRoutes } from '../router';
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';
const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    if(isLoading){
        return <Loader/>
    }

    // const isAuth = false;
    return (
            isAuth
            ?
            <Routes>
                {privateRoutes.map((rout) =>
                    <Route
                        key={rout.path}
                        path={rout.path}
                        element={<rout.component/>}
                        exact={rout.exact}
                    />

                )}
                <Route
                    path="*"
                    element={<Navigate to="/posts" replace />}
                />
            </Routes>

            :
            <Routes>
                {publickRoutes.map((rout) =>
                    <Route
                        key={rout.path}
                        path={rout.path}
                        element={<rout.component/>}
                        exact={rout.exact}
                    />

                )}
                {/* <Route exact path='/posts' element={<Posts/>}/>
                <Route exact path='/posts/:id' element={<PostIdPage/>}/>
                <Route path='/error' element={<Error/>}/> */}
                {/* <Redirect to="/posts" /> */}

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>


    );
}

export default AppRouter;