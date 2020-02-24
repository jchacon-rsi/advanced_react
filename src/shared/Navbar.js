import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar(){
    const tabs = [{
        name: 'Home',
        param: '/'
    }]

    return(
        <ul>
            {tabs.map(({name, param}) => {
            return (
                <li key={param}>
                    <NavLink activeStyle={{fontWeight:'bold'}} to={`${param}`}>
                    {name}
                    </NavLink>
                </li>
            )
            })}
        </ul>
    )
}