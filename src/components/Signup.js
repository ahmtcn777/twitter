import React, {Component} from "react";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Alert from "./Alert";

class Signup extends Component {

    constructor(props){
        super(props)
        this.signup = this.signup.bind(this)
        this.state = {
            isSign:false,
            alert:false
        }
    }


    signup(e){
        e.preventDefault()
        const username = e.target.elements.username.value
        const password = e.target.elements.password.value
        const email = e.target.elements.email.value
        const firstname = e.target.elements.firstname.value
        const lastname = e.target.elements.lastname.value
        axios.post('http://localhost:9090/sign-up',{
            username,
                password,
                email,
                firstname,
                lastname
        }).then((response) => {
            this.setState(() => {
                return{
                    isSign: true
                }
            })
        }).catch((error) => {
            this.setState(() => {
                return {
                    alert:true
                }
            })
        })
    }

    render() {
        if(this.state.isSign){
            return <Redirect to="/"/>
        }
        if(this.state.alert){
            return(
                <div>
                    <div className="vh-100 row align-items-center security-content">
                        <div className="offset-md-4 col-md-4 login">
                            <form onSubmit={this.signup}>
                                <div className="col-md-12">
                                    <h3>Hesabını oluştur</h3>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="firstname"
                                               placeholder="Adınız"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="lastname"
                                               placeholder="Soyadınız"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username"
                                               placeholder="Kullanıcı Adı"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email"
                                               placeholder="E-posta"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Şifre"
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Kayıt ol
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {
                                <Alert alert="Bu kullanıcı zaten kayıtlı." />
                            }
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="vh-100 row align-items-center security-content">
                    <div className="offset-md-4 col-md-4 login">
                        <form onSubmit={this.signup}>
                            <div className="col-md-12">
                                <h3>Hesabını oluştur</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="firstname"
                                           placeholder="Adınız"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="lastname"
                                           placeholder="Soyadınız"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username"
                                           placeholder="Kullanıcı Adı"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email"
                                           placeholder="E-posta"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Şifre"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        Kayıt ol
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Signup