import React, { Fragment, useEffect } from 'react'
import { Route, useRouteMatch, Redirect, Switch, useHistory } from 'react-router-dom'
import ForgotPassword from '../../Pages/ForgotPassword';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register';
import ResetPassword from '../../Pages/ResetPassword';

export default function Auth() {


    let match = useRouteMatch();

    console.log(`${match.url}/login`);

    return (
        <Fragment>
            <Switch>

                <Route exact path={`${match.path}/login`}>
                    <Login />
                </Route>
                <Route exact path={`${match.path}/register`}>
                    <Register />
                </Route>
                <Route exact path={`${match.path}/passwordReset`}>
                    <ForgotPassword />
                </Route>
                <Route exact path={`${match.path}/change-password/:token`} component={ResetPassword}/>

                <Route path={`${match.path}`}>
                    <Redirect to="/auth/login" />

                </Route>
            </Switch>
        </Fragment>


    )
}
