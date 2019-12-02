import React, {Component} from "react";
import {searchIcon} from '../images/icon_search.png';
import axios from 'axios'
import RecommendFollow from './RecommendFollow.js'

class Rightbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recommendFollow: []
        }
        this.follow = this.follow.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem("username")
        axios.get('http://localhost:9090/user/recommend/' + username, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }).then((response) => {
            this.setState(() => {
                return ({
                    recommendFollow: response.data
                })
            })
        })
    }

    search(e) {
        if (e.target.value.length > 0) {
            const text = e.target.value
            var div = document.getElementById("ex1-listbox")
            var urlSearch = "http://localhost:9090/user/search/" + text
            axios.get(urlSearch,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("token")
                    }
                }
            ).then((data) => {
                var ul = document.getElementById("ex1-listbox")
                ul.innerHTML = ""
                if (data.data.length > 0) {
                    div.style = "visibility:visible"
                } else {
                    div.style = "visibility:invisible"
                }
                data.data.forEach(element => {
                    var li = document.createElement('li')
                    var href = "http://localhost:8080/profile/" + element.username
                    li.innerHTML = "<div class=\"row\">\n" +
                        "                <div class=\"col-md-2\">\n" +
                        "                    <img class=\"pictureResult\" src=\"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png\" />\n" +
                        "                </div>\n" +
                        "                <div class=\"col-md-10\">\n" +
                        "                    <a href=\"" + href + "\" class=\"resultName\">\n" +
                        "                        " + element.firstname + " " + element.lastname + "\n" +
                        "                    </a>\n" +
                        "                    <div class=\"resultUsername\">\n" +
                        "                        @" + element.username + "\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>"

                    ul.appendChild(li)

                });
            })
        } else {
            var ul = document.getElementById("ex1-listbox")
            ul.innerHTML = ""
            var div = document.getElementById("ex1-listbox")
            div.style = "visibility:hidden"
        }


    }


    follow(username){
        const authUsername = localStorage.getItem("username")
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
                            document.getElementById("username"+username).innerText = "Takip ediliyor"
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
                            document.getElementById("username"+username).innerText = "Takip et"
                        }
                    })
                }
            })
    }


    render() {
        const recommendFollows = this.state.recommendFollow
        return (
            <div className="right-menu col-md-3">
                <div className="item row">

                    <div className="combobox-wrapper col-md-12">
                        <div role="combobox" aria-expanded="false" aria-owns="ex1-listbox" aria-haspopup="listbox"
                             id="ex1-combobox">
                            <div className="row">
                                <div className="col-md-12 search">
                                    <img src={searchIcon}/>
                                    <input type="text" aria-autocomplete="list" aria-controls="ex1-listbox"
                                           name="searchText"
                                           placeholder="Twitter'da ara" id="ex1-input" className="searchBox"
                                           onChange={this.search} aria-activedescendant=""/>
                                </div>
                            </div>

                        </div>
                        <ul aria-labelledby="ex1-label" role="listbox" id="ex1-listbox" className="listbox">
                        </ul>
                    </div>
                </div>
                <div className="item row">
                    <div className="recommend">
                        <div className="row title">
                            <span>Kimi takip etmeli</span>
                        </div>
                        {
                            recommendFollows.length > 0 &&
                            recommendFollows.map((item, index) => {
                                return (
                                    <RecommendFollow key={index} index={index} item={item} follow={this.follow}/>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
        )
    }
}

export default Rightbar