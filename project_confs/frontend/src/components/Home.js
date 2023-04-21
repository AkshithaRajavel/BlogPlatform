import React,{Component} from "react";
import NavBar from "./NavBar";
import Post from "./Post";
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:this.props.isLoggedIn,
            all:[],
            caughtUp:[],
            newFeed:[]
        }
        fetch('/api/homeFeed')
        .then((response)=>response.json())
        .then((data)=>this.homeFeed(data))
    }
    homeFeed=(res)=>{
            var post_list={};
            for(var topic in res){
                var data = res[topic];
                post_list[topic]=[];
                for(var i of data){
                    var d = i.fields;
                    var post =<Post 
                    id={i.pk}
                    title={d.title} 
                    description={d.description} 
                    author={d.author}
                    timestamp={d.timestamp}
                    subscribed={topic=='all'?false : true}
                    />;
                    post_list[topic].push(post);
                }
            }
        this.setState(post_list);
        }
    componentDidUpdate(prevProps,prevState){
        if (this.props.isLoggedIn != prevProps.isLoggedIn){
            this.setState({
                isLoggedIn:this.props.isLoggedIn
            })
        }
    }
    render(){
        return (
            <div>
                <NavBar 
                name= {this.state.isLoggedIn ? ['My Profile','Logout'] :['Login','Signup']}
                link={this.state.isLoggedIn ?['/dashboard','/api/logout']:['login','signup']} />
                {this.props.isLoggedIn ?
                <div class='posts-body'>
                <h1>New Feed</h1>
                {this.state.newFeed}<hr/>
            </div>:""}
                {this.props.isLoggedIn ?
                <div class='posts-body'>
                <h1>Subscribed Blog Posts</h1>
                {this.state.caughtUp}<hr/>
            </div>:""}
            <div class='posts-body'>
                <h1>Public Blog Posts</h1>
                {this.state.all}
            </div>
            </div>
        )
    }
}