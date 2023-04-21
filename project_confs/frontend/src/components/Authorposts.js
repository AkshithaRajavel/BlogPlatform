import React,{Component} from "react";
import NavBar from "./NavBar";
import Post from "./Post";

export default class AuthorPosts extends Component{
    constructor(props){
        super(props);
        this.state={
            author : document.location.pathname.split('/').reverse()[0],
            post_list:[],
            subscribed:0,
        }
        fetch(`/api${document.location.pathname}`)
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
    componentDidUpdate(prevProps,prevState){
        console.log(this.props.isLoggedIn,prevProps.isLoggedIn);
        if (this.props.isLoggedIn != prevProps.isLoggedIn){
            if(this.props.isLoggedIn){
                if(this.props.following.includes(this.state.author)){
                    this.setState({
                        subscribed:1
                    });
                }
            }
            else{
                this.setState({
                    subscribed:1
                });
            }
        }
    }
    render(){
        return(
            <div>
                <NavBar 
                name= {this.props.isLoggedIn ? ['My Profile','Logout'] :['Login','Signup']}
                link={this.props.isLoggedIn ?['/dashboard','/api/logout']:['/login','/signup']} />
            <br/>
            <h3>
                Author: {this.state.author}
            </h3>
            {
                this.props.isLoggedIn?
                (this.state.subscribed?
                <a href={`/api/unsubscribe/${this.state.author}`} class="btn btn-primary">Unsubscribe</a>:
                <a href={`/api/subscribe/${this.state.author}`} class="btn btn-primary">Subscribe</a>):
                <></>
                }
            <h2>Public Posts</h2>
            <div class='posts-body'>
                {this.state.post_list}
            </div>
            </div>
        );
    }
}