import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";
import Consumptions from "../Consumptions/Consumptions";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Base setTheme={this.props.setTheme}>
                <Switch>
                    <Redirect exact from='/' to='/consumptions'/>
                    <Route path='/consumptions' component={Consumptions}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Base>);
    }
}