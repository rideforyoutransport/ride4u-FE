import React from 'react'

export default function Footer() {
  return (
    <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
    <p className="text-muted text-center text-md-left">
      Copyright © 2022-2023{" "}
      <a href="https://www.nobleui.com" target="_blank">
        RIDEFORUTRANSPORT
      </a>
      . All rights reserved
    </p>
    <p className="text-muted text-center text-md-left mb-0 d-none d-md-block">
      Handcrafted With{" "}
      <i
        className="mb-1 text-primary ml-1 icon-small"
        data-feather="heart"
      ></i>
    </p>
  </footer>
  )
}
