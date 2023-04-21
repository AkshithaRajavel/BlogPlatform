import React, {Component} from "react";

export default class Error extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <br/><br/>
            <div class="alert alert-danger" role="alert">
                {this.props.message}
            </div>
            <br/><br/>
            </div>
        )
    }
}