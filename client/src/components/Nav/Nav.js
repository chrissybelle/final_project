import React from "react";
import Login from "../Login";

import "./nav.css";


const Nav = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="">
      <img src="/hat.ico" width="30" height="30"
        className="d-inline-block align-top" alt=""/>  Your Perfect Recipes!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li  className={window.location.pathname === "/home" ? "active nav-item" : "nav-item"} >
            <a className="nav-link" href="/home">Home</a>
          </li>
          <li className={window.location.pathname === "/edamamrecipes" ? "active nav-item" : "nav-item"}>
            <a className="nav-link" href="/edamamrecipes">Search</a>
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
