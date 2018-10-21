import React, {Component} from "react";
import AuthManager from "../data/AuthManager";

export default class ScopeValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {resourcePath, resourceMethod} = this.props;
        const hasScope = AuthManager.hasScopes(resourcePath, resourceMethod);
        hasScope.then((haveScope) => {
            this.setState({haveScope});
        });
    }

    render() {
        const {children} = this.props;
        if (this.state.haveScope) {
            return children || null;
        }
        return null;
    }
}