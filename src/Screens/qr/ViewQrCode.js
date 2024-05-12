import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QRCode from "react-qr-code";
//import { QRCode } from 'react-qrcode-logo';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #00000069',
    boxShadow: 24,
    borderRadius:"10px",
    p: 4,
  };



export default function ViewQrCode() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {setOpen(false);};
    const [currentQrCode, setCurrentQrCode] = useState("");



    const location = useLocation();

  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);
  const [productCategoriesFiltered, setProductCategoriesFiltered] = useState([
    {
      id: 0,
      categoryName: "testing",
      creationTime: "2022-12-01T01:21:57.000Z",
    },
  ]);

  const handleFilter = (e) => {
    let filteredItems = productCategories.filter((item) =>
      item.p_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.p_description.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setProductCategoriesFiltered(filteredItems);
  };

  const [columns, setColums] = useState([
    {
      name: "S.No",
      selector: (row,idx) => idx+1,
      sortable: true,
    },
    {
      name: "Qr Code",
      selector: (row) => row.unique_id,
      sortable: true,
    },
    {
      name: "Batch Code",
      selector: (row) => location.state.b_name,
      sortable: true,
    },
    {
      name: "Creation Time",
      selector: (row) => row.qr_creation,
      sortable: true,
    },
    {
        name: "Type",
        cell: (row) => <button className={row.qr_type?'btn btn-sm  btn-outline-secondary':'btn btn-sm  btn-outline-info'}> {row.qr_type?"Parent":"Child"}</button> ,
        sortable: true,
      },
    {
      name: "View",
      button: true,
      cell: (row) => <button className="btn btn-outline-success btn-sm" type="button" onClick={()=>
     {
        setCurrentQrCode(row.unique_id);
setOpen((os)=>{return !os})
    }
      }>
        View
      </button>,
    }
  ]);

  const addProductCategory = () => {
    navigate("/tenant/addPoints");
  };

  useEffect(() => {

    console.log(location.state);


var config = {
  method: 'get',
  url: `http://127.0.0.1:3003/api/qr/${location.state.id}`,
  headers: { 
    'slug': tenant, 
    'Content-Type': 'application/json'
  },
};

axios(config)
.then(function (response) {
  //console.log((response.data));
  setProductCategoriesFiltered(response.data);
  setProductCategories(response.data);
})
.catch(function (error) {
  console.log(error);
});


  }, []);

  return (
    <div className="page-content">
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>

    <QRCode
    size={120}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={`http://localhost:3000/verifyQrCode?code=${currentQrCode}&tenant=${tenant}`}
    viewBox={`0 0 256 256`}
    />
<h2 className="text-center my-2 py-2 mx-0 font-weight-bold" style={{maxwidth:'140px'}}>{`http://localhost:3000/verifyQrCode?code=${currentQrCode}&tenant=${tenant}`}</h2>
    </Box>
  </Modal>
      {/*
    <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Tables</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data Table
          </li>
        </ol>
      </nav>
     */}
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Product Points</div>
              {
                //					<button type="button" id="exportCsv" className="btn btn-outline-primary float-right ml-2">Export Excel</button>
                //				<a href="https://mira-dev.genuinemark.org/category/upload" className="btn btn-success ml-2 float-right">Upload</a>
              }
              <button
                className="btn btn-success float-right"
                onClick={addProductCategory}
              >
                Add
              </button>
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
                  <div className="col-sm-12 col-md-12"></div>
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
                  data={productCategoriesFiltered}
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
