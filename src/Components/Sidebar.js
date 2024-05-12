import React from 'react'

export default function Sidebar() {
  return (
    <nav className="settings-sidebar">
    <div className="sidebar-body">
      <a href="" className="settings-sidebar-toggler">
        <i data-feather="settings"></i>
      </a>
      <h6 className="text-muted">Sidebar:</h6>
      <div className="form-group border-bottom">
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="sidebarThemeSettings"
              id="sidebarLight"
              value="sidebar-light"
            />
            Light
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="sidebarThemeSettings"
              id="sidebarDark"
              value="sidebar-dark"
            />
            Dark
          </label>
        </div>
      </div>
      <div className="theme-wrapper">
        <h6 className="text-muted mb-2">Light Theme:</h6>
        <div
          className="theme-item active"
          
        >
          <img
            src="../assets/images/screenshots/light.jpg"
            alt="light theme"
          />
        </div>
        <h6 className="text-muted mb-2">Dark Theme:</h6>
        <div className="theme-item" >
          <img
            src="../assets/images/screenshots/dark.jpg"
            alt="light theme"
          />
        </div>
      </div>
    </div>
  </nav>
  )
}
