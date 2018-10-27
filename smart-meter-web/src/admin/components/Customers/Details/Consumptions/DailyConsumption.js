import React, {Component} from "react";
import ChartUtils from "../../../../../common/data/ChartUtils";

import Axios from 'axios';
import Utils from "../../../../../common/data/Utils";
import Consumptions from "./Consumptions";

export default class DailyConsumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consumptions: [],
            accounts: [],
        };

        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentDidMount() {
        const {customerUUID} = this.props;

        // TODO: temp url and temp micro-service all replace with inter service communication
        Axios.get(`http://localhost:8090/customers/${customerUUID}`).then(customer => {
            let consumptions = [];
            customer.data.accounts.forEach(account => {
                Axios.get(`http://localhost:8092/reads?accountIdList=${account.id}`).then(readings => {
                    consumptions.push(readings.data);
                    this.setState({consumptions});
                }).catch(e => {
                    console.error("Error while reading meter-readings:\n" + e);
                    this.setState({connectionError: true, errorMessage: "Connection Error!"})
                })
            });

            this.setState({accounts: customer.data.accounts});
        }).catch(e => {
            console.error("Error while reading customer list:\n" + e);
            this.setState({connectionError: true, errorMessage: "Connection Error!"})
        })
    }

    handleMessageClose() {
        this.setState({connectionError: false});
    }

    static generateChartConfigs(consumption, chart_id) {
        if (!consumption || !consumption.length) return;

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
                "caption": "Today Consumption",
                "subcaption": "Last 24 hours",
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
            id: chart_id,
            type: "mscombi2d",
            width: "95%",
            height: 400,
            dataFormat: "json",
            dataSource
        };
    }

    render() {
        const {consumptions, accounts, connectionError, errorMessage} = this.state;

        return (
            consumptions.map((consumption, index) =>
                <Consumptions
                    consumption={consumption}
                    chartConfigs={DailyConsumption.generateChartConfigs(consumption, `daily_consumption_${index}`)}
                    connectionError={connectionError}
                    errorMessage={errorMessage}
                    title={`Account No: ${accounts[index].accountNo}`}
                    key={index}
                />
            )
        );
    }
}