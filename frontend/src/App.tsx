import { Fragment } from 'react';
import {BrowserRouter, Switch, Route, Redirect}  from 'react-router-dom';
import Auth from './components/auth/Auth';
import Menu from './components/menu/Menu';
import NotFound from './components/NotFound/NotFound';
import ParkView from './components/protected/ParkView';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Totem from './components/totem/Totem';


function App(): JSX.Element {
  return (
    <Fragment>
      <Switch>

        <Route path="/auth">
          <Auth/>
        </Route>
        <ProtectedRoute  path="/homepage" component={ParkView}/>
        <ProtectedRoute path="/totem" component={Totem}/>
        <ProtectedRoute path="/menu" component={Menu}/>
        <Redirect to={'/homepage'}></Redirect>
        <Route path="/" component={NotFound}/>
      </Switch>
      
    </Fragment>
   
  );
}

export default App;