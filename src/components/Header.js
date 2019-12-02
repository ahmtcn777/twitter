import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom'

export default () => {
    return(
        <Fragment>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </Fragment>
    )
}