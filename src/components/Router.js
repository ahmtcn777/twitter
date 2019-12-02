import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from 'react'
import Login from './Login'
import Profile from './Profile'
import Home from './Home'
import Signup from "./Signup";
import Status from "./Status";


export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/" exact={true}/>
                <Route component={Login} path="/logout" exact={true}/>
                <Route component={Profile} path="/user/:username" />
                <Route component={Status} path={"/status/:tweetId"}/>
                <Route component={Home} path="/home"/>
                <Route component={Signup} path={"/signup"}/>
            </Switch>
        </BrowserRouter>
    )
}