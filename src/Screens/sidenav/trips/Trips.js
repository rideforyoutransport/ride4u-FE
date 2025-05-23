import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";
import dayjs from "dayjs";
import moment from "moment";



export default function Trips() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  useEffect(() => {

    let data = {
      "from": 0,
      "to": 500,
      "expandKeys": {
        "from": [
          "name",
          "id",
          "place_id",
          "geoLocation"
        ],
        "to": [
          "name",
          "id",
          "place_id",
          "geoLocation"
        ],
        "vehicle": [],
        "stops": [
          "name",
          "id",
          "place_id",
          "geoLocation"
        ],
        "driver": ["name", "id", "number", "rating"],
        "vendor": [],
      }
    }

    post(`trips/all`, data, (e, r) => {
      if (r) {
        setTableDataItems(r.result);
      }
    })

  }, [])

  const handleButtonEditClick = (r) => {
    navigate('/addTrip', { state: r });
  }
  const handleButtonViewClick = (r) => {
    navigate('/viewTrip', { state: r });
  }

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const deleteAll = () => {
    let ids = [];
    selectedRows.map(row => {
      ids.push(row.id);
      if (row.returnTrip) {
        ids.push(row.returnTrip.id);
      }
    });
    let data = { ids };

    post(`trips/deleteMultiple`, data, (e, r) => {
      if (r) {
        showToast("Deleted successfully!");
        navigate(0);
      }
    })
  }


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
      selector: (row) => new Date(row.tripDate).toLocaleString("en-US").toString(),
      sortable: true,
      index: 2
    },
    {
      name: "Booking Amount",
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
      name: "Return Trip",
      selector: (row) => row.returnTrip != null ? "true" : "false",
      sortable: true,
      index: 9
    },
    {
      name: "Luggage Options",
      selector: (row) => row.luggage.toString(),
      sortable: true,
      index: 10
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
      selector: (row) => row.vehicle != null ? row.vehicle.name : "Some Vehicle",
      sortable: true,
      index: 11
    },
    {
      name: "Stops",
      selector: (row) => {
        let stops = "";
        row.stops.map((stop) => {
          stops = stops + stop.name + ", "
        })
        return stops;
      },
      sortable: true,
      index: 12,
    },


    {
      name: "Total Seats ",
      selector: (row) => row.totalSeats,
      sortable: true,
      index: 13
    },
    {
      name: "Total Trip Amount",
      selector: (row) => row.totalTripAmount,
      sortable: true,
      index: 14
    },
    {
      name: "View",
      cell: (r) => <button className="btn btn-outline-primary btn-sm" onClick={() => handleButtonViewClick(r)}>View</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      index: 15
    },
    {
      name: "Action",
      cell: (r) => <button className="btn btn-outline-secondary btn-sm" onClick={() => handleButtonEditClick(r)}>Edit</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      index: 16
    },
    {
      name: "Share",
      cell: (r) => <button className="btn btn-outline-danger btn-sm" onClick={() => {
        navigator.clipboard.writeText("https://admin.rideforyoutransport.com/trip/"+r.id)
        alert("Link has been copied to Clipboard!")

      }}>Share</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      index: 16
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
                className="btn btn-outline-warning btn-icon-text mb-2 mb-md-0"
                onClick={() => navigate("/addTrip")}
              >
                Add Trip
              </button>}
              contextActions={<button
                type="button"
                className="btn btn-outline-warning btn-icon-text mb-2 mb-md-0"
                onClick={() => deleteAll()}
              >
                Delete
              </button>}
              title="Trips"
              data={tableDataItems}
              fixedHeader={true}
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
