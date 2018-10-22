import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableToolbar from "../../../common/components/Table/EnhancedTableToolbar";
import EnhancedTableHead from "../../../common/components/Table/EnhancedTableHead";
import TableUtils, {CONST} from "../../../common/data/TableUtils";
import Axios from 'axios';

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return {id: counter, name, calories, fat, carbs, protein};
}

const headers = [
    {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
    {id: 'fname', numeric: false, disablePadding: false, label: 'First Name'},
    {id: 'lname', numeric: false, disablePadding: false, label: 'Last Name'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'contactNo', numeric: false, disablePadding: false, label: 'Contact No'},
    {id: 'city', numeric: false, disablePadding: false, label: 'City'},
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: CONST.ASC,
            orderBy: 'calories',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
        }
    }

    componentDidMount() {
        // TODO: temp url
        Axios.get("http://localhost:8090/customers").then(customers => {
            this.setState({
                data: customers.data.content
            });
        }).catch(e => {
            console.error("Error while reading customer list:\n" + e);
            this.setState({connectionError: true, errorMessage: "Connection Error!"})
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = CONST.DESC;

        if (this.state.orderBy === property && this.state.order === CONST.DESC) {
            order = CONST.ASC;
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} title={'Clients'}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            headers={headers}
                        />
                        <TableBody>
                            {TableUtils.stableSort(data, TableUtils.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>
                                            <TableCell numeric>{n.fname}</TableCell>
                                            <TableCell numeric>{n.lname}</TableCell>
                                            <TableCell numeric>{n.email}</TableCell>
                                            <TableCell numeric>{n.contactNo}</TableCell>
                                            <TableCell numeric>{n.city}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

Listing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Listing);