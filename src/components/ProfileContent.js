import React, {Component} from "react"
import ContentHeader from './ContentHeader'
import ContentProfileHeader from './ContentProfileHeader'
import ProfileTweets from './ProfileTweets'
import axios from 'axios'

class ProfileContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:null,
            isOwner:false,
            isFollowing:false
        }
    }
    componentDidMount() {
        const authUsername = localStorage.getItem("username")
        axios.get('http://localhost:9090/user/userinfo/' + this.props.username, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((response) => {
                const user =  response.data
                if(user.username === authUsername){
                    this.setState(() => {
                        return({
                            isOwner:true
                        })
                    })
                }
                this.setState({user})
                axios.get('http://localhost:9090/follow/'+authUsername+"/"+user.username,{
                    headers:{
                        'Authorization': localStorage.getItem("token")
                    }
                })
                    .then((response) => {
                        if(response.data){
                            this.setState(() => {
                                return({
                                    isFollowing: true
                                })
                            })
                        }
                    })
            }).catch((error) => {

        })
    }
    render() {

        return (

            <div className="wrapper profile-layout col-md-5">
                {this.state.user !== null ?

                    <div>
                        <ContentHeader name={this.state.user.firstName+" "+this.state.user.lastName} tweetCount={this.state.user.tweetCount}/>
                        <ContentProfileHeader firstLastName={this.state.user.firstName+" "+this.state.user.lastName}
                                              username={this.state.user.username}
                                              followers={this.state.user.followers}
                                              followings={this.state.user.followings}
                                              isOwner={this.state.isOwner}
                                              isFollowing={this.state.isFollowing}
                        />
                        <ProfileTweets username={this.props.username}/>
                    </div>
                      : ""
                }
            </div>
        )
    }
}

export default ProfileContent