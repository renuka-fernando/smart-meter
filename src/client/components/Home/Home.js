import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";
import DailyConsumption from "../Consumptions/DailyConsumption";
import {Typography} from "material-ui";
import MonthlyConsumption from "../Consumptions/MonthlyConsumption";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Base setTheme={this.props.setTheme}>
                <Typography variant="subheading" gutterBottom>Account No: 1</Typography>
                <DailyConsumption/>
                <MonthlyConsumption/>
                <Switch>
                    <Redirect exact from='/' to='/'/>
                    <Route path='/consumptions' component={DailyConsumption}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Base>);
    }
}