import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login/Login";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthManager from "./data/AuthManager";
import Base from "./components/Base/Base";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route component={Protected} />
                </Switch>
            </BrowserRouter>
        );
    }
}

class Protected extends Component{
    render(){
        if(AuthManager.getUser()){
            return (
                <Base>
                    <Switch>
                        <Redirect exact from='/' to='/apis' />
                    </Switch>
                </Base>
            );
        }
        return <Redirect to="/login"/>;
    }
}

export default App;
