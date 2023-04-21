
import React,{Component} from "react";
import ReactMarkdown from 'react-markdown';
import NavBar from "./NavBar";
export default class ViewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            author:"",
            timestamp:"",
            description:"",
            markdown:""
        };
        const post_id = document.location.pathname;
        fetch(`/api${post_id}`)
        .then((response)=>response.json())
        .then((data)=>this.post(data))
    }
    post=(response)=>{
        var d = response[0].fields;
        this.setState({
            title:d.title,
            author:d.author,
            description:d.description,
            markdown:d.markdown,
            timestamp:d.timestamp});
    }
    render(){
        return(
            <div>
                <NavBar />
                <h1>{this.state.title}</h1>
                <h6 class="text-muted">Author :{this.state.author}</h6>
                <p class="text-muted">created on : {this.state.timestamp}</p>
                <h6>Description:</h6>
                <p>{this.state.description}</p>
                <hr />
                <ReactMarkdown>
                    {this.state.markdown}
                </ReactMarkdown>
            </div>
        )
    }
}