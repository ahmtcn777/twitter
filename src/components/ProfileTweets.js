import React, {Component} from "react"
import axios from 'axios'
import Tweet from './Tweet'

class ProfileTweets extends Component {
    constructor(props) {
        super(props)
        const {username} = props
        this.state = {
            allTweets: []
        }
    }

    componentDidMount() {
        const username = this.props.username
        var url = "http://localhost:9090/profile/" + username
        axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
        ).then((data) => {
            data.data.forEach(element => {
                this.setState((prevState) => {
                    return {
                        allTweets: [...prevState.allTweets, element]
                    }
                })
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const allTweets = this.state.allTweets
        return (
            allTweets.length > 0 &&
            <div>
                <div className="row tabs">
                    <button className="col-md-3 tab">Tweetler</button>
                    <button className="col-md-3 tab">Tweetler ve yanıtlar</button>
                    <button className="col-md-3 tab">Medya</button>
                    <button className="col-md-3 tab">Beğeni</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {

                            allTweets.map((item, index) => {
                                return (
                                    <Tweet key={index} index={index} item={item}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default ProfileTweets