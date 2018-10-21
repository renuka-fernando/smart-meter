import {Component} from "react";
import React from "react";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    constructor(props) {
        super(props);
        // TODO: logoutSuccess default false and should be handled
        this.state = {
            logoutSuccess: true,
            referrer: "/login"
        }
    }

    render() {
        return this.state.logoutSuccess && <Redirect to={this.state.referrer}/>
    }
}

export default Logout;