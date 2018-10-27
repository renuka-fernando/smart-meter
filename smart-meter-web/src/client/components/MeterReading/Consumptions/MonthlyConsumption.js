import React, {Component} from "react";
import ChartUtils from "../../../../common/data/ChartUtils";

import Axios from 'axios';
import Consumptions from "./Consumptions";

class MonthlyConsumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consumptions: [],
            accounts: [],
        };

        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    componentDidMount() {
        const customerUUID = 1;

        // TODO: temp url
        Axios.get(`http://localhost:8090/customers/${customerUUID}`).then(customer => {
            let consumptions = [];
            let accounts = [];
            customer.data.accounts.forEach(account => {
                Axios.get(`http://localhost:8092/reads/monthly?accountIdList=${account.id}`).then(readings => {
                    consumptions.push(readings.data);
                    accounts.push(account);
                    this.setState({consumptions, accounts});
                }).catch(e => {
                    console.error("Error while reading meter-readings:\n" + e);
                    this.setState({connectionError: true, errorMessage: "Connection Error!"})
                })
            });
        }).catch(e => {
            console.error("Error while reading customer list:\n" + e);
            this.setState({connectionError: true, errorMessage: "Connection Error!"})
        });
    }

    handleMessageClose() {
        this.setState({connectionError: false});
    }

    static generateChartConfigs(consumption, chart_id) {
        if (!consumption) return;

        const category = consumption[0].readings.map(reading => `${reading.month}`);
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
                    chartConfigs={MonthlyConsumption.generateChartConfigs(consumption, `monthly_consumption_${index}`)}
                    connectionError={connectionError}
                    errorMessage={errorMessage}
                    title={`Account No: ${accounts[index].accountNo}`}
                    key={index}
                />
            )
        );
    }
}

export default MonthlyConsumption;