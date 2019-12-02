import React, {Component} from 'react'
import {Button, Slider, Select} from "@material-ui/core"
import jwt from 'jwt-decode'
import {Redirect} from 'react-router-dom'
import Leftbar from './Leftbar'
import HomeContent from './HomeContent.js'
import Rightbar from "./Rightbar";


class Home extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.state = {
            loggedIn: false
        }
        if (localStorage.getItem("token") != null) {
            const token = jwt(localStorage.getItem("token"))
            if (new Date() > token.exp) {
                this.state = {
                    loggedIn: true
                }
            } else {
                this.state = {
                    loggedIn: false
                }
            }
        } else {
            this.state = {
                loggedIn: false
            }
        }
    }

    logout() {
        localStorage.removeItem("token")
        this.setState((prevState) => {
            return{
                loggedIn:false
            }
        })
    }

    render() {
        if (!this.state.loggedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div className="row">
                <Leftbar />
                <HomeContent />
                <Rightbar/>
            </div>
        )
    }
}

export default Home