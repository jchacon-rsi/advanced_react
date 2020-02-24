import React, { Component } from 'react';
import routes from './routes';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import NoMatch from './NoMatch';
class App extends Component {
    render() {
        console.log({route: routes});


        return (
            <div>
                <Navbar/>
                {routes.map(({ path, exact, component: C, ...rest }) => (
                    <Route
                        key={path}
                        path={path}
                        exact={exact}
                        render={(props) => (
                        <C {...props} {...rest} />
                        )}
                    />
                ))}  
                <Route render={(props)=><NoMatch {...props}/>}></Route>  
            </div>
        )
    }
}

export default App;

// {routes.map(({path,exact,component:Component,...rest})=>{
//     <Route
//         key={path}
//         path={path}
//         exact={exact}
//         render={(props)=>(
//             <C {...props} {...rest} />
//         )}
//     />
// })}  