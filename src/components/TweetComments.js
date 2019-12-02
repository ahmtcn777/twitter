import React from 'react'
import axios from 'axios'
import Tweet from './Tweet'

class TweetComments extends React.Component {
    constructor() {
        super()

        this.state = {
            allComments: []
        }
    }

    componentDidMount() {
        const tweetId = this.props.tweetId;
        const url = "http://localhost:9090/comment/" + tweetId

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
                        allComments: [...prevState.allComments, element]
                    }
                })
            });

        })

    }

    render() {
        const allComments = this.state.allComments
        return (
            allComments.map((item, index) => {
                return (
                    <Tweet
                        key={index}
                        item={item}
                        userName={this.props.username}
                    />

                )
            })

        )
    }
}

export default TweetComments