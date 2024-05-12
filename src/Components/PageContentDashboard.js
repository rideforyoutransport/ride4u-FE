import React from 'react'
import Table from './Table'

export default function PageContentDashboard() {
  return (
    <div className="page-content">
    <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
      <div>
        <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
      </div>
      <div className="d-flex align-items-center flex-wrap text-nowrap">
        <div
          className="input-group date datepicker dashboard-date mr-2 mb-2 mb-md-0 d-md-none d-xl-flex"
          id="dashboardDate"
        >
          <span className="input-group-addon bg-transparent">
            <i data-feather="calendar" className=" text-primary"></i>
          </span>
          <input type="text" className="form-control" />
        </div>
        <button
          type="button"
          className="btn btn-outline-info btn-icon-text mr-2 d-none d-md-block"
        >
          <i className="btn-icon-prepend" data-feather="download"></i>
          Import
        </button>
        <button
          type="button"
          className="btn btn-outline-primary btn-icon-text mr-2 mb-2 mb-md-0"
        >
          <i className="btn-icon-prepend" data-feather="printer"></i>
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-icon-text mb-2 mb-md-0"
        >
          <i
            className="btn-icon-prepend"
            data-feather="download-cloud"
          ></i>
          Download Report
        </button>
      </div>
    </div>


   <Table/>
  </div>
  )
}
