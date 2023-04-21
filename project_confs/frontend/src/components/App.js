import React,{Component} from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import Editor from './editor';
import ViewPost from "./ViewPost";
import AuthorPosts from './Authorposts';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Followers from './Followers';
import Following from './Following';
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:0,
            email:"",
            following_cnt:0,
            followers_cnt:0,
        }
        fetch("/api/userDetails")
        .then((response)=>response.json())
        .then((data)=>this.setUser(data));
    }
    setUser=(data)=>{
        if(!data.isLoggedIn)return ;
        this.setState({
            isLoggedIn:1,
            email:data.email,
            following:data.following,
            followers_cnt:data.followers_cnt,
            following_cnt:data.following.length
        });
    }
    render(){
        return (
            <div>
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home isLoggedIn={this.state.isLoggedIn} />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/dashboard"
            element={this.state.isLoggedIn?
            <Dashboard 
            email={this.state.email}
            followers_cnt={this.state.followers_cnt}
            following_cnt={this.state.following_cnt}/>:
            <Home isLoggedIn={this.state.isLoggedIn} />}>
            </Route>
            <Route path="/editor"
            element={this.state.isLoggedIn?<Editor email={this.state.email}/>:<Home isLoggedIn={this.state.isLoggedIn} />}>
            </Route>
            <Route path='/view/:id' element={<ViewPost />}/>
            <Route path='/authorposts/:author' 
            element={<AuthorPosts 
                isLoggedIn={this.state.isLoggedIn}
                following={this.state.following}/>}
            />
            <Route path ='/followers' element={<Followers/>}/>
            <Route path ='/following' element={<Following/>}/>
            </Routes>
            </BrowserRouter></div>
        );
    }
}