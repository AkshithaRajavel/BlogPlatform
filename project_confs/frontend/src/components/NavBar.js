import React,{Component} from 'react';
import NavElement from './NavElement';

export default class NavBar extends Component{
    constructor(props){
        super(props);
    }
    repeat(name,link){
        var elements=[];
        for(var i in name){
            elements.push(<NavElement name={name[i]} link={link[i]}/>)
        }
        return elements;
    }
    render(){
        return(
            <nav class="navbar sticky-top navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src="https://img.freepik.com/free-icon/blogging_318-883240.jpg" width="30" height="30" class="d-inline-block align-top" alt="" />BlogWebsite
                    </a>
                    <ul class="nav">
                        {this.repeat(this.props.name,this.props.link)}
                    </ul>
            </nav>
        )
    }
}