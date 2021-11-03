import React, { useEffect, useState } from 'react'
import { Redirect, Route, RouterProps } from 'react-router';
import { isLogged } from '../Auth.api';

interface CustomProps  {
    component: any,
    exact?: true,
    path: string

}

export default function ProtectedRoute({component: Component, ...restOfProps }: CustomProps) {

    // const isAuthenticated = localStorage.getItem("isAuthenticated");

    const checkAuth = async () => {
        const response =  await isLogged();
        // const response =  true;

        setIsAuth(response);
        console.log( response ? 'User is authenticated' : 'User not authenticated')
    }

    useEffect(() => {
        checkAuth();
    }, []);


    const [ isAuth, setIsAuth] = useState(true);
    // isLogged()
    //     .then( () => {
    //         setIsAuth(true);
    //     }
    //     )
    //     .catch( () => {
    //         setIsAuth(false);
    //     });



    return (
        <div>
            <Route
                {...restOfProps}
                render={(props) => {
                    return isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
                }
                }
                />
        </div>
    )
}
