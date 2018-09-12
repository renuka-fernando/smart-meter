import React, {Component} from 'react';
import DetailsCard from "../Common/DetailsCard";

class AccountDetails extends Component {
    render() {
        return (
            <DetailsCard
                title={"Account Details"}
                details={[
                    {"label": "Account No", value: 1},
                    {"label": "Branch", value: "Bandaragama"},
                ]}
            />
        );
    }
}

export default AccountDetails;