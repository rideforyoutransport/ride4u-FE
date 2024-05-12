import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-google-qrcode";
import { tenant } from "../../utils/tenant";

export default function VendorUsers() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableDataItems, setTableDataItems] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/vendorUser/get",
      headers: {
        slug: tenant,
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

    var configUserRoles = {
      method: "get",
      url: "http://127.0.0.1:3003/api/userPermission/",
      headers: {
        slug: tenant,
      },
    };

    axios(configUserRoles)
      .then(function (response) {
        console.log(response.data);
        setUserRoles(response.data);
        console.log(response.data);
        //  setTableDataItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleButtonEditClick = (row) => {
    console.log(row);
    navigate("/tenant/editVendorUser", { state: row });
  };

  const handleButtonDeleteClick = (r) => {
    console.log(r);
    // console.log(tableDataItems);
    // let tbc=[...tableDataItems];
    // let data;
    // tbc.forEach((element)=>{

    //      if(element.id==r.id){
    //       if(element.c_status==0) {element.c_status=1;
    //       console.log("status changed to 1 ")
    //       }
    //       else {element.c_status=0;
    //         console.log("status changed to 0 ")
    //       }
    //       data = JSON.stringify({
    //         "c_status": `${element.c_status}`
    //       });
    //   }
    // });

    // setTableDataItems(tbc);
    // var config = {
    //   method: 'put',
    //   url: `http://127.0.0.1:3003/admin/vendor/${r.id}`,
    //   headers: {
    //     'slug': 'tenant1',
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios(config)
    // .then(function (response) {
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
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
      selector: (row) => row.u_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.u_email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.u_mobile,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.created_on,
      sortable: true,
    },
    {
      name: "Panel Status",
      selector: (row) => {
        // return userRoles.filter(role => role.id == row.user_role);

        //console.log(row.user_role);
        let returnValue = null;
        userRoles.forEach((role) => {
          console.log(role.name);
          if (role.id == row.user_role) {
            console.log("If is Correct ");
            returnValue = role.name;
          }
        });
        return returnValue;
      },
      sortable: true,
    },
    {
      name: "Points",
      selector: (row) => row.points,
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
    {
      name: "Delete",
      cell: (r) => (
        <button
          className="btn btn-outline-danger btn-sm"
          disabled
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
            <h4 className="mb-3 mb-md-0">All Users</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/tenant/addVendorUser")}
            >
              Register User
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <DataTable
              title="Users"
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
