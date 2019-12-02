import React, {Component} from "react";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import jwt from 'jwt-decode'
import Alert from "./Alert";

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.state = {
            loggedIn: false,
            alert:false
        }
        if (localStorage.getItem("token") != null) {
            const token = jwt(localStorage.getItem("token"))
            if (new Date() > token.exp) {
                this.state = {
                    loggedIn: true
                }
            }
        }
    }


    login(e) {
        e.preventDefault()
        const username = e.target.elements.username.value
        const password = e.target.elements.password.value
        axios.post('http://localhost:9090/login', {
            username, password
        }).then((response) => {
            localStorage.setItem("token", response.headers.authorization)
            localStorage.setItem("username",username)
            this.setState(() => {
                return {
                    loggedIn: true
                }
            })
            return <Redirect to="/home"/>
        }).catch((error) => {
            this.setState(() => {
                return {
                    alert:true
                }
            })
        })
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/home"/>
        }
        if(this.state.alert){
            return (
                <div>
                    <div className="vh-100 row align-items-center security-content">
                        <div className="offset-md-4 col-md-4 login">
                            <form onSubmit={this.login}>
                                <div className="col-md-12">
                                    <h3>Twitter'a giriş yap</h3>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username"
                                               placeholder="Kullanıcı Adı"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Şifre"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Giriş yap
                                        </button>
                                        <a href="#" className="areYouNew">
                                            Şifreni mi unuttun?
                                        </a>
                                    </div>
                                </div>
                            </form>
                            {
                                <Alert alert="Kullanıcı adınızı ve şifrenizi kontrol ediniz." />
                            }
                            <div className="col-md-12 areYouNew">
                                <label>Twitter'da yeni misin?</label>
                                <a href="/signup">Hemen kaydol</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="vh-100 row align-items-center security-content">
                    <div className="offset-md-4 col-md-4 login">
                        <form onSubmit={this.login}>
                            <div className="col-md-12">
                                <h3>Twitter'a giriş yap</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username"
                                           placeholder="Kullanıcı Adı"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Şifre"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        Giriş yap
                                    </button>
                                    <a href="#" className="areYouNew">
                                        Şifreni mi unuttun?
                                    </a>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12 areYouNew">
                            <label>Twitter'da yeni misin?</label>
                            <a href="/signup">Hemen kaydol</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login