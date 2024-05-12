import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sidebar">
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
          <li className="nav-item nav-category">Main</li>
          <li className="nav-item">
            <Link to="" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Trips</span>
            </Link>
          </li>
{/*
          <li className="nav-item">
          <Link to="" className="nav-link">
            <i className="link-icon" data-feather="box"></i>
            <span className="link-title">Assign Program to Vendor </span>
          </Link>
        </li>
  */}
          <li className="nav-item">
            <Link to="changeAdminPassword" className="nav-link">
              <i className="link-icon" data-feather="box"></i>
              <span className="link-title">Change Admin Password</span>
            </Link>
          </li>
          <li className="nav-item">
          <Link to="industryMaster" className="nav-link">
            <i className="link-icon" data-feather="box"></i>
            <span className="link-title">Stops</span>
          </Link>
        </li>
          <li className="nav-item nav-category">Program Options</li>

          <li className="nav-item">
            <Link to="basicSetup" className="nav-link">
              <span className="link-title">Configurations</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="rewardify" className="nav-link">
              <span className="link-title">Stops</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="genuinemark" className="nav-link">
              <span className="link-title">Users</span>
            </Link>
          </li>
          <li className="nav-item">
          <Link to="dwan" className="nav-link">
            <span className="link-title">Drivers</span>
          </Link>
        </li>
        <li className="nav-item">
        <Link to="scanandwin" className="nav-link">
          <span className="link-title">Vehicles</span>
        </Link>
      </li>
     
          <li className="nav-item">
            <Link to="supplybeam" className="nav-link">
              <span className="link-title">Vendors</span>
            </Link>
          </li>
      
          <li className="nav-item">
            <Link to="hybridocean" className="nav-link">
              <span className="link-title">Promocodes</span>
            </Link>
          </li>
          <li className="nav-item nav-category">Other Options</li>
              
          <li className="nav-item">
            <Link to="allDynamicForms" className="nav-link">
              <span className="link-title">Dynamic Forms</span>
            </Link>
          </li>
          <li className="nav-item">
          <Link to="allDynamicForms" className="nav-link">
            <span className="link-title">Popup Master</span>
          </Link>
        </li>


{ /*      
     <li className="nav-item nav-category">Product</li>

          <li className="nav-item">
            <Link to="productCategory" className="nav-link">
              <span className="link-title">Product Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="productSubCategory" className="nav-link">
              <span className="link-title">Product Sub Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="addProd" className="nav-link">
              <span className="link-title">Add Product</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="allProducts" className="nav-link">
              <span className="link-title">All Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="batchCreation" className="nav-link">
              <span className="link-title">Batch Creation</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="generateQr" className="nav-link">
              <span className="link-title">QR Code Generation</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="printQr" className="nav-link">
              <span className="link-title">QR Code Print</span>
            </Link>
          </li>

  */        }

        </ul>
      </div>
    </nav>
  );
}
