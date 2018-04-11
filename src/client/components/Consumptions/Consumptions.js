import React, {Component} from "react";
import {Grid} from "material-ui";

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import ChartUtils from "../../../common/data/ChartUtils";

import Axios from 'axios';
import Utils from "../../../common/data/Utils";

export default class Consumptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.generateChartConfigs = this.generateChartConfigs.bind(this);
    }

    componentDidMount() {
        Axios.get("http://renuka-inspiron-3543:8092/reads?accountIdList=100").then(readings => {
            this.setState({
                consumption: readings.data
            });
        }).catch(e => console.error("Error while reading meter-readings:\n" + e))
    }

    generateChartConfigs() {
        const {consumption} = this.state;
        let category, values;

        category = consumption.map(reading => {
            let date = new Date(reading.timestamp);
            return Utils.getNearestQuarter(date.getHours(), date.getMinutes())
        });
        values = consumption.map(reading => reading.reading);

        const dataSource = {
            "chart": {
                "caption": "Actual Revenues, Targeted Revenues & Profits",
                "subcaption": "Last year",
                "xaxisname": "Month",
                "yaxisname": "Amount (In USD)",
                "numbersuffix": " LKR",
                "theme": "ocean"
            },
            "categories": [
                {
                    "category": ChartUtils.generateValues(category, "label")
                }
            ],
            "dataset": [
                {
                    "seriesname": "Actual Revenue",
                    "data": ChartUtils.generateValues(values, "value")
                }
            ]
        };
        return {
            id: "multi_chart",
            type: "mscombi2d",
            width: "100%",
            height: 400,
            dataFormat: "json",
            dataSource
        };
    }


    render() {
        const {consumption} = this.state;
        Charts(FusionCharts);

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>Consumptions</Grid>
                <Grid item xs={12}>
                    {consumption ?
                        <ReactFC {...this.generateChartConfigs()} /> :
                        "Loading..."
                    }
                </Grid>
            </Grid>
        );
    }
}