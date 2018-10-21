import React, {Component} from 'react';
import DetailsCard from "../Common/DetailsCard";

class MeterReadingSummary extends Component {
    render() {
        return (
            <DetailsCard
                title={"Meter Reading Summary"}
                details={[
                    {"label": "Meter Reading", value: 17856.5},
                    {"label": "Balance (Rs.)", value: 1023.21},
                ]}
            />
        );
    }
}

export default MeterReadingSummary;