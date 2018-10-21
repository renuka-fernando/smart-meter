import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";
import DailyConsumption from "../MeterReading/Consumptions/DailyConsumption";
import DashBoard from "./DashBoard";
import List from "material-ui/List/List";
import {ListItem, ListItemIcon, ListItemText} from "material-ui";
import NavigationBar from "./Navigation/NavigationBar";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Base setTheme={this.props.setTheme} navigationBar={NavigationBar}>
                <Switch>
                    <Redirect exact from='/' to='/dashboard'/>
                    <Route path='/dashboard' component={DashBoard}/>
                    <Route path='/consumptions' component={DailyConsumption}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Base>);
    }
}