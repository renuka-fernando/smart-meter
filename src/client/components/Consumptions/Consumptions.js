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

export default class Consumptions extends Component {
    render() {
        const {consumption, title, chartConfigs, connectionError, errorMessage} = this.props;
        Charts(FusionCharts);

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="title" gutterBottom>{title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {!consumption ?
                                <Typography variant="body2" gutterBottom>Loading...</Typography> :
                                consumption.length === 0 ?
                                    <Typography variant="body2" gutterBottom>No Consumption Data</Typography> :
                                    <Paper elevation={4}>
                                        <ReactFC {...chartConfigs} />
                                    </Paper>
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={connectionError}
                        onClose={this.handleMessageClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{errorMessage}</span>}
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