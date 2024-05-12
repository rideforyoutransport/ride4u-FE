import React from "react";

import { AiOutlineCloudDownload, AiOutlinePrinter } from "react-icons/ai";
import { CiImport } from "react-icons/ci";
import { Line, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Alert } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const options2nd = {
  responsive: true,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
    title: {
      display: false,
      text: "Monthly Sales",
    },
  },
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Qr Codes",
    },
  },
};

export const barChartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "New Orders",
    },
  },
};

let checkingData = labels.map(() =>
  faker.datatype.number({ min: 0, max: 1000 }),
);

export const barChartData = {
  labels,
  datasets: [
    {
      label: "Orders",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const data = {
  labels,
  datasets: [
    {
      label: "Monthly Qr Codes",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
      pointRadius: 0,
    },
  ],
};

export const custData = {
  labels,
  datasets: [
    {
      label: "Customer Data",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgba(106, 90, 205 ,0.5)",
      backgroundColor: "rgba(106, 90, 205 ,0.5)",
      tension: 0.3,
      pointRadius: 0,
    },
  ],
};

export default function Dashboard() {
  return (
    <div class="page-content">
    
      <div class="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 class="mb-3 mb-md-0">Welcome to Dashboard</h4>
        </div>
        <div class="d-flex align-items-center flex-wrap text-nowrap">
          <button
            type="button"
            class="btn btn-outline-info btn-icon-text mr-2 d-none d-md-block"
          >
            <CiImport />
            Import
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-icon-text mr-2 mb-2 mb-md-0"
          >
            <AiOutlinePrinter />
            Print
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
          >
            <AiOutlineCloudDownload />
            Download Report
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-xl-12 stretch-card">
          <div class="row flex-grow">
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">New Customers</h6>
                    <div class="dropdown mb-2">
                      <button
                        class="btn p-0"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          class="icon-lg text-muted pb-3px"
                          data-feather="more-horizontal"
                        ></i>
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                          <span class="">View</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                          <span class="">Edit</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                          <span class="">Delete</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                          <span class="">Print</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                          <span class="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">3,897</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-success">
                          <span>+3.3%</span>
                          <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      <Line options={options2nd} data={custData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">New Orders</h6>
                    <div class="dropdown mb-2">
                      <button
                        class="btn p-0"
                        type="button"
                        id="dropdownMenuButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          class="icon-lg text-muted pb-3px"
                          data-feather="more-horizontal"
                        ></i>
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                          <span class="">View</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                          <span class="">Edit</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                          <span class="">Delete</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                          <span class="">Print</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                          <span class="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">35,084</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-danger">
                          <span>-2.8%</span>
                          <i data-feather="arrow-down" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      {/*  <Bar options={barChartOptions} data={barChartData} /> */}
                      <Bar options={barChartOptions} data={barChartData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">Growth</h6>
                    <div class="dropdown mb-2">
                      <button
                        class="btn p-0"
                        type="button"
                        id="dropdownMenuButton2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          class="icon-lg text-muted pb-3px"
                          data-feather="more-horizontal"
                        ></i>
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                          <span class="">View</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                          <span class="">Edit</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                          <span class="">Delete</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                          <span class="">Print</span>
                        </a>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                          <span class="">Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">89.87%</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-success">
                          <span>+2.8%</span>
                          <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      <Line options={options2nd} data={custData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-xl-12 grid-margin stretch-card">
          <div class="card overflow-hidden">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                <h6 class="card-title mb-0">Monthly Qr Codes</h6>
                <div class="dropdown">
                  <button
                    class="btn p-0"
                    type="button"
                    id="dropdownMenuButton3"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i
                      class="icon-lg text-muted pb-3px"
                      data-feather="more-horizontal"
                    ></i>
                  </button>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton3"
                  >
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                      <span class="">View</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                      <span class="">Edit</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                      <span class="">Delete</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                      <span class="">Print</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                      <span class="">Download</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="row align-items-start mb-2"></div>
              <div class="flot-wrapper">
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
