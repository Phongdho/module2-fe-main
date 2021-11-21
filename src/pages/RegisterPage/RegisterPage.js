import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./RegisterPage.css";
import authAction from "../../redux/actions/auth.action";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {

    let [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    let {name, email, password} = dataForm;

    const handleOnChange = (e) => {
        setDataForm({...dataForm, [e.target.name]:e.target.value});
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authAction.register(dataForm));
        history.push('/login');
    };

    return (
        <div className="register-form">
        <h3 className="register-title">Join us</h3>
        <Form onSubmit={handleSubmit} className="register-main">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label><strong>Name: </strong></Form.Label>
                <Form.Control type="text" placeholder="Enter Name" name="name" value={name} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><strong>Email: </strong></Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" value={email} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><strong>Password: </strong></Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleOnChange} />
            </Form.Group>

            <Button variant="primary" type="submit" style={{backgroundColor:"lightsteelblue", border:"none", marginTop:'1rem'}}>
                Register
            </Button>
            <div className="under-container" style={{marginTop:"1rem", borderTop: "1px solid lightgray", paddingTop:"1rem"}}>
                <Form.Label><strong>Or sign up with </strong></Form.Label>
                <br />
                <a href="https://ecombe.herokuapp.com/api/users/loginwithgoogle" style={{textDecoration:"none", color:"#DB4437"}}><strong>Google</strong></a>
                <br />
                <a href="https://ecombe.herokuapp.com/api/users/loginwithfacebook"style={{textDecoration:"none", color:"#4267B2" }}><strong>Facebook</strong></a>
            </div>
        </Form>
        <ToastContainer autoClose={2000} />
    </div>
    )
}

export default RegisterPage
