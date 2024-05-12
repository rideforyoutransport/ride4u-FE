import React from 'react'
import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <nav className="navbar">
    <a href="#" className="sidebar-toggler">
      <i data-feather="menu"></i>
    </a>
    <div className="navbar-content">
      <form className="search-form">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i data-feather="search"></i>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            id="navbarForm"
            placeholder="Search here..."
          />
        </div>
      </form>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="languageDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="flag-icon flag-icon-us mt-1" title="us"></i>{" "}
            <span className="font-weight-medium ml-1 mr-1">
              English
            </span>
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="languageDropdown"
          >
            <a href="javascript:;" className="dropdown-item py-2">
              <i
                className="flag-icon flag-icon-us"
                title="us"
                id="us"
              ></i>{" "}
              <span className="ml-1"> English </span>
            </a>
            <a href="javascript:;" className="dropdown-item py-2">
              <i
                className="flag-icon flag-icon-fr"
                title="fr"
                id="fr"
              ></i>{" "}
              <span className="ml-1"> French </span>
            </a>
            <a href="javascript:;" className="dropdown-item py-2">
              <i
                className="flag-icon flag-icon-de"
                title="de"
                id="de"
              ></i>{" "}
              <span className="ml-1"> German </span>
            </a>
            <a href="javascript:;" className="dropdown-item py-2">
              <i
                className="flag-icon flag-icon-pt"
                title="pt"
                id="pt"
              ></i>{" "}
              <span className="ml-1"> Portuguese </span>
            </a>
            <a href="javascript:;" className="dropdown-item py-2">
              <i
                className="flag-icon flag-icon-es"
                title="es"
                id="es"
              ></i>{" "}
              <span className="ml-1"> Spanish </span>
            </a>
          </div>
        </li>
        <li className="nav-item dropdown nav-apps">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="appsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="grid"></i>
          </a>
          <div className="dropdown-menu" aria-labelledby="appsDropdown">
            <div className="dropdown-header d-flex align-items-center justify-content-between">
              <p className="mb-0 font-weight-medium">Web Apps</p>
              <a href="javascript:;" className="text-muted">
                Edit
              </a>
            </div>
            <div className="dropdown-body">
              <div className="d-flex align-items-center apps">
                {/*
<a href="pages/apps/chat.html">
                 
                </a>
*/}
                <Link to="/addProd">
                  {" "}
                  <i
                    data-feather="message-square"
                    className="icon-lg"
                  ></i>
                  <p>Chat</p>
                </Link>

                <a href="pages/apps/calendar.html">
                  <i data-feather="calendar" className="icon-lg"></i>
                  <p>Calendar</p>
                </a>
                <a href="pages/email/inbox.html">
                  <i data-feather="mail" className="icon-lg"></i>
                  <p>Email</p>
                </a>
                <a href="pages/general/profile.html">
                  <i data-feather="instagram" className="icon-lg"></i>
                  <p>Profile</p>
                </a>
              </div>
            </div>
            <div className="dropdown-footer d-flex align-items-center justify-content-center">
              <a href="javascript:;">View all</a>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown nav-messages">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="messageDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="mail"></i>
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="messageDropdown"
          >
            <div className="dropdown-header d-flex align-items-center justify-content-between">
              <p className="mb-0 font-weight-medium">9 New Messages</p>
              <a href="javascript:;" className="text-muted">
                Clear all
              </a>
            </div>
            <div className="dropdown-body">
              <a href="javascript:;" className="dropdown-item">
                <div className="figure">
                  <img
                    src="https://via.placeholder.com/30x30"
                    alt="userr"
                  />
                </div>
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Leonardo Payne</p>
                    <p className="sub-text text-muted">2 min ago</p>
                  </div>
                  <p className="sub-text text-muted">Project status</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="figure">
                  <img
                    src="https://via.placeholder.com/30x30"
                    alt="userr"
                  />
                </div>
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Carl Henson</p>
                    <p className="sub-text text-muted">30 min ago</p>
                  </div>
                  <p className="sub-text text-muted">Client meeting</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="figure">
                  <img
                    src="https://via.placeholder.com/30x30"
                    alt="userr"
                  />
                </div>
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Jensen Combs</p>
                    <p className="sub-text text-muted">1 hrs ago</p>
                  </div>
                  <p className="sub-text text-muted">Project updates</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="figure">
                  <img
                    src="https://via.placeholder.com/30x30"
                    alt="userr"
                  />
                </div>
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Amiah Burton</p>
                    <p className="sub-text text-muted">2 hrs ago</p>
                  </div>
                  <p className="sub-text text-muted">
                    Project deadline
                  </p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="figure">
                  <img
                    src="https://via.placeholder.com/30x30"
                    alt="userr"
                  />
                </div>
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Yaretzi Mayo</p>
                    <p className="sub-text text-muted">5 hr ago</p>
                  </div>
                  <p className="sub-text text-muted">New record</p>
                </div>
              </a>
            </div>
            <div className="dropdown-footer d-flex align-items-center justify-content-center">
              <a href="javascript:;">View all</a>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown nav-notifications">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="notificationDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="bell"></i>
            <div className="indicator">
              <div className="circle"></div>
            </div>
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="notificationDropdown"
          >
            <div className="dropdown-header d-flex align-items-center justify-content-between">
              <p className="mb-0 font-weight-medium">
                6 New Notifications
              </p>
              <a href="javascript:;" className="text-muted">
                Clear all
              </a>
            </div>
            <div className="dropdown-body">
              <a href="javascript:;" className="dropdown-item">
                <div className="icon">
                  <i data-feather="user-plus"></i>
                </div>
                <div className="content">
                  <p>New customer registered</p>
                  <p className="sub-text text-muted">2 sec ago</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="icon">
                  <i data-feather="gift"></i>
                </div>
                <div className="content">
                  <p>New Order Recieved</p>
                  <p className="sub-text text-muted">30 min ago</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="icon">
                  <i data-feather="alert-circle"></i>
                </div>
                <div className="content">
                  <p>Server Limit Reached!</p>
                  <p className="sub-text text-muted">1 hrs ago</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="icon">
                  <i data-feather="layers"></i>
                </div>
                <div className="content">
                  <p>Apps are ready for update</p>
                  <p className="sub-text text-muted">5 hrs ago</p>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item">
                <div className="icon">
                  <i data-feather="download"></i>
                </div>
                <div className="content">
                  <p>Download completed</p>
                  <p className="sub-text text-muted">6 hrs ago</p>
                </div>
              </a>
            </div>
            <div className="dropdown-footer d-flex align-items-center justify-content-center">
              <a href="javascript:;">View all</a>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown nav-profile">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="profileDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="https://via.placeholder.com/30x30"
              alt="profile"
            />
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="profileDropdown"
          >
            <div className="dropdown-header d-flex flex-column align-items-center">
              <div className="figure mb-3">
                <img src="https://via.placeholder.com/80x80" alt="" />
              </div>
              <div className="info text-center">
                <p className="name font-weight-bold mb-0">
                  Amiah Burton
                </p>
                <p className="email text-muted mb-3">
                  amiahburton@gmail.com
                </p>
              </div>
            </div>
            <div className="dropdown-body">
              <ul className="profile-nav p-0 pt-3">
                <li className="nav-item">
                  <a
                    href="pages/general/profile.html"
                    className="nav-link"
                  >
                    <i data-feather="user"></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="javascript:;" className="nav-link">
                    <i data-feather="edit"></i>
                    <span>Edit Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="javascript:;" className="nav-link">
                    <i data-feather="repeat"></i>
                    <span>Switch User</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="javascript:;" className="nav-link">
                    <i data-feather="log-out"></i>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  )
}
