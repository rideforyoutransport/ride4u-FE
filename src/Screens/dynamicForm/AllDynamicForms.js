import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllDynamicForms() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [userTypes, setUsersTypes] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/dynamicForm/get",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setTableDataItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleButtonEditClick = (r) => {
    //handle the edit functionality
    navigate("/editDynamicForm", { state: r });
  };

  const handleButtonClick = (r) => {
    console.log(r);
    console.log(tableDataItems);
    let tbc = [...tableDataItems];
    let data;
    tbc.forEach((element) => {
      if (element.id == r.id) {
        if (element.c_status == 0) {
          element.c_status = 1;
          console.log("status changed to 1 ");
        } else {
          element.c_status = 0;
          console.log("status changed to 0 ");
        }
        data = JSON.stringify({
          c_status: `${element.c_status}`,
        });
      }
    });

    setTableDataItems(tbc);
    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/admin/vendor/${r.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {})
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
    },
    {
      name: "Name",
      selector: (row) => row.template_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => {
        if (row.form_type == 0) {
          return <p>Product</p>;
        } else return <p>Warranty</p>;
      },
      sortable: false,
      allowOverflow: false,
    },

    {
      name: "Created On",
      selector: (row) => row.creation_date,
      sortable: true,
    },
    {
      name: "Action",
      cell: (r) => (
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => handleButtonEditClick(r)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">Welcome to Forms Master</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/dynamicForms")}
            >
              Add New Dynamic Form
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <DataTable
              title="Dynamic Forms"
              data={tableDataItems}
              columns={columns}
              //selectableRows
              onSelectedRowsChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
