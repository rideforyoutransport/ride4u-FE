import React from 'react'

export default function RevenueTab() {
  return (
    <div className="row">
              <div className="col-12 col-xl-12 grid-margin stretch-card">
                <div className="card overflow-hidden">
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                <h6 className="card-title mb-0">Revenue</h6>
                <div className="dropdown">
                <button
                    className="btn p-0"
                    type="button"
                    id="dropdownMenuButton3"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i
                    className="icon-lg text-muted pb-3px"
                    data-feather="more-horizontal"
                    ></i>
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton3"
                >
                    <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    >
                    <i data-feather="eye" className="icon-sm mr-2"></i>{" "}
                    <span className="">View</span>
                    </a>
                    <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    >
                    <i
                        data-feather="edit-2"
                        className="icon-sm mr-2"
                    ></i>{" "}
                    <span className="">Edit</span>
                    </a>
                    <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    >
                    <i
                        data-feather="trash"
                        className="icon-sm mr-2"
                    ></i>{" "}
                    <span className="">Delete</span>
                    </a>
                    <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    >
                    <i
                        data-feather="printer"
                        className="icon-sm mr-2"
                    ></i>{" "}
                    <span className="">Print</span>
                    </a>
                    <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    >
                    <i
                        data-feather="download"
                        className="icon-sm mr-2"
                    ></i>{" "}
                    <span className="">Download</span>
                    </a>
                </div>
                </div>
            </div>
            <div className="row align-items-start mb-2">
                <div className="col-md-7">
                <p className="text-muted tx-13 mb-3 mb-md-0">
                    Revenue is the income that a business has from its
                    normal business activities, usually from the sale of
                    goods and services to customers.
                </p>
                </div>
                <div className="col-md-5 d-flex justify-content-md-end">
                <div
                    className="btn-group mb-3 mb-md-0"
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                    type="button"
                    className="btn btn-outline-primary"
                    >
                    Today
                    </button>
                    <button
                    type="button"
                    className="btn btn-outline-primary d-none d-md-block"
                    >
                    Week
                    </button>
                    <button type="button" className="btn btn-primary">
                    Month
                    </button>
                    <button
                    type="button"
                    className="btn btn-outline-primary"
                    >
                    Year
                    </button>
                </div>
                </div>
            </div>
            
            <div className="flot-wrapper">
                <div id="flotChart1" className="flot-chart"></div>
            </div>
</div>
                </div>
              </div>
            </div>
  )
}
