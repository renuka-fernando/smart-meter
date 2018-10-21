import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Listing from "./Listing";
import Details from "./Details";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";

export default class Branches extends Component {
    render() {
        return(
            <Switch>
                <Route exact path='/branches' component={Listing} />
                <Route path='/branches/:id/' render={props => <Details {...props} />} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }
}