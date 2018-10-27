import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Listing from "./Listing";
import DetailsTab from "./Details/DetailsTab";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";

export default class Customer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/customers' component={Listing}/>
                <Route path='/customers/:customerUUID/' render={props => <DetailsTab {...props} />}/>
                <Route component={PageNotFound}/>
            </Switch>
        );
    }
}