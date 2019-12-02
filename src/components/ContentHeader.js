import React,{Component} from "react"
import Tweet from "./Tweet";

export default (props) => {
    const {name} = props
    const {tweetCount} = props
    return(
        <div className="row">
            <div className="col-md-12 header">
                <div className="col-md-12">
                    <div className="page-title">
                        <h4>{name}</h4>
                    </div>
                    <div className="tweet-count">
                        {
                            tweetCount != null ?
                                tweetCount + "Tweet"
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}