import React from "react";
import Login from "../Login";

import "./nav.css";


const Nav = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="">
      <img id= "logo" src="/images/YourPerfectRecipe.png" width="50" height="50"
        className="d-inline-block align-top" alt=""/>  <h2>Your Perfect Recipes!</h2></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li  className={window.location.pathname === "/home" ? "active nav-item" : "nav-item"} >
            <a className="nav-link" href="/home">Home</a>
          </li>
          <li className={window.location.pathname === "/edamam" ? "active nav-item" : "nav-item"}>
            <a className="nav-link" href="/edamam">Search</a>
          </li>
          <li className={window.location.pathname === "/your-recipes" ? "active nav-item" : "nav-item"}>
            <a className="nav-link" href="/your-recipes">Your Recipes</a>
          </li>

        </ul>
        <span className="navbar-text">
      <Login/>
          </span>
      </div>
</nav>;
    
    export default Nav;
