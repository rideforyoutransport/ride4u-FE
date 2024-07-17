import React from "react";
import { Link } from "react-router-dom";
import { clear } from "../utils/Crypto";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          RIDEFORYOU
        </a>
        <div className="sidebar-toggler not-active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          <li className="nav-item">
            <Link to="" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Trips</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="bookings" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Bookings</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to="stops" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Stops</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link to="users" className="nav-link">
              <span className="link-title">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="drivers" className="nav-link">
              <span className="link-title">Drivers</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="vehicles" className="nav-link">
              <span className="link-title">Vehicles</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="requestedTrips" className="nav-link">
              <span className="link-title">Requested Trips</span>
            </Link>
          </li>

        {/*   <li className="nav-item">
            <Link to="vendors" className="nav-link">
              <span className="link-title">Vendors</span>
            </Link>
          </li>
          */}

          {/* <li className="nav-item">
            <Link to="" className="nav-link">
              <span className="link-title">Promocodes</span>
            </Link>
          </li> */}
          {/* <li className="nav-item nav-category">Other Options</li> */}
          {/* <li className="nav-item">
            <Link to="basicSetup" className="nav-link">
              <span className="link-title">Settings</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link to="changePassword" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Change Password</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
