import React from 'react'
import { Link } from 'react-router-dom'
import { clear } from '../utils/Crypto'

export default function TopBar() {
  return (
    <nav className="navbar d-flex flex-column flex-md-row align-items-center justify-content-between">

          <div>
            <h1 className="mb-3 mb-md-0 ms-5">Welcome to Dashboard!</h1>
          </div>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0 me-5"
              onClick={() => {
                clear();
                window.location = '/';
              }}
            >
              Logout
            </button>
      </div>


    </nav>
  )
}
