import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography';
import background from './../assets/images/bg.jpg';
import { Link } from 'react-router-dom';

const styles = theme => ({ //JSS => CSS-in-JS styling for material-ui
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Home Page
                    </Typography>
                    <CardMedia className={classes.media} image={background} title={"Unicorn Shells"}/>
                    <CardContent>
                        <Typography type="body1" component="p">
                            Welcome to the RSI React Server Side rendering home page
                        </Typography>
                    </CardContent>
                </Card>
                <Link to="/users">Users</Link>
                <Link to="/signup">Signup</Link>
            </div>
        )
    }
}
Home.propTypes = { // Validate the required injection of props
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Home)