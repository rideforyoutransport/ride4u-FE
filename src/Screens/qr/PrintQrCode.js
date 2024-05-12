import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";
import { useNavigate } from "react-router-dom";


export default function PrintQrCode() {

  const [qrCodeList, setQrCodeList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [productSelected, setProductSelected] = useState(0);
  const [allQrPrintListFiltered, setAllQrPrintListFiltered] = useState([{
    "id": 0,
    "creation": "",
    "batch_id": 0,
    "product_id": "0",
    "qr_count": 0,
    "p_name": "",
    "b_name": ""
}])
const navigation = useNavigate();

  const [columns, setColums] = useState([
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Batch Name",
      selector: (row) => row.b_name,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.p_name,
      sortable: true,
    },
    {
      name: "Qr Count",
      selector: (row) => row.qr_count,
      sortable: true,
    },
    {
      name: "Creation",
      selector: (row) => row.creation,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => <button className="btn btn-outline-success btn-sm" type="button" 
      onClick={()=>{
        navigation('/tenant/viewQr', {state:row});
      }}>
        View
      </button>
    }
    
  ]);


  const handleChange = (event) => {
    setProductSelected(event.target.value);
    console.log({ productSelected });
  };


  useEffect(() => {
var data = JSON.stringify({
  "title": ""
});

var config = {
  method: 'get',
  url: 'http://127.0.0.1:3003/api/qr/',
  headers: { 
    'Content-Type': 'application/json',
    "slug":tenant

  },
  data : data
};

axios(config)
.then(function (response) {
setQrCodeList(response.data);
  console.log((response.data));
})
.catch(function (error) {
  console.log(error);
  setQrCodeList([]);
});


var configProdList = {
  method: "get",
  url: 'http://127.0.0.1:3003/api/product/',
  headers: {
    "Content-Type": "application/json",
  },
};

axios(config)
  .then(function (response) {
    setAllQrPrintListFiltered(response.data);
    setAllProductsList(response.data);
    //console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  
    
  }, []);
  const handleFilter= (e)=>{
    let filteredItems= allProductsList.filter((item)=> 
    item.p_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.b_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setAllQrPrintListFiltered(filteredItems);
    };
    
   
  
  return (
    <div className="page-content">
     

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title">QR Code Print </div>
            
              <div  id="filterForm" style={{ display: "initial" }}>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label >Product Name</label>
                    <select className="form-control" id="catgory" name="cat_id" value={productSelected} handleChange={handleChange}>
                      <option selected={productSelected} value={0}>
                        Select Product
                      </option>
                      {
                        allProductsList.map((prod)=><option key = {prod.id} value={prod.id}>{(prod.p_name)}</option>)
                      }
              
              
                   
                    </select>
                  </div>
                  <div className="col-md-3 form-group">
		                      <label className="control-label">From Date</label>
		                      <input type="date" name="from_date" className="form-control"/>
		                    </div>
                        <div className="col-md-3 form-group">
		                      <label className="control-label">End Date</label>
		                      <input type="date" name="end_date" className="form-control"/>
		                    </div>
                  <div className="col-md-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mt-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              {
                //   <h6 className="card-title">Data Table</h6>
                // <p className="card-description">
                //   Read the{" "}
                //   <a href="https://datatables.net/" target="_blank">
                //     {" "}
                //     Official DataTables Documentation{" "}
                //   </a>
                //   for a full list of instructions and other options.
                // </p>
              }
              <div className="table-responsive">


              <div className="row">
                <div className="col-sm-12 col-md-12">
                </div>
                <div className="col-sm-12 col-md-12">
                  <div id="dataTableExample_filter" className="dataTables_filter">
                    <label>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        onChange={handleFilter}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <DataTable
                className="table"
                columns={columns}
                data={allQrPrintListFiltered}
                pagination
              />

              {/* 
                <table id="dataTableExample" className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Batch Name</th>
                      <th>SKU</th>
                      <th>Qr Count</th>
                      <th>Creation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    qrCodeList.map((qr)=><tr key={qr.id}>
                    <td>{qr.id}</td>
                    <td>{qr.b_name}</td>
                    <td>{qr.p_name}</td>
                    <td>{qr.qr_count}</td>
                    <td>{qr.creation}</td>
                    <td>
                        <a
                          // href="https://mira-dev.genuinemark.org/Product/product-category/256"
                          className="btn btn-success btn-sm"
                        >
                          View
                        </a>
                        
                      </td>
                    </tr>)
                  }
                   { /* <tr>
                      <td>Airi Satou</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>33</td>
                      <td>2008/11/28</td>
                      <td>$162,700</td>
                      <td>
                        <a
                          href="https://mira-dev.genuinemark.org/Product/product-category/256"
                          className="btn btn-success btn-sm"
                        >
                          Edit
                        </a>
                        &nbsp;
                        <button
                          type="button"
                          data-id="256"
                          className="btn btn-sm  btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                </tr> 
                  </tbody>
                </table>
              */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
