import React, {Component} from "react";
import ChartUtils from "../../../common/data/ChartUtils";

import Axios from 'axios';
import Utils from "../../../common/data/Utils";
import Consumptions from "./Consumptions";

export default class DailyConsumption extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.generateChartConfigs = this.generateChartConfigs.bind(this);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentDidMount() {
        // TODO: temp url
        Axios.get("http://localhost:8092/reads?accountIdList=1").then(readings => {
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
        if (!consumption) return;

        // Filter consumptions: get only hourly reading
        consumption = consumption.filter((reading, i) => {
            let date = new Date(reading.timestamp);
            return (i % 4 === 0);
        });

        const category = consumption.map(reading => {
            let date = new Date(reading.timestamp);
            return Utils.getNearestQuarter(date.getHours(), date.getMinutes())
        });
        let values = [];
        consumption.map(reading => reading.reading).reduce((accumulator, value, i) => {
            values[i - 1] = Utils.precisionRound(value - accumulator, 4);
            return value;
        });

        const dataSource = {
            "chart": {
                "caption": "Daily Consumption",
                "subcaption": "Last Day",
                "xaxisname": "Time",
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
                    "seriesname": "Hourly Consumption",
                    "data": ChartUtils.generateValuesFromArray(values, "value")
                }
            ]
        };
        return {
            id: "daily_consumption",
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
        return (
            <Consumptions
                consumption={this.state.consumption}
                chartConfigs={this.generateChartConfigs()}
                connectionError={this.state.connectionError}
                errorMessage={this.state.errorMessage}
                title={"Daily Consumptions"}
            />
        );
    }
}