import React, {Component, Fragment} from 'react';
import DetailsCard from "../Common/DetailsCard";
import Typography from "material-ui/Typography/Typography";

class MeterReadingSummary extends Component {
    render() {
        return (
            <Fragment>
                <Typography variant="title" gutterBottom>
                    Meter Reading Summary
                </Typography>
                <DetailsCard
                    title={"Account: E2-001"}
                    details={[
                        {"label": "Meter Reading", value: 17856.5},
                        {"label": "Balance (Rs.)", value: 123.21},
                    ]}
                />
                <DetailsCard
                    title={"Account: E2-008"}
                    details={[
                        {"label": "Meter Reading", value: 1856.5},
                        {"label": "Balance (Rs.)", value: 223.21},
                    ]}
                />
            </Fragment>
        );
    }
}

export default MeterReadingSummary;