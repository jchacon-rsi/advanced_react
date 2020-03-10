import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user.js';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing.unit,
        margin: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit *2}px`,
        color: theme.palette.openTitle
    }
});

class Users extends Component {
    state = { users: [] }

    constructor(props) {
        super(props);
        
    }
    componentDidMount = () => {
        console.log("Users Mounted")
        list().then(data => {
            if (data.error) {
                console.log(err)
            } else {
                this.setState({users: data});
            }
        })
    }

    getLastJoined = (date) => {
        if (date) {
            let currentDateUnix = Math.round(new Date().getTime() / 1000);
            let previousDateUnix = Math.round(new Date(date).getTime() / 1000);
            let timeDiffInSecs= currentDateUnix - previousDateUnix;
            let delta = Math.abs(previousDateUnix - currentDateUnix) / 1000;
            
            let days = Math.floor(delta / 86400)
            delta -= days * 86400;

            let hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            let minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            let seconds = delta % 60;
            console.log({days, hours, minutes, seconds})
            let outputStatement = "Last Active: " + 
                    days > 0 ? `${days} days, ` : '' +
                    hours > 0 ? `${hours} hours,` : '' +
                    minutes > 0 ? `${minutes} minutes and,` : '' +
                    seconds > 0 ? `${seconds} seconds ago.` : ' ago'
            return outputStatement;

        }

        return 'unknown';
    }
    render() {
        const {classes} = this.props;
        return(
            <Paper className={classes.root} elevation={4}>
                 <Typography type="title" className={classes.title}>
                     All Users
                 </Typography>
                 <List dense>
                     {this.state.users.map((item, i) => {
                            // return JSON.stringify(item)
                        if (item._id) {
                            return <Link to={"/user/" + item._id} key={i}>
                              <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemText primary={`Last active: ${this.getLastJoined(item.updated)}`}/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                         </Link>
                        }  
                    })}
            //     </List>
            </Paper>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
