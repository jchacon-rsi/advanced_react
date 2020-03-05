
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

class DeleteUser extends Component {
    state = {
        redirect: false,
        open: false
    }
    clickButton = () => {
        this.setState({open:true})
    }
    deleteAccount = () => {
        const jwt = auth.isAuthenticated();
        remove({
            userId: this.props.userId
        }, {t:jwt.token}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                auth.signout(()=> console.log('deleted'));
                this.setState({redirect: true})
            }
        })
    }
    handleRequestClose = () => {
        this.setState({open:false})
    }
    render() {
        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to='/' />
        }
        return (
            <span>
                <IconButton aia-label="Delete" onClick={this.clickButton} color="secondary">
                    <DeleteIcon/>
                </IconButton>

                <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>{"Delete Account"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm to delete your account.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        
                    </DialogActions>
                </Dialog>
            </span>
        )
    }
}

export default DeleteUser