import React from "react";
import userIcon from '../images/icon_user.png'

export default (props) => {
    const {item} = props
    const {index} = props
    const {follow} = props
    return (
        <div className="row subItem">
            <div className="col-md-2 photo">
                <img src={userIcon} className="rounded-circle"/>
            </div>
            <div className="col-md-6">
                <a href={'/user/' + item.username}>
                    <div className="profile-name cursor">
                        <span>{item.firstName + " " + item.lastName}</span>
                    </div>
                </a>
                <a href={'/user/' + item.username}>
                    <div className="username cursor">
                        <span>@{item.username}</span>
                    </div>
                </a>
            </div>
            <div>
                <button className="btn edit-button" id={'username'+item.username} onClick={() => {
                    follow(item.username)
                }}>Takip Et
                </button>
            </div>
        </div>
    )
}