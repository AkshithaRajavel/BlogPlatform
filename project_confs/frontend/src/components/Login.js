import React,{Component} from "react";
import NavBar from "./NavBar";
import FormFields from "./FormFields";
import Error from "./Error";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            attempt:0,
            isLoggedIn:0,
            errMessage:""
        }
    }
    submitForm = ()=>{
        const email=document.getElementsByTagName('input')['email'].value;
        const password=document.getElementsByTagName('input')['password'].value;
        const data = {email:email,password:password};
        fetch("api/login",
        {method:"POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data),
        redirect:'manual'
        }).then((response)=>response.json())
        .then((data)=>this.setState({
            attempt:1,
            isLoggedIn:data.status,
            errMessage:data.message
        }))
    }
    action(){
        if(this.state.attempt){
        if(!this.state.isLoggedIn)return <Error message={this.state.errMessage}/>;
        else document.location.href="/";
    }
    }
    render(){
        return (
            <div>
                <NavBar name={['Signup']} link={['/signup']} />
                <div class="form-group container">
                <h1>LOGIN</h1>
                    <FormFields name="Email" type="email"/>
                    <FormFields name="Password" type="password"/>
                    <button class="btn" onClick={this.submitForm}>Submit</button>
                    {this.action()}
                </div>
            </div>
        )
    }
}