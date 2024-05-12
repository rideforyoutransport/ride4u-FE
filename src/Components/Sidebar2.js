import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";

import { navbar } from "./Navbarjson/navbar";

const navItems = navbar.item;

export default function Navbar() {
  return (
    <nav className="sidebar" style={{overflowX:"none",overflowY:"scroll"}}>
      <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          RIDE<span></span>4U
        </a>
        <div className="sidebar-toggler not-active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          {navItems.map((item,idx) => {
            if (item.heading) {
              return <li className="nav-item nav-category" key={idx}> {item.title}</li>;
            } else
              return (
                <li className="nav-item" key={idx}>
                  <Link to={item.path} className="nav-link">
                    {item.icon}
                    <span className="link-title"> {item.title}</span>
                  </Link>
                </li>
              );
          })}
        </ul>
      </div>
    </nav>
  );
}
