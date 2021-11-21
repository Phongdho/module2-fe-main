import React from 'react';
import "./HomePage.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
const HomePage = () => {
    return (
        <div className="masthead">
            <div className="hello-container">
            <div className="hello-main">
                <h3 className="hello-text">Hello</h3>
                <Button as={NavLink} to="/product" className="hello-button">Explore Plato</Button>
            </div>
            </div>
        </div>
    )
}

export default HomePage
