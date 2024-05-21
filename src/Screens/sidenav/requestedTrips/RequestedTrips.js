import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";



export default function RequestedTrips() {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableDataItems, setTableDataItems] = useState([]);

    useEffect(() => {

        post(`trips/requestedTrips`, {}, (e, r) => {
            if (r) {
                setTableDataItems(r.result);
            }
        })

    }, [])

    const handleChange = useCallback((state) => {
        setSelectedRows(state.selectedRows);
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
            index: 4
        },
        {
            name: "Destination",
            selector: (row) => row.to.name,
            sortable: true,
            index: 5
        },
        {
            name: "Seats Required",
            selector: (row) => row.totalSeats,
            sortable: true,
            index: 5
        },
        {
            name: "Trip Date",
            selector: (row) => row.tripDate,
            sortable: true,
            index: 2
        },
        {
            name: "Created On ",
            selector: (row) => row.created,
            sortable: true,
            index: 6
        }
    ];
    return (
        <>
            <div className="mt-20">
                <div className="row">
                    <div className="col-12 col-xl-12">

                        <DataTable
                            title="Requested Trips"
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
