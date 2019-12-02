import React, {Component} from "react";
import axios from 'axios'
import Leftbar from "./Leftbar";
import ContentHeader from "./ContentHeader";
import Tweet from "./Tweet";
import TweetComments from "./TweetComments";

class Status extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9090/status/' + this.props.match.params.tweetId, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState(() => {
                    return ({
                        tweet: response.data
                    })
                })
            }
        })
    }

    render() {
        const tweet = this.state.tweet
        return (
            tweet != null &&
            <div className="row">
                <Leftbar/>
                <div className="wrapper profile-layout col-md-6">
                    <div className="row">
                        <div className="col-md-12 home-header">
                            <div className="col-md-12">
                                <div className="page-title">
                                    <h2>Tweetle</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Tweet item={tweet}/>
                        </div>
                    </div>
                    <TweetComments
                        tweetId={tweet.tweetId} />
                </div>
            </div>
        )
    }
}

export default Status