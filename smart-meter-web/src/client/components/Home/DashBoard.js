import React, {Component, Fragment} from "react";
import Grid from "material-ui/Grid/Grid";
import AccountDetails from "../Account/AccountDetails";
import MeterReadingSummary from "../MeterReading/MeterReadingSummary";
import DailyConsumption from "../MeterReading/Consumptions/DailyConsumption";
import MonthlyConsumption from "../MeterReading/Consumptions/MonthlyConsumption";

class DashBoard extends Component {
    render() {
        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={12} lg={3}>
                        <AccountDetails/>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <MeterReadingSummary/>
                    </Grid>
                </Grid>
                <br/>
                <DailyConsumption/>
                <MonthlyConsumption/>
            </Fragment>
        )
    }
}

export default DashBoard;