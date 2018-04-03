import React, {Component} from 'react';
import {Button, FormControl, Grid, IconButton, Paper, Snackbar, TextField, Typography} from "material-ui";
import CloseIcon from 'material-ui-icons/Close';
import AuthManager from "../data/AuthManager";

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageOpen: false,
        };
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    handleMessageClose() {
        this.setState({messageOpen: false});
    }

    handleInputChange = (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({validate: true});
        const {username, password} = this.state;

        if (!username || !password) {
            this.setState({messageOpen: true});
            this.setState({message: 'Please fill both username and password fields'});
            return;
        }

        const loginPromise = AuthManager.authenticateUser(username, password);
        loginPromise.then((response) => {
            this.setState({isLogin: AuthManager.getUser()});
        }).catch((error) => {
            this.setState({message: error.message});
            this.setState({messageOpen: true});
            console.log(error);
        });
    };

    render() {
        return (
            <div className='login-flex-container'>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.messageOpen}
                    autoHideDuration={3000}
                    onClose={this.handleMessageClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleMessageClose}>
                            UNDO
                        </Button>,
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


                <Grid container justify='center' alignItems='center' spacing={0} style={{height: '100vh'}}>
                    <Grid item lg={6} md={8} xs={10}>
                        <Grid container>
                            {/* Brand */}
                            <Grid item sm={3} xs={12}>
                                <Grid container direction='column'>
                                    <Grid item>
                                        <img
                                            className='logo'
                                            src='./logo.png'
                                            alt='smart-meter-logo'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography type='subheading' align='right' gutterBottom className='brand-name'>
                                            SMART METER
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Login Form */}
                            <Grid item sm={9} xs={12}>
                                <div className='login-main-content'>
                                    <Paper elevation={1} square className='login-paper'>
                                        <form onSubmit={this.handleSubmit} className='login-form'>
                                            <Typography type='body1' gutterBottom>
                                                Sign in to your account
                                            </Typography>


                                            <FormControl style={{width: '100%'}}>
                                                <TextField
                                                    error={!this.state.username && this.state.validate}
                                                    id='username'
                                                    label='Username'
                                                    type='text'
                                                    autoComplete='username'
                                                    margin='normal'
                                                    style={{width: '100%'}}
                                                    onChange={this.handleInputChange}
                                                />
                                                <TextField
                                                    error={!this.state.password && this.state.validate}
                                                    id='password'
                                                    label='Password'
                                                    type='password'
                                                    autoComplete='current-password'
                                                    margin='normal'
                                                    style={{width: '100%'}}
                                                    onChange={this.handleInputChange}
                                                />
                                            </FormControl>

                                            {/* Buttons */}
                                            <Button
                                                type='submit'
                                                variant='raised'
                                                color='primary'
                                                className='login-form-submit'
                                            >
                                                Login
                                            </Button>
                                        </form>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;