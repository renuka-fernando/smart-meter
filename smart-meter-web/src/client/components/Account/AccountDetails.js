import React, {Component, Fragment} from 'react';
import DetailsCard from "../Common/DetailsCard";
import Typography from "material-ui/Typography/Typography";

class AccountDetails extends Component {
    render() {
        return (
            <Fragment>
                <Typography variant="title" gutterBottom>
                    Account Details
                </Typography>
                <DetailsCard
                    title={"AAccount: E2-001"}
                    details={[
                        {"label": "Owner", value: "Renuka Fernando"},
                        {"label": "Branch", value: "Bandaragama"},
                    ]}
                />
                <DetailsCard
                    title={"AAccount: E2-008"}
                    details={[
                        {"label": "Owner", value: "Gayan Fernando"},
                        {"label": "Branch", value: "Bandaragama"},
                    ]}
                />
            </Fragment>

        );
    }
}

export default AccountDetails;