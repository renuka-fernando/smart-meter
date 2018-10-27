import React, {Component} from "react";
import Grid from "material-ui/Grid/Grid";
import Typography from "material-ui/Typography/Typography";
import Axios from "axios";
import {IconButton, Snackbar} from "material-ui";
import CloseIcon from "material-ui/SvgIcon/SvgIcon";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        const {customerUUID} = this.props;

        // TODO: temp url
        Axios.get(`http://localhost:8090/customers/${customerUUID}`).then(customer => {
            this.setState({
                customer: customer.data
            });
        }).catch(e => {
            console.error("Error while reading customer list:\n" + e);
            this.setState({connectionError: true, errorMessage: "Connection Error!"})
        })
    }

    render() {
        const {customer} = this.state;
        const {connectionError, errorMessage} = this.props;

        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography variant="headline" gutterBottom>
                        {`${customer.fname} ${customer.lname}`}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        {`Email: ${customer.email}`}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        {`Contact No: ${customer.contactNo}`}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        {`Address: ${customer.address_line1}, ${customer.address_line2}, ${customer.city}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={connectionError}
                    onClose={this.handleMessageClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{errorMessage}</span>}
                    action={[
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
            </Grid>
        );
    }
}

export default Details;