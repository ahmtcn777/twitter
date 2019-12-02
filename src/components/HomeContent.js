import React, {Component} from "react"
import axios from 'axios'
import ReactDOM from 'react-dom'
import HomeTweets from "./HomeTweets";
import Tweet from './Tweet'
import userIcon from '../images/icon_user.png'

class HomeContent extends Component {
    constructor(props) {
        super(props)
        this.sendTweet = this.sendTweet.bind(this)
    }
    sendTweet(){
        var content = document.getElementById("shareTweetTextbox").value
        var username = localStorage.getItem("username")
        axios.post('http://localhost:9090',
            {
                username: username,
                content: content
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
        ).then((data) => {
            document.getElementById("shareTweetTextbox").value = ""
            var subDiv = document.createElement("div")
            subDiv.id = data.data.tweetId
            var newTweetDiv = document.getElementById("newTweet")
            newTweetDiv.prepend(subDiv)
            ReactDOM.render(<Tweet
                item = {data.data}/>, document.getElementById(data.data.tweetId))
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const username = localStorage.getItem("username")
        return (
            <div className="wrapper home-layout col-md-5">
                <div className="row">
                    <div className="col-md-12 home-header">
                        <div className="col-md-12">
                            <div className="page-title">
                                <h2>Anasayfa</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12 form-content tweet-form d-flex align-items-center">
                                <img src={userIcon} className="rounded-circle img-fluid"/>
                                <textarea id="shareTweetTextbox" maxLength="140" className="form-control"
                                          placeholder="Neler oluyor?"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 sendTweet">
                                <button type="submit" id="shareTweetButton" className="btn btn-primary" onClick={this.sendTweet}>Tweetle</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ayrac">
                </div>
                <div id="newTweet">

                </div>
                <div className="tweets" id="tweets">
                    <HomeTweets username={username}/>
                </div>
            </div>
        );
    }
}

export default HomeContent