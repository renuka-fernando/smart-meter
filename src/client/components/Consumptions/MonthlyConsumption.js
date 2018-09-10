import React, {Component} from "react";
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    Typography
} from "material-ui";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from 'material-ui-icons/Close';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import ChartUtils from "../../../common/data/ChartUtils";

import Axios from 'axios';
import Utils from "../../../common/data/Utils";

class MonthlyConsumption extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.generateChartConfigs = this.generateChartConfigs.bind(this);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentDidMount() {
        // TODO: temp url
        Axios.get("http://localhost:8092/reads/monthly?accountIdList=1").then(readings => {
            this.setState({
                consumption: readings.data
            });
        }).catch(e => {
            console.error("Error while reading meter-readings:\n" + e);
            this.setState({connectionError: true, errorMessage: "Connection Error!"})
        })
    }

    generateChartConfigs() {
        let {consumption} = this.state;

        const category = consumption[0].readings.map(reading => reading.month);
        const values = consumption[0].readings.map(reading => reading.value);

        const dataSource = {
            "chart": {
                "caption": "Monthly Consumption",
                "subcaption": "Last 12 Months",
                "xaxisname": "Month",
                "yaxisname": "Amount (In kW/h)",
                "theme": "ocean"
            },
            "categories": [
                {
                    "category": ChartUtils.generateValuesFromArray(category, "label")
                }
            ],
            "dataset": [
                {
                    "seriesname": "Monthly Consumption",
                    "data": ChartUtils.generateValuesFromArray(values, "value")
                }
            ]
        };
        return {
            id: "monthly_consumptino",
            type: "mscombi2d",
            width: "95%",
            height: 400,
            dataFormat: "json",
            dataSource
        };
    }

    handleMessageClose() {
        this.setState({connectionError: false});
    }

    render() {
        const {consumption} = this.state;
        Charts(FusionCharts);

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="title" gutterBottom>Monthly Consumptions</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {!consumption ?
                                <Typography variant="body2" gutterBottom>Loading...</Typography> :
                                consumption.length === 0 ?
                                    <Typography variant="body2" gutterBottom>No Consumption Data</Typography> :
                                    <Paper elevation={4}>
                                        <ReactFC {...this.generateChartConfigs()} />
                                    </Paper>
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.connectionError}
                        onClose={this.handleMessageClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.errorMessage}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleMessageClose}
                            >
                                <CloseIcon/>
                            </IconButton>,
                        ]}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default MonthlyConsumption;