import React from 'react'
import { Link } from 'react-router-dom'
import { clear } from '../utils/Crypto'

export default function TopBar() {
  return (
    <nav className="navbar">
        <div className="d-flex justify-content-between align-items-center grid-margin row-xs-12">

          <div>
            <h1 className="mb-3 mb-md-0">Welcome to Dashboard</h1>
          </div>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => {
                clear();
                window.location = '/';
              }}
            >
              Logout
            </button>
          </div>
      </div>


    </nav>
  )
}
