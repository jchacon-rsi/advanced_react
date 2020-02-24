import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props)
        let user;
        if (__isBrowser__) {
            user = window.__INITIAL_DATA__
            delete window.__INITIAL_DATA__
        } else {
            user = props.staticContext.data;
        }
        this.state = {
            user
        }
    }
    render() {
        let {user} = this.state
        console.log("USER: " + JSON.stringify(user))
        return (
            <div>
                Welcome Home {user.name}
            </div>
        )
    }
}

export default Home;