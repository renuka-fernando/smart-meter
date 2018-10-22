import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Listing from "./Listing";
import Details from "./Details";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";

export default class Customer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/customers' component={Listing}/>
                <Route path='/customers/:id/' render={props => <Details {...props} />}/>
                <Route component={PageNotFound}/>
            </Switch>
        );
    }
}