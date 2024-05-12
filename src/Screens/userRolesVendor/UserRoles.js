import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { tenant } from "../../utils/tenant";

export default function UserRoles() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {

    var config = {
      method: 'get',
      url: 'http://127.0.0.1:3003/api/userPermission/',
      headers: { 
        'slug': tenant
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log((response.data));
      setTableDataItems(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }, [])
  
  const handleButtonEditClick=(r)=>{

    //handle the edit functionality 
    navigate(`/tenant/editRoles?industry=${r.id}`)

  }
  const handleDeleteRole=(r)=>{

    //handle the edit functionality 
  var config = {
    method: 'delete',
    url: `http://127.0.0.1:3003/api/userPermission/${r.id}`,
    headers: { 
      'slug': tenant
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log((response.data));
    alert("Role Deleted successfully");
    navigate("/tenant");
  })
  .catch(function (error) {
    console.log(error);
  });
  
  }

  const handleButtonClick = (r) => {
    console.log(r);
    console.log(tableDataItems);
    let tbc=[...tableDataItems];
    let data;
    tbc.forEach((element)=>{
        
         if(element.id==r.id){
          if(element.c_status==0) {element.c_status=1;
          console.log("status changed to 1 ")
          }
          else {element.c_status=0;
            console.log("status changed to 0 ")
          }
          data = JSON.stringify({
            "c_status": `${element.c_status}`
          }); 
      }
    });
   
    setTableDataItems(tbc);
    var config = {
      method: 'put',
      url: `http://127.0.0.1:3003/admin/vendor/${r.id}`,
      headers: { 
        'slug': 'tenant1', 
        'Content-Type': 'application/json'
      },
      data : data
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
        maxWidth: '10px',
        grow: 0,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        
      },
    
      {
        name: "Created On",
        selector: (row) => row.created_on,
        sortable: true,
      },
      {
        name:"Action",
        cell: (r) => <span className="row">
        <button  className="btn btn-outline-secondary btn-sm " onClick={()=>handleButtonEditClick(r)}>Edit</button>
        <button  className="btn btn-outline-danger btn-sm mx-2" onClick={()=>handleDeleteRole(r)}>Delete</button>

        </span>
        
        
        ,
        ignoreRowClick: true,
        allowOverflow: true,
       
      }
    ];
  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">Welcome to Industry Master</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/tenant/addRoles")}
            >
              Add New Role
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">

            <DataTable
              title="User Roles"
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
