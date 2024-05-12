import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from 'react-google-qrcode';



export default function MHome() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {

    let config = {
      method: 'post',
      url: 'http://127.0.0.1:3003/api/trips/all',
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
      ,
      data: {
        "from": 0,
        "to": 5,
        "expandKeys": {
          "from": [
            "name",
            "id"
          ],
          "to": [],
          "vehicle": [],
          "stops": [],
          "driver": ["name", "id", "number", "rating"],
          "vendor":[]
        }
      }


    };

    axios(config)
      .then(function (response) {
        console.log("this is the response of the vendor apis ", response.data.result);
        setTableDataItems(response.data.result);
        console.log("this is the datatables items", response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  const handleButtonEditClick = (r) => {

    //handle the edit functionality 

    // navigate(`/editVendor?vendor=${r.id}`)
    navigate('/editVendor', { state: r });

  }

  const handleButtonClick = (r) => {
    console.log(r);
    console.log({ tableDataItems });
    let tbc = [...tableDataItems];
    let data;
    tbc.forEach((element) => {

      if (element.id == r.id) {
        if (element.deleted == 0) {
          element.deleted = 1;
          console.log("status changed to 1 ")
        }
        else {
          element.deleted = 0;
          console.log("status changed to 0 ")
        }
        data = JSON.stringify({
          "deleted": `${element.deleted}`
        });
      }
    });

    setTableDataItems(tbc);
    var config = {
      method: 'put',
      url: `http://127.0.0.1:3003/admin/vendor/${r._id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),

      },
      data: data
    };

    axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const handleChange = useCallback((state) => {
    // setSelectedRows(state.selectedRows);
  }, []);




  const columns = [

    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      index: 0

    },
    {
      name: "Trip Description",
      selector: (row) => row.tripDescription,
      sortable: true,
      index: 1

    },
    {
      name: "Trip Date",
      selector: (row) => row.tripDate,
      sortable: true,
      index: 2
    },
    {
      name: "Booking Minimum Amount",
      selector: (row) => row.bookingMinimumAmount,
      sortable: true,
      index: 3
    },
    {
      name: "Cancellation Charge",
      selector: (row) => row.cancelationCharges,
      sortable: true,
      index: 4
    },
    {
      name: "From",
      selector: (row) => row.from.name,
      sortable: true,
      index: 5
    },
    {
      name: "To",
      selector: (row) => row.to.name,
      sortable: true,
      index: 6
    },
    {
      name: "Created At ",
      selector: (row) => row.created,
      sortable: true,
      index: 7
    },
    {
      name: "Driver",
      selector: (row) => row.driver.name,
      sortable: true,
      index: 8
    },
    {
      name: "Refreshments",
      selector: (row) => row.refreshments.toString(),
      sortable: true,
      index: 9
    },
    {
      name: "PromoCodes",
      selector: (row) => row.promoCodes,
      sortable: true,
      index: 9
    },  {
      name: "Requested Trip",
      selector: (row) => row.requestedTrip.toString(),
      sortable: true,
      index: 9
    },
    {
      name: "Vehicle",
      selector: (row) => row.vehicle.name,
      sortable: true,
      index: 9
    },
    {
      name: "Stops",
      selector: (row) => row.stops.toString(),
      sortable: true,
      index: 9
    },

    
    {
      name: "Total Seats ",
      selector: (row) => row.totalSeats,
      sortable: true,
      index: 10
    },
    {
      name: "Total Trip Amount",
      selector: (row) => row.totalTripAmount,
      sortable: true,
      index: 11
    },
    // {
    //   name: "Panel Status",
    //   selector: (row) => {
    //     if (row.pDemoValue == 0) {
    //       return "Demo"
    //     } else if (row.pDemoValue == 1) {
    //       return "Testing/Staging"
    //     } else if (row.pDemoValue == 2) {
    //       return "Pre-Production"
    //     } else if (row.pDemoValue == 3) {
    //       return "Production (Live)"
    //     } else return "Null"
    //   },
    //   sortable: true,
    //   index: 12
    // },
    // {
    //   name: "Change Status",
    //   cell: (r) => <button className="btn btn-outline-primary btn-sm" onClick={() => handleButtonClick(r)}>{r.deleted ? 'In-Active' : 'Active'}</button>,
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   index: 13
    // },
    {
      name: "Action",
      cell: (r) => <button className="btn btn-outline-success btn-sm" onClick={() => handleButtonEditClick(r)}>Edit</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      index: 14
    }
  ];
  return (
    <>
      <div className="main-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between align-items-center  grid-margin">

            <div>
              <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
            </div>

            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => navigate("/addCompanyDetails")}
              >
                Add a Trip
              </button>
            </div>


          </div>
        </div>

      </div>
      <div className="row">
        <div className="col-12 col-xl-12">

          <DataTable
            title="Trips"
            data={tableDataItems}
            columns={columns}
            selectableRows
            onSelectedRowsChange={handleChange}
          />
        </div>
      </div>

    </>
  );
}
