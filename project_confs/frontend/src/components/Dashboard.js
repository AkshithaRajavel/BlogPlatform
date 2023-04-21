import React,{Component} from "react";
import NavBar from "./NavBar";
import Post from "./Post";
export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            post_list:[]
        }
        fetch('/api/posts')
        .then((response)=>response.json())
        .then((data)=>this.posts(data))
    }
    posts=(data)=>{
        var post_list=[];
        for(var i of data){
            var d = i.fields;
            var post =<Post 
            id={i.pk}
            title={d.title} 
            markdown={d.markdown}
            description={d.description} 
            author={d.author}
            timestamp={d.timestamp}
            />;
            post_list.push(post);
        }
        this.setState({
            post_list:post_list
        })
    }
    render(){
        return(
            <div>
            <NavBar 
                name= {[`Followers ${this.props.followers_cnt}`,`Following ${this.props.following_cnt}`,'Logout'] }
                link={['/followers','/following','/api/logout']} /><br/>
            <h3>Logged in as : {this.props.email}</h3>
            <h1>MY POSTS</h1>
            <button class='btn'>
                <a href="/editor">+Create New Post</a>
            </button>
            <div class='posts-body'>
                {this.state.post_list}
            </div>
            </div>
        );
    }
}