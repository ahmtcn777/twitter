import React from 'react'

class Time extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            time:  timeDifference(props.current, props.previous)
        }
    }

    render()
    {
        return(
            <span>· {this.state.time}</span>
        )
    }
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' saniye önce';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' dakika önce';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' saat önce';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' gün önce';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' ay önce';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' yıl önce';
    }
}

export default Time