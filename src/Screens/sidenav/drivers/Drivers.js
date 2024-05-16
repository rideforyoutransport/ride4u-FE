import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";



export default function Drivers() {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    const [tableDataItems, setTableDataItems] = useState([]);

    // useEffect(() => {
    //   console.log("state", selectedRows);
    // }, [selectedRows]);

    useEffect(() => {

        let data = {
            "from": 0,
            "to": 100,
        }

        post(`driver/all`, data, (e, r) => {
            if (r) {
                setTableDataItems(r.result.items);
            }
        })

    }, [])

    const handleButtonEditClick = (r) => {
        navigate('/addDriver', { state: r });
    }

    const handleChange = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const deleteAll = () => {
        let ids = [];
        selectedRows.map(row => {
            ids.push(row.id);
        });
        let data = { ids };

        post(`driver/deleteMultiple`, data, (e, r) => {
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
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            index: 1

        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            index: 2
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
            sortable: true,
            index: 3
        },
        {
            name: "Total Trips",
            selector: (row) => row.totalTrips,
            sortable: true,
            index: 4
        },
        {
            name: "Phone Number",
            selector: (row) => row.number,
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
            name: "Action",
            cell: (r) => <button className="btn btn-outline-success btn-sm" onClick={() => handleButtonEditClick(r)}>Edit</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            index: 7
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
                                onClick={() => navigate("/addDriver")}
                            >
                                Add Driver
                            </button>}
                            contextActions={<button
                                type="button"
                                className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                                onClick={() => deleteAll()}
                            >
                                Delete
                            </button>}
                            title="Drivers"
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
