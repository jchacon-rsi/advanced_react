import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, {CardContent, CardMedia} from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'

// import background from './../assets/images/bg.jpg';
// import rsi_banner from './../assets/images/rsi_banner.jpeg';
import { Link, withRouter } from 'react-router-dom'; // withRouter will allow us to reference the history objects properties.
import Toolbar from '@material-ui/core/Toolbar';
import  AppBar from '@material-ui/core/AppBar';
import auth from '../auth/auth-helper';

const Menu = withRouter(({history}) => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography type="title" color="inherit">
                    Advanced React Demo
                </Typography>
                <Link to="/">
                    <IconButton aria-label="Home" style={isActive(history, "/")}>
                        <HomeIcon/>
                    </IconButton>
                </Link>
                <Link to="/users">
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
                {
                    !auth.isAuthenticated() && 
                        <span>
                            <Link to="/signup">
                                <Button style={isActive(history, "/signup")}> Sign Up </Button>
                            </Link>
                            <Link to="/signin">
                                <Button style={isActive(history, "/signin")}> Sign In </Button>
                            </Link>
                        </span>
                }
                {
                    auth.isAuthenticated() &&
                        <span>
                            <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}> My Profile </Button>
                            </Link>
                            <Button color="inherit" onClick={()=> {auth.signout(() => history.push('/'))}}> Sign out </Button>
                        </span>
                }
            </Toolbar>
        </AppBar>
    </div>
))

const isActive = (history, path) => {
    if (history.location.pathname == path) {
        return {color: '#ff4081'}
    } else {
        return {color: '#ffffff'}
    }
}

export default Menu;