import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Network/Config/Axios";



export default function Bookings() {
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
        "from": [],
        "to": [],
        "vehicle": [],
        "stops": [],
        "driver": ["name", "id", "number", "rating"],
      }
    }

    post(`booking/all`, data, (e, r) => {
      if (r) {
        setTableDataItems(r.result);
      }
    })
  }, [])

  const handleButtonEditClick = (r) => {
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
      name: "Origin",
      selector: (row) => row.from.name,
      sortable: true,
      index: 1

    },
    {
      name: "Destination",
      selector: (row) => row.to.name,
      sortable: true,
      index: 1

    },
    {
      name: "Trip Date",
      selector: (row) => row.bookingDate,
      sortable: true,
      index: 2
    },
    {
      name: "Booking Date",
      selector: (row) => row.created,
      sortable: true,
      index: 3
    },
    {
      name: "Luggage Opted",
      selector: (row) => String(row.luggageTypeOpted).toUpperCase(),
      sortable: true,
      index: 4
    },
    {
      name: "Refreshments Opted",
      selector: (row) => row.refreshmentsOpted.toString(),
      sortable: true,
      index: 5
    },
    // {
    //   name: "PromoCodes",
    //   selector: (row) => row.promoCodes,
    //   sortable: true,
    //   index: 9
    // },
    {
      name: "Vehicle",
      selector: (row) => row.vehicle.name,
      sortable: true,
      index: 6
    },
    {
      name: "Total Seats ",
      selector: (row) => row.totalSeatsBooked,
      sortable: true,
      index: 7
    },
    {
      name: "Paid Amount",
      selector: (row) => row.amountPaid,
      sortable: true,
      index: 8
    },
    {
      name: "Remaining Amount",
      selector: (row) => row.amountLeft,
      sortable: true,
      index: 9
    },
    {
      name: "Payment ID",
      selector: (row) => row.paymentID,
      sortable: true,
      index: 9
    },
    {
      name: "Tip Amount",
      selector: (row) => row.tipAmount,
      sortable: true,
      index: 9
    },
    {
      name: "Tip Payment ID",
      selector: (row) => row.tipPaymentID,
      sortable: true,
      index: 9
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      index: 9
    },
    {
      name: "Review",
      selector: (row) => row.review,
      sortable: true,
      index: 9
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      sortable: true,
      index: 10
    },
    // {
    //   name: "Action",
    //   cell: (r) => <button className="btn btn-outline-success btn-sm" onClick={() => handleButtonEditClick(r)}>Edit</button>,
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   index: 14
    // }
  ];
  return (
    <>
      <div className="mt-20">
        <div className="row">
          <div className="col-12 col-xl-12">

            <DataTable
              // actions={<button
              //   type="button"
              //   className="btn btn-outline-warning btn-icon-text mb-2 mb-md-0"
              //   onClick={() => navigate("/addTrip")}
              // >
              //   Add Booking
              // </button>}
              title="Bookings"
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
