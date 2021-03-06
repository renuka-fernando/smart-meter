import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TrendingUp from '@material-ui/icons/TrendingUp';
import BarChart from '@material-ui/icons/BarChart';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Redirect} from "react-router-dom";
import Details from "./Details";
import DailyConsumption from "./Consumptions/DailyConsumption";
import MonthlyConsumption from "./Consumptions/MonthlyConsumption";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class DetailsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            mainPage: '',
        };
        this.customerUUID = props.match.params.customerUUID;
    }

    handleChange = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleBack = (event) => {
        this.setState({
            mainPage: '/customers'
        });
    };

    render() {
        const {classes} = this.props;
        const {mainPage, tabValue} = this.state;

        if (mainPage) return <Redirect to={mainPage}/>;

        return (
            <Fragment>
                <IconButton aria-label="Back" color={'primary'} onClick={this.handleBack}>
                    <ArrowBack/>
                </IconButton>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tabValue}
                            onChange={this.handleChange}
                            scrollable
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Client Details" icon={<PersonPinIcon/>}/>
                            <Tab label="Hourly Consumption" icon={<TrendingUp/>}/>
                            <Tab label="Monthly Consumption" icon={<BarChart/>}/>
                        </Tabs>
                    </AppBar>
                    {tabValue === 0 && <TabContainer> <Details customerUUID={this.customerUUID}/> </TabContainer>}
                    {tabValue === 1 &&
                    <TabContainer> <DailyConsumption customerUUID={this.customerUUID}/> </TabContainer>}
                    {tabValue === 2 &&
                    <TabContainer> <MonthlyConsumption customerUUID={this.customerUUID}/> </TabContainer>}
                </div>
            </Fragment>
        );
    }
}

DetailsTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailsTab);