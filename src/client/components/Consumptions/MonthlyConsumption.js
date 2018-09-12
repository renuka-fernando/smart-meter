import React, {Component} from "react";
import ChartUtils from "../../../common/data/ChartUtils";

import Axios from 'axios';
import Consumptions from "./Consumptions";

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
        if (!consumption) return;

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
        return (
            <Consumptions
                consumption={this.state.consumption}
                chartConfigs={this.generateChartConfigs()}
                connectionError={this.state.connectionError}
                errorMessage={this.state.errorMessage}
                title={"Monthly Consumptions"}
            />
        );
    }
}

export default MonthlyConsumption;