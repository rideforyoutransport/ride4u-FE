import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-google-qrcode";
import { tenant } from "../../utils/tenant";

export default function AllGiftsSchemes() {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/gift/all",
      headers: {
        slug: tenant,
      },
    };

    var configRoles = {
      method: "get",
      url: "http://127.0.0.1:3003/api/userPermission/",
      headers: {
        slug: tenant,
      },
    };
    axios(configRoles)
      .then(function (response) {
        //console.log((response.data));
        setUserRoles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(config)
      .then(function (response) {
        //  console.log(response.data);
        setTableDataItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleButtonEditClick = (r) => {

    //console.log(r);
    //handle the edit functionality

    navigate("/tenant/giftEdit", { state: r });
  };

  const handleButtonDeleteClick = (r) => {
    //console.log(r);
    var config = {
      method: "delete",
      url: `http://127.0.0.1:3003/api/gift/${r.id}`,
      headers: {
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        alert("Item deleted successfully");
        // console.log((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(tableDataItems);
    let tbc = [...tableDataItems];
    tbc.forEach((element, idx) => {
      if (element.id == r.id) {
        tbc.splice(idx, 1);
      }
    });

    setTableDataItems(tbc);
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
      selector: (row) => row.g_name,
      sortable: true,
    },
    {
      name: "Points",
      selector: (row) => row.g_value,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.g_price,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.created_on,
      sortable: true,
    },
    {
      name: "For",
      selector: (row) => {
        let rValue = userRoles.map((role) => {
          if (row.user_type == role.id) {
            return role.name;
          } else {
            return;
          }
        });
        return rValue;
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "In-Active"),
      sortable: true,
    },
    {
      name: "Edit",
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
    {
      name: "Delete",
      cell: (r) => (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleButtonDeleteClick(r)}
        >
          Delete
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
            <h4 className="mb-3 mb-md-0">Gift Schemes</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/tenant/giftSchemeAddition")}
            >
              Add Gift Scheme
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <DataTable
              title="All Gifts Schemes"
              data={tableDataItems}
              columns={columns}
              //selectableRows
              onSelectedRowsChange={handleChange}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}
