import React, {Component} from 'react';
import Time from './Time';
import axios from "axios";
import {Redirect} from 'react-router-dom'
import likeIcon from '../images/icon_like.png'
import dislikeIcon from '../images/icon_dislike.png'
import retweetIcon from '../images/icon_unretweet.png'
import unretweetIcon from '../images/icon_retweet.png'
import deleteIcon from '../images/icon_delete.png'
import commentIcon from '../images/icon_comment.png'
import userIcon from '../images/icon_user.png'
import ReactDOM from "react-dom";


class Tweet extends Component {
    constructor(props) {
        super(props)
        this.like = this.like.bind(this)
        this.retweet = this.retweet.bind(this)
        this.delete = this.delete.bind(this)
        this.makeComment = this.makeComment.bind(this)
        this.formChange = this.formChange.bind(this)
        this.state = {
            like: false,
            retweet: false,
            retweetedBy: false,
            disabled:true
        }
    }


    componentDidMount() {
        const {item} = this.props
        const username = localStorage.getItem("username")
        const tweetId = item.tweetId
        const retweetedBy = item.retweetedBy
        axios.get('http://localhost:9090/like/' + username + "/" + tweetId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (response.data) {
                this.setState(() => {
                    return ({
                        like: true
                    })
                })
            }
        })
        axios.get('http://localhost:9090/retweet/' + username + "/" + tweetId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (response.data) {
                this.setState(() => {
                    return ({
                        retweet: true
                    })
                })
            }
        })
        if (retweetedBy != null) {
            this.setState(() => {
                return ({
                    retweetedBy: true
                })
            })
        }
    }

    formChange(e){
        if(e.target.value.trim().length == 0){
            this.setState(() => {
                return({
                    disabled:true
                })
            })
        }
        else{
            this.setState(() => {
                return({
                    disabled:false
                })
            })
        }
    }

    makeComment() {
        const {item} = this.props
        const username = localStorage.getItem("username")
        const tweetId = item.tweetId
        const content = document.getElementById("shareComment").value.trim()
        axios.post('http://localhost:9090/comment', {
                "username": username,
                "tweetId": tweetId,
                "content": content


            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (response.status == 201) {
                document.getElementById("shareComment").value = ""
                var commentDiv = document.getElementById("comment"+item.tweetId)
                var count = commentDiv.innerText
                count++
                commentDiv.innerText = count
                document.getElementById("close").click()
                var subDiv = document.createElement("div")
                subDiv.id = response.data.tweetId
                var newTweetDiv = document.getElementById("newTweet")
                newTweetDiv.prepend(subDiv)
                ReactDOM.render(<Tweet
                    item = {response.data}/>, document.getElementById(response.data.tweetId))
            }
        })

    }

    retweet() {
        const {item} = this.props
        const username = localStorage.getItem("username")
        const tweetId = item.tweetId

        axios.get('http://localhost:9090/retweet/' + username + "/" + tweetId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (!response.data) {
                axios.post('http://localhost:9090/retweet',
                    {
                        username: username,
                        tweetId: tweetId
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")
                        }
                    }
                ).then((response) => {
                    if (response.status = 201) {
                        var retweetCount = document.getElementById('retweet' + item.tweetId)
                            .getElementsByTagName("span")[0].innerText
                        retweetCount++
                        document.getElementById('retweet' + item.tweetId).getElementsByTagName("span")[0].innerText = retweetCount
                        document.getElementById('retweet' + item.tweetId).getElementsByTagName("img")[0].src = retweetIcon
                    }
                });
            } else {
                axios.delete(
                    'http://localhost:9090/retweet',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")
                        },
                        data: {
                            username: username,
                            tweetId: tweetId
                        }
                    }
                ).then((response) => {
                    if (response.status = 204) {
                        var retweetCount = document.getElementById('retweet' + item.tweetId)
                            .getElementsByTagName("span")[0].innerText
                        retweetCount--
                        document.getElementById('retweet' + item.tweetId).getElementsByTagName("span")[0].innerText = retweetCount
                        document.getElementById('retweet' + item.tweetId).getElementsByTagName("img")[0].src = unretweetIcon
                    }
                });
            }
        })
    }

    like() {
        const {item} = this.props
        const username = localStorage.getItem("username")
        const tweetId = item.tweetId

        axios.get('http://localhost:9090/like/' + username + "/" + tweetId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (!response.data) {
                axios.post('http://localhost:9090/like',
                    {
                        username: username,
                        tweetId: tweetId
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")
                        }
                    }
                ).then((response) => {
                    if (response.status = 201) {
                        var likeCount = document.getElementById('like' + item.tweetId)
                            .getElementsByTagName("span")[0].innerText
                        likeCount++
                        document.getElementById('like' + item.tweetId).getElementsByTagName("span")[0].innerText = likeCount
                        document.getElementById('like' + item.tweetId).getElementsByTagName("img")[0].src = dislikeIcon

                    }
                });
            } else {
                axios.delete(
                    'http://localhost:9090/like',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")
                        },
                        data: {
                            username: username,
                            tweetId: tweetId
                        }
                    }
                ).then((response) => {
                    if (response.status = 204) {
                        var likeCount = document.getElementById('like' + item.tweetId)
                            .getElementsByTagName("span")[0].innerText
                        likeCount--
                        document.getElementById('like' + item.tweetId).getElementsByTagName("span")[0].innerText = likeCount
                        document.getElementById('like' + item.tweetId).getElementsByTagName("img")[0].src = likeIcon
                    }
                });
            }
        })
    }

    delete(id) {
        const {item} = this.props
        axios.delete('http://localhost:9090/?id=' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }).then((response) => {
            if (response.status == 204) {
                document.getElementById(id).remove()
            }
        })
    }
    render() {
        const {item} = this.props
        const like = this.state.like
        const retweet = this.state.retweet
        const retweetedBy = this.state.retweetedBy
        const authUsername = localStorage.getItem("username")
        return (
            <div className="row" id={item.tweetId}>
                <div className="post col-md-12 d-flex">
                    <div className="col-md-auto photo">
                        <img src={userIcon} className="rounded-circle"/>
                    </div>
                    <div className="col-md-11 content">
                        <div className="tweet">
                            {
                                retweetedBy ?
                                    <span className="retweeted">
                                <img src={retweetIcon}/>
                                        {
                                            item.retweetedBy === authUsername ?
                                                "Retweetledin"
                                                :
                                                item.retweetedBy + " retweetledi."

                                        }
                            </span>
                                    :
                                    ""
                            }
                            <div className="row post-header d-flex">
                                <div className="col-md-10 post-header-frame d-flex">
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
                                    <div className="time">
                                        <Time current={new Date(Date.now())} previous={item.updateDate}/>
                                    </div>
                                </div>
                                {
                                    item.username === authUsername ?
                                        <div className="col-md-2 post-header-frame d-flex">
                                            <div className="col-auto delete-tweet cursor">
                                                <img src={deleteIcon} onClick={() => {
                                                    this.delete(item.tweetId)
                                                }}/>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                                {
                                    item.username !== authUsername && item.username === authUsername ?
                                        <div className="col-md-2 post-header-frame d-flex">
                                            <div className="col-auto delete-tweet cursor">
                                                <img src={deleteIcon} onClick={() => {
                                                    this.delete(item.tweetId)
                                                }}/>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                            <a href={'/status/' + item.tweetId}>
                                <div className="col-md-12 post-content">
                                    <div className="row post-text">
                                        <span>{item.content}</span>
                                    </div>
                                    <div className="row post-image">
                                        <div className="col-md-auto image">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-12 post-footer d-flex">
                            <div className="col-md-4 comment">
                                <div className="comment">
                                    <button className="commentButton" type="button" data-toggle="modal"
                                            data-target="#exampleModalCenter">
                                        <img
                                            src={commentIcon}/>
                                    </button>

                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" id="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">


                                                    <div className="row" id={item.tweetId}>
                                                        <div className="post col-md-12 d-flex">
                                                            <div className="col-md-auto photo">
                                                                <img src="https://via.placeholder.com/50"
                                                                     className="rounded-circle"/>
                                                            </div>
                                                            <div className="col-md-11 content">
                                                                <div className="tweet">
                                                                    <div className="row post-header d-flex">
                                                                        <div
                                                                            className="col-md-10 post-header-frame d-flex">
                                                                            <div className="profile-name">
                                                                                <span>{item.firstName + " " + item.lastName}</span>
                                                                            </div>
                                                                            <div className="username">
                                                                                <span>@{item.username}</span>
                                                                            </div>
                                                                            <div className="time">
                                                                                <Time current={new Date(Date.now())}
                                                                                      previous={item.updateDate}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 post-content">
                                                                        <div className="row post-text">
                                                                            <span>{item.content}</span>
                                                                        </div>
                                                                        <div className="row post-image">
                                                                            <div className="col-md-auto image">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div
                                                            className="col-md-12 form-content tweet-form d-flex align-items-center">
                                                            <img src="https://via.placeholder.com/50"
                                                                 className="rounded-circle"/>
                                                            <textarea id="shareComment" maxLength="140"
                                                                      className="form-control"
                                                                      placeholder="Yanıtını Tweetle" onChange={this.formChange}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button"
                                                            disabled={this.state.disabled} onClick={this.makeComment} id="makeCommentButton" className="btn btn-primary">Yanıtla
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <span id={'comment' + item.tweetId}>{item.commentCount}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="retweet" id={'retweet' + item.tweetId}>
                                    <img
                                        src={retweet ? retweetIcon : unretweetIcon} onClick={this.retweet}/>
                                    <span>{item.rtCount}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="like" id={'like' + item.tweetId}>
                                    <img
                                        src={like ? dislikeIcon : likeIcon} onClick={this.like}/>
                                    <span>{item.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tweet