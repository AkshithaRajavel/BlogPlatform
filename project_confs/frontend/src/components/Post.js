import React,{Component} from "react";
import Delete from "./Delete";
export default class Post extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="card">
                <div class="card-body">
                <p class="text-muted">{this.props.timestamp}</p>
                <h5 class="card-title">{this.props.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    <a href={`/authorposts/${this.props.author}`}>
                    Author:{this.props.author}
                    </a>
                </h6>
                <div class="card-text">{this.props.description}</div>
                <a href={`/view/${this.props.id}`} class="btn btn-primary">View Post</a><br/>
                {document.location.pathname=='/dashboard'?
                <form action="/api/delete" method='post'>
                <input value={this.props.id} name='id' hidden ></input>
            <button type='submit'>
                <Delete />
            </button></form> : ""}
                </div>
            </div>
        )
    }
}