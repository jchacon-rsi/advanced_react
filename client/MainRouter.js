import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users'
import Signup from './user/Signup'; 
import Signin from './auth/Signin';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';
class MainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                    <Route path="/user/:userId" component={Profile}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                </Switch>
            </div>
        )
    }
}

export default MainRouter;