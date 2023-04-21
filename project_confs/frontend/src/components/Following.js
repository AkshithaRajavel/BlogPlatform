import React , {Component} from 'react';
import NavBar from './NavBar';
export default class Following extends Component{
    constructor(){
        super();
        this.state={
            count:0,
            flist:[]
        }
        fetch('/api/following')
        .then((response)=>response.json())
        .then((data)=>this.setState({
            count:data.count,
            flist:data.list
        }));
    }
    render(){
        return(
            <div>
                <NavBar name= {['My Profile','Logout'] }
                link={['/dashboard','/api/logout']}/>
                <h2>Following : {this.state.count}</h2>
                <div>
                    {this.state.flist.map(
                        (f)=><div >
                            <a href={`/authorposts/${f}`}>{f}</a>
                            <hr></hr>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}