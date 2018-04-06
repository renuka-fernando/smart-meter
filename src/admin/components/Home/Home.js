import React, {Component} from 'react';
import Base from "../../../common/components/Base/Base";

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<Base setTheme={this.props.setTheme}>{this.props.children}</Base>);
    }
}