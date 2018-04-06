import React, {Component} from 'react';
import './App.css';
import Login from "./common/Login/Login";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthManager from "./common/data/AuthManager";
import PageNotFound from "./common/components/Base/Errors/PageNotfound";
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import CustomTheme, {THEME_CONST} from "./common/components/Theme/CustomTheme";

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
    constructor(props) {
        super(props);
        this.state = {
            themeIndex: 0,
        };
    }

    componentWillMount() {
        const storedThemeIndex = localStorage.getItem(THEME_CONST.LOCAL_STORAGE_THEME_INDEX);
        if (storedThemeIndex) {
            this.setState({themeIndex: parseInt(storedThemeIndex, 10)});
        }
    }

    componentDidMount() {
        this.user = AuthManager.getUser();
        const module_path = (this.user.type === App.CONST.ADMIN_USER) ?
            App.CONST.ADMIN_COMPONENT_PATH : App.CONST.CLIENT_COMPONENT_PATH;

        import(`${module_path}`).then(
            module => {
                this.setState({UserComponent: module.default});
            }
        );
    }

    setTheme() {
        let {themeIndex} = this.state;
        themeIndex = (themeIndex + 1) % 3;
        // There are 3 themes.
        localStorage.setItem(THEME_CONST.LOCAL_STORAGE_THEME_INDEX, themeIndex);
        this.setState({themeIndex});
    }

    render() {
        const {UserComponent} = this.state;

        if (this.user !== null) {
            if (!UserComponent) return null; // TODO: loading here

            if (this.user.type === App.CONST.ADMIN_USER) {
                return (
                    <MuiThemeProvider theme={themes[this.state.themeIndex]}>
                        <UserComponent setTheme={() => this.setTheme()}>
                            <Switch>
                                <Redirect exact from='/' to='/customers'/>
                                <Route component={PageNotFound}/>
                            </Switch>
                        </UserComponent>
                    </MuiThemeProvider>

                );
            } else { // Client User
                return (
                    <MuiThemeProvider theme={themes[this.state.themeIndex]}>
                        <UserComponent setTheme={() => this.setTheme()}>
                            <Switch>
                                <Redirect exact from='/' to='/consumptions'/>
                                <Route component={PageNotFound}/>
                            </Switch>
                        </UserComponent>
                    </MuiThemeProvider>

                );
            }

        }
        return <Redirect to="/login"/>;
    }
}

const themes = [];
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
});
const lightTheme = createMuiTheme({
    palette: {
        type: 'light', // Switching the dark mode on is a single property value change.
    },
});
darkTheme.palette.background.active = '#1B5E20';
darkTheme.palette.background.appBar = '#3F51B5';
lightTheme.palette.background.active = '#A5D6A9';
lightTheme.palette.background.appBar = '#A3C1FF';
lightTheme.palette.background.contentFrame = '#E3F2FD';
lightTheme.palette.text.brand = '#FFFFFF';
themes.push(darkTheme);
themes.push(lightTheme);
themes.push(createMuiTheme(CustomTheme));

App.CONST = {
    ADMIN_USER: 'admin',
    CLIENT_USER: 'client',
    ADMIN_COMPONENT_PATH: './admin/components/Home/Home',
    CLIENT_COMPONENT_PATH: './client/components/Home/Home',
};

export default App;
