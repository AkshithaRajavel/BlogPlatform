import React,{Component} from "react";
import NavBar from "./NavBar";
import ReactMarkdown from 'react-markdown';
export default class Editor extends Component{
    constructor(props){
        super(props);
        this.state={
            email:this.props.email,
            content:"",
            title:"",
            description:""
        }
    }
    changecontent = ()=>{
        this.setState({
            title:document.getElementById('title').value,
            description:document.getElementById('description').value,
            content:document.getElementById('markdown').value
        })
    }
    render(){
        return(
            <div>
                <NavBar 
                name= {['Home','My Profile','Logout'] }
                link={['/','/dashboard','/api/logout']} /><br/>
                <form action='/api/create' method='post'>
                    <div class='container'>
                        <div class='row'>
                            <div class='col'>
                            <div class='container'>
                                <div class="row">
                                <h6 class="col">TITLE:</h6>
                                <input class='col' id='title' name='title' onChange={this.changecontent} required/>
                                </div><br/>
                                <div class="row">
                                <h6 class="col">DESCRIPTION:</h6>
                                <textarea class='col' id='description'name='description' onChange={this.changecontent}></textarea>
                                </div>
                            </div></div>
                            <div class='col'>
                            <div class="card">
                <div class="card-body">
                <h5 class="card-title">{this.state.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Author:{this.state.email}</h6>
                <p class="card-text">{this.state.description}</p>
                <button class="btn btn-primary" type='submit'>Create Post</button>
                </div></div>
                            </div>
                        </div>
                        <hr />
                        <div class='row'>
                            <div class='col'>
                                <h3>Markdown</h3>
                                <textarea id='markdown' name='markdown' onChange={this.changecontent}>
                                </textarea>
                            </div>
                            <div class='col'>
                                <h3>Preview</h3>
                                <ReactMarkdown>
                                    {"# "+this.state.title+"\n"+this.state.content}
                                </ReactMarkdown>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}