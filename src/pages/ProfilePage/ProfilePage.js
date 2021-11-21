import React, { useState } from 'react'
import { Container, Form ,Button} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import userActions from '../../redux/actions/user.action';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        image:""
      });
      const {name, email, image } = dataForm;
      const handleOnChange = (e) => {
          switch(e.target.type){
              case 'text': 
              case 'email':
                  setDataForm({ ...dataForm, [e.target.name]: e.target.value });
                  break;
              case 'file':
                  setDataForm({ ...dataForm, [e.target.name] : e.target.files });
                  break;
                default:
                    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
          }
        };

      const dispatch = useDispatch();
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.updateCurrentUser({ name, email, image}));
      };
      console.log(dataForm, 'this')
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Update Your Name</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleOnChange}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Update Your Email</Form.Label>
            <Form.Control 
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                 
            />
        </Form.Group>
        {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Your Image</Form.Label>
            <Form.Control
             type="file" 
             placeholder="image"
            name="image"
            files={image}
            onChange={handleOnChange}
            accept=".jpg, .jpeg, .png"
             />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Update Your Profile Photo</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Your photo"
                name="image"
                value={image}
                onChange={handleOnChange}
            />
        </Form.Group>
    
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <ToastContainer autoClose={2000} />
    </Form>
        </Container>
    )
}

export default ProfilePage