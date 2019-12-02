import React, {Component} from "react"
import axios from 'axios'
import userIcon from '../images/icon_user.png'
class ContentProfileHeader extends Component {
    constructor(props) {
        super(props)
        const authUsername = localStorage.getItem("username");
        const firstLastName = props.firstLastName
        const {username} = props
        const {followers} = props
        const {followings} = props
        const {isOwner} = props
        const {isFollowing} = props
        this.follow = this.follow.bind(this)
        this.unfollow = this.unfollow.bind(this)
    }

    follow() {
        const authUsername = localStorage.getItem("username")
        const username = this.props.username
        axios.get('http://localhost:9090/follow/' + authUsername + "/" + username, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (!response.data) {
                    axios.post('http://localhost:9090/follow',
                        {
                            username: authUsername,
                            followingUsername: username
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem("token")
                            }
                        }).then((response) => {
                        if (response.status == 201) {
                            document.getElementById("follow").innerText = "Takip ediliyor"
                            var count = document.getElementById("follower").textContent
                            count++
                            document.getElementById("follower").innerText = count
                        }
                    })
                } else {
                    axios.delete('http://localhost:9090/follow',
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem("token")
                            },
                            data: {
                                username: authUsername,
                                followingUsername: username
                            }
                        }).then((response) => {
                        if (response.status == 204) {
                            document.getElementById("follow").innerText = "Takip et"
                            var count = document.getElementById("follower").textContent
                            count--
                            document.getElementById("follower").innerText = count
                        }
                    })
                }
            })


    }

    unfollow() {
        const authUsername = localStorage.getItem("username")
        const username = this.props.username

    }

    render() {
        const firstLastName = this.props.firstLastName
        return (
            <div className="row">
                <div className="profile-header">
                    <div className="col-md-12 px-0">
                        <div className="row mx-0">
                            <div className="col-md-12 px-0 kapak-photo">
                                <img src="https://via.placeholder.com/600x200" className="img-fluid w-100"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 profile-set">
                                <div className="col-md-2 profile-photo">
                                    <img src={userIcon} className="rounded-circle"/>
                                </div>
                                <div className="col-md-auto col-auto profile-edit" id="actionButton">
                                    {
                                        this.props.isOwner ?
                                            <a href="#" className="btn edit-button" id="edit-profile" role="button">Profili
                                                düzenle</a>
                                            :
                                            this.props.isFollowing ?
                                                <button className="btn edit-button" onClick={() => {
                                                    this.follow()
                                                }} id="follow">Takipten çıkar</button>
                                                :
                                                <button className="btn edit-button" onClick={() => {
                                                    this.follow()
                                                }} id="follow">Takip Et</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row profile-name">
                            <span className="name">{firstLastName}</span>
                        </div>
                        <div className="row profile-name">
                            <span className="username">@{this.props.username}</span>
                        </div>
                        <div className="row">
                            <div className="col-md-12 profile-text">
                                <span>Profil detayı</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 follow-statics">
                                <span className="statics" id="following">{this.props.followings}</span> <span
                                className="follow-unit">Takip edilen</span>
                                <span className="statics" id="follower">{this.props.followers}</span> <span
                                className="follow-unit">Takipçi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentProfileHeader