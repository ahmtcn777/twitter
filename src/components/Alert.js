import React, {Component} from 'react'


export default (props) =>{
    const {alert} = props

    return (
        <div className="alert alert-danger" role="alert">
            {alert}
        </div>
    )
}