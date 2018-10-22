import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    {id: 'id', numeric: false, disablePadding: false, label: 'ID'},
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

class CustomerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: CONST.ASC,
            orderBy: 'calories',
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

    handleClick = (event, id) => {

    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar title={'Clients'}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            headers={headers}
                        />
                        <TableBody>
                            {TableUtils.stableSort(data, TableUtils.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={n.id}
                                        >
                                            <TableCell component="th" scope="row" padding="default">
                                                {n.id}
                                            </TableCell>
                                            <TableCell>{n.fname}</TableCell>
                                            <TableCell>{n.lname}</TableCell>
                                            <TableCell>{n.email}</TableCell>
                                            <TableCell>{n.contactNo}</TableCell>
                                            <TableCell>{n.city}</TableCell>
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

CustomerTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerTable);