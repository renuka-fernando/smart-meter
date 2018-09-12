import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";
import DailyConsumption from "../Consumptions/DailyConsumption";
import MonthlyConsumption from "../Consumptions/MonthlyConsumption";
import Grid from "material-ui/Grid/Grid";
import AccountDetails from "../Account/AccountDetails";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Base setTheme={this.props.setTheme}>
                <Grid container spacing={24}>
                    <Grid item xs={12} lg={3}>
                        <AccountDetails/>
                    </Grid>
                </Grid>
                <br/>
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