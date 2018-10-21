import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "material-ui";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MoneySharpIcon from "@material-ui/icons/MoneySharp";
import List from "material-ui/List/List";

const NavigationBar = (
    <Fragment>
        <List component='nav'>
            <Link to='/dashboard'>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Dashboard'/>
                </ListItem>
            </Link>
            <Link to='/expenditure'>
                <ListItem button>
                    <ListItemIcon>
                        <MoneySharpIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Expenditure'/>
                </ListItem>
            </Link>
        </List>
    </Fragment>
);

export default NavigationBar;