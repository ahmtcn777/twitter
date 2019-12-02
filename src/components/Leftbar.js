import React,{Component} from "react";
import Logo from '../images/logo.png'
import HomeIcon from '../images/icon_home.png'
import HashIcon from '../images/icon_hash.png'
import NotificationIcon from '../images/icon_notification.png'
import MessagesIcon from '../images/icon_messages.png'
import LogoutIcon from '../images/icon_logout.png'

class Leftbar extends Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        localStorage.removeItem("token")
        this.setState((prevState) => {
            return{
                loggedIn:false
            }
        })
    }

    render() {
        const username = localStorage.getItem("username")
        return (
            <div className="offset-md-1 left-menu col-md-2">
                <div className="row">
                    <a href="/">
                        <img className="rounded-circle homeLogo"
                             src={Logo}/>
                    </a>
                </div>
                <a href="/home">
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img src={HomeIcon}/>
                                <span>Ana Sayfa</span>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img src={HashIcon}/>
                                <span>Keşfet</span>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img
                                src={NotificationIcon}/>
                                <span>Bildirimler</span>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img src={MessagesIcon}/>
                                <span>Mesajlar</span>
                        </div>
                    </div>
                </a>
                <a href={'/user/'+username}>
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img src="https://via.placeholder.com/50" className="rounded-circle"/>
                                <span>Profil</span>
                        </div>
                    </div>
                </a>
                <a href="/" onClick={this.logout}>
                    <div className="row menu">
                        <div className="menuItem d-flex">
                            <img src={LogoutIcon}/>
                                <span>Çıkış yap</span>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default Leftbar