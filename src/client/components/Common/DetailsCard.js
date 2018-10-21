import React, {Component} from "react";
import Card from "material-ui/Card/Card";
import CardContent from "material-ui/Card/CardContent";
import Typography from "material-ui/Typography/Typography";
import CardActions from "material-ui/Card/CardActions";
import Button from "material-ui/Button/Button";
import PropTypes from 'prop-types';

class DetailsCard extends Component {
    render() {
        const {title, details} = this.props;

        return (
            <Card>
                <CardContent>
                    <Typography variant="subheading" component="h2" gutterBottom>
                        {title}
                    </Typography>
                    {
                        details && details.map(detail =>
                            <Typography component="p" color="textSecondary">
                                {detail.label}: {detail.value}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button size={"small"}>MORE</Button>
                </CardActions>
            </Card>
        );
    }
}

DetailsCard.propTypes = {
    title: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    })),
};

export default DetailsCard;