import React, {Component} from 'react';
import './App.css';
import Login from "./common/Login/Login";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthManager from "./common/data/AuthManager";
import PageNotFound from "./common/components/Base/Errors/PageNotfound";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route component={Protected}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

class Protected extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.user = AuthManager.getUser();
        const module_path = (this.user.type === App.CONST.ADMIN_USER) ?
            App.CONST.ADMIN_COMPONENT_PATH : App.CONST.Client_COMPONENT_PATH;

        import(`${module_path}`).then(
            module => {
                this.setState({UserComponent: module.default});
            }
        );
    }

    render() {
        const {UserComponent} = this.state;

        if (this.user !== null) {
            if (!UserComponent) return null; // TODO: loading here
            return (
                <UserComponent>
                    <Switch>
                        <Redirect exact from='/' to='/apis'/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </UserComponent>
            );
        }
        return <Redirect to="/login"/>;
    }
}

App.CONST = {
    ADMIN_USER: 'admin',
    CLIENT_USER: 'client',
    ADMIN_COMPONENT_PATH: './common/components/Base/Base',
    Client_COMPONENT_PATH: './common/components/Base/Base',
};

export default App;
