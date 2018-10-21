import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import PageNotFound from "../../../common/components/Base/Errors/PageNotfound";
import {List, ListItem, ListItemIcon, ListItemText} from "material-ui";
import {Contacts, LocationCity} from "@material-ui/icons";
import Customers from "../Customers/Customers";
import Branches from "../Branches/Branches";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navBar = (
            <List component='nav'>
                <Link to='/customers'>
                    <ListItem button>
                        <ListItemIcon>
                            <Contacts/>
                        </ListItemIcon>
                        <ListItemText primary='Customers'/>
                    </ListItem>
                </Link>
                <Link to='/branches'>
                    <ListItem button>
                        <ListItemIcon>
                            <LocationCity/>
                        </ListItemIcon>
                        <ListItemText primary='Branches'/>
                    </ListItem>
                </Link>
            </List>
        );

        return (
            <Base setTheme={this.props.setTheme} navBar={navBar}>
                <Switch>
                    <Redirect exact from='/' to='/customers'/>
                    <Route path='/customers' component={Customers}/>
                    <Route path='/branches' component={Branches}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Base>);
    }
}