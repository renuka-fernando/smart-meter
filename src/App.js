import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login/Login";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthManager from "./data/AuthManager";

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
            return <div>This is a protected content</div>;
        }
        return <Redirect to="/login"/>;
    }
}

export default App;
