import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicNavbar from "./components/PublicNavbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {

  return (
    <Router>
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/product" component={ProductPage}/>
        <Route exact path="/product/:id" component={DetailPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route path="/*" component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
