import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { Link } from 'react-router-dom';
import InboxIcon from 'material-ui-icons/Inbox';
import Games from 'material-ui-icons/Games';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Person from 'material-ui-icons/Person';
import InfoIcon from 'material-ui-icons/Info';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';

import AuthManager from '../../data/AuthManager.js';

const drawerWidth = 240;
const helpTips = [
    'By API Name [Default]',
    'By API Provider [ Syntax - provider:xxxx ] or',
    'By API Version [ Syntax - version:xxxx ] or',
    'By Context [ Syntax - context:xxxx ] or',
    'By Description [ Syntax - description:xxxx ] or',
    'By Tags [ Syntax - tags:xxxx ] or',
    'By Sub-Context [ Syntax - subcontext:xxxx ] or',
    'By Documentation Content [ Syntax - doc:xxxx ]',
];
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        zIndex: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 0,
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 8px',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    brandNameWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        textDecoration: 'none',
    },
    brandText: {
        marginRight: 10,
        fontWeight: 200,
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    siteLogo: {
        width: 45,
    },
    listItem: {
        borderBottom: 'solid 1px #ccc',
    },
    listItemText: {
        paddingRight: '30px',
        fontSize: '10px',
    },
    input: {
        margin: theme.spacing.unit,
        flex: 1,
        marginTop: 0,
        marginLeft: 30,
        marginRight: 5,
    },
    brand: {
        textDecoration: 'none',
        color: theme.palette.text.brand,
    },
});

/**
 *
 * @class Layout
 * @extends {React.Component}
 */
class Layout extends React.Component {
    state = {
        open: false,
        openPopA: false,
        openPopB: false,
        environments: [],
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleClickButton = (key) => {
        this.setState({
            [key]: true,
            // anchorEl: findDOMNode(this.button), // TODO: Remove the findDOMNode usage with proper way ~tmkb
        });
    };

    handleRequestClose = (key) => {
        this.setState({
            [key]: false,
        });
    };

    handleRequestCloseUserMenu = () => {
        this.setState({ openPopB: false });
    };

    /**
     * @inheritDoc
     * @returns {React.Component} Base Component
     * @memberof Layout
     */
    render() {
        const { classes, theme } = this.props;
        const user = AuthManager.getUser();

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link to='/'>
                                <Typography variant='title' noWrap className={classes.brand}>
                                    Smart Meter
                                </Typography>
                            </Link>
                            <Input
                                placeholder='Search Apis'
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                color='inherit'
                            />
                            <Button
                                color='inherit'
                                ref={(node) => {
                                    this.button = node;
                                }}
                                onClick={() => this.handleClickButton('openPopA')}
                            >
                                <InfoIcon />
                            </Button>
                            <Popover
                                open={this.state.openPopA}
                                anchorEl={this.state.anchorEl}
                                onClose={() => this.handleRequestClose('openPopA')}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <List dense>
                                    {helpTips.map((tip) => {
                                        return (
                                            <ListItem button key={tip}>
                                                <ListItemIcon>
                                                    <InfoIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={tip} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Popover>
                            {/* Theme menu */}
                            <IconButton
                                color='default'
                                className={classes.button}
                                aria-label='Change theme'
                                onClick={() => this.props.setTheme()}
                            >
                                <LightbulbOutline />
                            </IconButton>
                            {/* Logout button */}
                            <Button
                                color='inherit'
                                ref={(node) => {
                                    this.button = node;
                                }}
                                onClick={() => this.handleClickButton('openPopB')}
                            >
                                {user.name}
                            </Button>
                            <Popover
                                open={this.state.openPopB}
                                anchorEl={this.state.anchorEl}
                                onClose={() => this.handleRequestClose('openPopB')}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Card>
                                    <CardContent>
                                        <ListItem button className={classes.listItem}>
                                            <Avatar>
                                                <Person />
                                            </Avatar>
                                            <ListItemText
                                                secondary='Lorem ipsum dolor sit amet'
                                                primary={this.state.user}
                                            />
                                        </ListItem>
                                        <Link to='/contacts/5' className={classes.textDisplayLink}>
                                            <ListItem button className={classes.listItem}>
                                                <ListItemText
                                                    className={classes.textDisplay}
                                                    primary='Profile'
                                                    secondary='Go here'
                                                />
                                            </ListItem>
                                        </Link>
                                    </CardContent>
                                    <CardActions>
                                        <Link to='/logout'>
                                            <Button color='contrast' onClick={this.handleRequestCloseUserMenu}>
                                                Logout
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Popover>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant='permanent'
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.drawerInner}>
                            <div className={classes.drawerHeader}>
                                <Link to='/' className={classes.brandNameWrapper}>
                                    <IconButton className={classes.menuButton} color='default' aria-label='Menu'>
                                        <img
                                            className={classes.siteLogo}
                                            src='logo.png'
                                            alt='sms-logo'
                                        />
                                    </IconButton>
                                    <Typography type='title' color='inherit' className={classes.brandText}>
                                        API PUBLISHER
                                    </Typography>
                                </Link>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </div>
                            <Divider />
                            <List component='nav'>
                                <Link to='/'>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='APIs' />
                                    </ListItem>
                                </Link>
                                <Link to='/endpoints'>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Games />
                                        </ListItemIcon>
                                        <ListItemText primary='Branches' />
                                    </ListItem>
                                </Link>
                            </List>
                        </div>
                    </Drawer>
                    <main className={classes.content}>{this.props.children}</main>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
    setTheme: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);