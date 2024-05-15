import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Network/Config/Axios";



export default function Trips() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {

    let data = {
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
        "vendor": []
      }
    }

    post(`trips/all`, data, (e, r) => {
      if (r) {
        setTableDataItems(r.result);
      }
    })

    // let config = {
    //   method: 'post',
    //   url: 'http://127.0.0.1:3003/api/admintrips/all',
    //   withCredentials: true,
    //   headers: {
    //     'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    //   }
    //   ,



    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log("this is the response of the vendor apis ", response.data.result);
    //     setTableDataItems(response.data.result);
    //     console.log("this is the datatables items", response.data.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  }, [])

  const handleButtonEditClick = (r) => {

    //handle the edit functionality 

    // navigate(`/editVendor?vendor=${r.id}`)
    navigate('/editVendor', { state: r });

  }

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
      name: "Origin",
      selector: (row) => row.from.name,
      sortable: true,
      index: 4
    },
    {
      name: "Destination",
      selector: (row) => row.to.name,
      sortable: true,
      index: 5
    },
    {
      name: "Created On ",
      selector: (row) => row.created,
      sortable: true,
      index: 6
    },
    {
      name: "Driver",
      selector: (row) => row.driver.name,
      sortable: true,
      index: 7
    },
    {
      name: "Refreshments",
      selector: (row) => row.refreshments.toString(),
      sortable: true,
      index: 8
    },
    {
      name: "Luggage Options",
      selector: (row) => row.luggage.toString(),
      sortable: true,
      index: 9
    },
    // {
    //   name: "PromoCodes",
    //   selector: (row) => row.promoCodes,
    //   sortable: true,
    //   index: 9
    // },  {
    //   name: "Requested Trip",
    //   selector: (row) => row.requestedTrip.toString(),
    //   sortable: true,
    //   index: 9
    // },
    {
      name: "Vehicle",
      selector: (row) => row.vehicle.name,
      sortable: true,
      index: 10
    },
    {
      name: "Stops",
      selector: (row) => row.stops.toString(),
      sortable: true,
      index: 11
    },


    {
      name: "Total Seats ",
      selector: (row) => row.totalSeats,
      sortable: true,
      index: 12
    },
    {
      name: "Total Trip Amount",
      selector: (row) => row.totalTripAmount,
      sortable: true,
      index: 13
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
      <div className="mt-20">
        <div className="row">
          <div className="col-12 col-xl-12">

            <DataTable
              actions={<button
                type="button"
                className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => navigate("/addTrip")}
              >
                Add Trip
              </button>}
              title="Trips"
              data={tableDataItems}
              columns={columns}
              selectableRows
              onSelectedRowsChange={handleChange}
            />
          </div>
        </div>
      </div>

    </>
  );
}
