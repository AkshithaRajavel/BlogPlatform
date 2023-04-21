import React,{Component} from "react";

export default class FormFields extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div class="form-group">
    <label for="exampleInputPassword1">{this.props.name}</label>
    <input type={this.props.type} class="form-control" name={this.props.name.toLowerCase().replace(' ','-')} required/>
  </div>
        );
    }
}