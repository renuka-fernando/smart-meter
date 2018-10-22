import {Component, Fragment} from "react";
import CustomerTable from "./CustomerTable";
import React from "react";
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton/IconButton";

class Listing extends Component {
    render() {
        return (
            <Fragment>
                <IconButton aria-label="Add" color={'Primary'}>
                    <PersonAdd/>
                </IconButton>
                <CustomerTable/>
            </Fragment>
        )
    }
}

export default Listing;