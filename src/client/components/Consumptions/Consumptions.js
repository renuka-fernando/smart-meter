import React, {Component} from "react";
import {Grid} from "material-ui";

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

export default class Consumptions extends Component {
    render() {
        Charts(FusionCharts);

        const dataSource = {
            chart: {
                "caption": "Actual Revenues, Targeted Revenues & Profits",
                "subcaption": "Last year",
                "xaxisname": "Month",
                "yaxisname": "Amount (In USD)",
                "numbersuffix": " LKR",
                "theme": "ocean"
            },
            "categories": [
                {
                    "category": [
                        {
                            "label": "Jan"
                        },
                        {
                            "label": "Feb"
                        },
                        {
                            "label": "Mar"
                        },
                        {
                            "label": "Apr"
                        },
                        {
                            "label": "May"
                        },
                        {
                            "label": "Jun"
                        },
                        {
                            "label": "Jul"
                        },
                        {
                            "label": "Aug"
                        },
                        {
                            "label": "Sep"
                        },
                        {
                            "label": "Oct"
                        },
                        {
                            "label": "Nov"
                        },
                        {
                            "label": "Dec"
                        }
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Actual Revenue",
                    "data": [
                        {
                            "value": "16000"
                        },
                        {
                            "value": "20000"
                        },
                        {
                            "value": "18000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "15000"
                        },
                        {
                            "value": "21000"
                        },
                        {
                            "value": "16000"
                        },
                        {
                            "value": "20000"
                        },
                        {
                            "value": "17000"
                        },
                        {
                            "value": "25000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "23000"
                        }
                    ]
                },
                {
                    "seriesname": "Projected Revenue",
                    "renderas": "line",
                    "showvalues": "0",
                    "data": [
                        {
                            "value": "15000"
                        },
                        {
                            "value": "16000"
                        },
                        {
                            "value": "17000"
                        },
                        {
                            "value": "18000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "19000"
                        },
                        {
                            "value": "20000"
                        },
                        {
                            "value": "21000"
                        },
                        {
                            "value": "22000"
                        },
                        {
                            "value": "23000"
                        }
                    ]
                },
                {
                    "seriesname": "Profit",
                    "renderas": "area",
                    "showvalues": "0",
                    "data": [
                        {
                            "value": "4000"
                        },
                        {
                            "value": "5000"
                        },
                        {
                            "value": "3000"
                        },
                        {
                            "value": "4000"
                        },
                        {
                            "value": "1000"
                        },
                        {
                            "value": "7000"
                        },
                        {
                            "value": "1000"
                        },
                        {
                            "value": "4000"
                        },
                        {
                            "value": "1000"
                        },
                        {
                            "value": "8000"
                        },
                        {
                            "value": "2000"
                        },
                        {
                            "value": "7000"
                        }
                    ]
                }
            ]
        };
        const chartConfigs = {
            id: "multi_chart",
            type: "mscombi2d",
            width: "100%",
            height: 400,
            dataFormat: "json",
            dataSource
        };

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>Consumptions</Grid>
                <Grid item xs={12}>
                    <ReactFC {...chartConfigs} />
                </Grid>
            </Grid>
        );
    }
}