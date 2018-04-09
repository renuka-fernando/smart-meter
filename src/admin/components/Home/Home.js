import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Base setTheme={this.props.setTheme}>
                <Switch>
                    <Redirect exact from='/' to='/customers'/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Base>);
    }
}