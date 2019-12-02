import React, {Component} from "react"
import {Redirect} from 'react-router-dom'
import Leftbar from './Leftbar'
import ProfileContent from './ProfileContent'
import Rightbar from "./Rightbar";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)

        if (localStorage.getItem("token") == null) {
            this.state = {
                loggedIn: false
            }
        } else {
            this.state = {
                loggedIn: true
            }
        }
    }

    logOut() {
        localStorage.removeItem("token")
        this.setState({
            loggedIn: false
        })
    }

    render() {
        if (this.state.loggedIn == false)
            return <Redirect to="/"/>

        const username = this.props.match.params.username;
        return (
            <div className="row wrapper">
                    <Leftbar />
                    <ProfileContent username={username}/>
                    <Rightbar/>
            </div>
        )
    }
}

export default Profile