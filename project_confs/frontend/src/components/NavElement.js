import React, {Component} from "react";

export default class NavElement extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li class="nav-item">
                <a class="nav-link" href={this.props.link}>{this.props.name}</a>
            </li>
        )
    }
}