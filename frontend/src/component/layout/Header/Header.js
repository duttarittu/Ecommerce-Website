import React from "react";
import "./Header.css";
import {
} from "react-icons/fa";


import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            SEBEX
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className="menu-link">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/createproduct">Post your Ad</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login/register</NavLink>
            </li>
          </ul>
        </div>


      </nav>


      
    </>
  );
};

export default Header;