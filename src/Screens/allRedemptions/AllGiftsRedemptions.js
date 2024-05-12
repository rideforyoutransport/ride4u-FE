import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from 'react-google-qrcode';
import { tenant } from "../../utils/tenant";



export default function AllGiftsRedemptions() {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [tableDataItems, setTableDataItems] = useState([]);
  const [transactionState, setTransactionState] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {
 
  
var config = {
    method: 'get',
    url: 'http://127.0.0.1:3003/api/giftRedemption/',
    headers: { 
      'slug': tenant
    }
  };



var configTxnStatus = {
  method: 'get',
  url: 'http://127.0.0.1:3003/admin/transactionStatus/get',
  headers: { 

  },
};

axios(configTxnStatus)
.then(function (response) {
  setTransactionState(response.data);
})
.catch(function (error) {
  console.log(error);
});




    
  var configRoles = {
    method: 'get',
    url: 'http://127.0.0.1:3003/api/userPermission/',
    headers: { 
      'slug': tenant
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
      setTableDataItems(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])
  
  const handleButtonEditClick=(r)=>{
    //console.log(r);
    //handle the edit functionality 
    navigate('/tenant/giftDetails', {state:r});

  }

  const handleButtonDeleteClick = (r) => {
    //console.log(r);
var config = {
  method: 'delete',
  url: `http://127.0.0.1:3003/api/gift/${r.id}`,
  headers: { 
    'slug': tenant
  }
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
    let tbc=[...tableDataItems];
    tbc.forEach((element,idx)=>{
        
         if(element.id==r.id){
          tbc.splice(idx,1);
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
        width: '60px',
       
      },
      {
        name: "Name",
        selector: (row) => row.u_name,
        sortable: true,
        maxWidth: '100px'
        
      },
      {
        name: "Mobile",
        selector: (row) => row.u_mobile,
        sortable: true,
        maxWidth:'140px'
      },
      {
        name: "State",
        selector: (row) => row.u_address.state,
        sortable: true,
        maxWidth:'120px'
      },
      {
        name: "Points",
        selector: (row) => row.points_used,
        sortable: true,
        maxWidth:'100px'
      },
      {
        name: "Request On",
        selector: (row) => row.created_on,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => {

             //console.log(row.user_role);
        let returnValue = "Pending";
        transactionState.forEach((role) => {
        //  console.log(role);
          if (role.id == row.status) {
        //    console.log("If is Correct ");
            returnValue = role.status_name;
          }
        });
        return returnValue;
        },
        sortable: true,
      },
      {
        name:"Actions",
        cell: (r) => <button  className="btn btn-outline-success btn-sm" onClick={()=>handleButtonEditClick(r)}>View Details</button>,
        ignoreRowClick: true,
        allowOverflow: false,
        
      },
     
    ];
  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">All Gift Redemptions </h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
        {  /*
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/tenant/giftAdd")}
            >
              Add Gift
            </button>
  */ }
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <DataTable
              title="Gift Redemptions"
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
