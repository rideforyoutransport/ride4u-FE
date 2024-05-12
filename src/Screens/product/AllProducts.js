import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const ButtonEdit = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-outline-success btn-sm"
      type="button"
      onClick={(e) => {
        navigate(`/tenant/editProd?prod=${id}`);
      }}
    >
      Edit
    </button>
  );
};
const ButtonDelete = () => (
  <button
    type="button"
    data-id="256"
    className="btn btn-sm  btn-outline-danger"
  >
    Delete{" "}
  </button>
);

export default function AllProducts() {
  const [productCategories, setProductCategories] = useState([]);
  const [productSubCategories, setProductSubCategories] = useState([]);
  const [modalName, setModalName] = useState("");
  const [modalNo, setModalNo] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState(0);
  const [allProductsList, setAllProductsList] = useState([]);

  const navigate = useNavigate();

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [allProductsListFiltered, setAllProductListFiltered] = useState([
    {
      id: 0,
      p_name: "",
      p_description: "",
      p_creation: "",
      qty: 3,
      modelNo: "",
      qr_type: 0,
      subCategoryName: "",
    },
  ]);

  const handleFilter = (e) => {
    let filteredItems = allProductsList.filter(
      (item) =>
        item.categoryname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.p_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.p_description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.subcategoryname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.modelno.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setAllProductListFiltered(filteredItems);
  };

//  const handleFilterSubmit =()=>{

  
//     let filteredItems = allProductsList.filter(
//       (item) => {
//         if(productCategory.length > 0){
//         item.categoryname
//         .toLowerCase()
//         .includes(productCategory)
//       }
//       })

//   }

  const [columns, setColums] = useState([
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.p_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.p_description,
      sortable: true,
    },
    {
      name: "Creation Date",
      selector: (row) => row.p_creation,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.subcategoryname,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "Model No",
      selector: (row) => row.modelno,
      sortable: true,
    },
    {
      name: "QR Type",
      selector: (row) => row.qr_type,
      sortable: true,
    },
    {
      name: "Edit",
      button: true,
      cell: (row) => <ButtonEdit id={row.id} />,
    },
    {
      name: "Delete",
      button: true,
      cell: (row) => <ButtonDelete id={row.id} />,
    },
  ]);

  useEffect(() => {
    let configPsc = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodSubCategory/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    let configPc = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodCategory/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(configPsc)
      .then(function (response) {
        setProductSubCategories(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(configPc)
      .then(function (response) {
        setProductCategories(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/product/allDetails",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        setAllProductsList(response.data);
        setAllProductListFiltered(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setProductCategory(event.target.value);
    console.log({ productCategory });
  };
  const handleProductCategoryChange = (event) => {
    setProductSubCategory(event.target.value);
    console.log({ productSubCategory });
  };
  const addProduct = () => {
    navigate("/tenant/addProd");
  };

  return (
    <div className="page-content">
      {
        //   <nav className="page-breadcrumb">
        //   <ol className="breadcrumb">
        //     <li className="breadcrumb-item">
        //       <a href="#">Tables</a>
        //     </li>
        //     <li className="breadcrumb-item active" aria-current="page">
        //       Data Table
        //     </li>
        //   </ol>
        // </nav>
      }

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Products</div>
              <div action="#" id="filterForm" style={{ display: "initial" }}>
     {       /*   
              <div className="row mx-10 px-1 my-2 ">
                  <div className="col-md-12 my-1">
                    <div>
                      <div>
                        <button className="btn btn-outline-primary px-2 mx-2"
                          aria-label="Increment value"
                          onClick={() => dispatch(increment())}
                        >
                          Increment
                        </button>
                        <span>{count}</span>
                        <button className="btn btn-outline-danger px-2 mx-2"
                          aria-label="Decrement value"
                          onClick={() => dispatch(decrement())}
                        >
                          Decrement
                        </button>
                        <button className="btn btn-outline-danger px-2 mx-2"
                        aria-label="Decrement value"
                        onClick={() => dispatch(incrementByAmount(3))}
                      >
                        By Amount
                      </button>
                      <button onClick={()=>navigate('/tenant/verifyQrCode')}>VerifyQrCode</button> 
                    </div>
                  </div>
             
                </div>
              
              </div>
                   */}

                <div className="row">
                  <div className="form-group col-md-3">
                    <label>Category</label>
                    <select
                      className="form-control"
                      id="catgory"
                      name="cat_id"
                      value={productCategory}
                      onChange={handleChange}
                    >
                      <option value={0}>Select Category</option>
                      {productCategories.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                          {" "}
                          {ele.categoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Sub Category</label>
                    <select
                      className="form-control"
                      id="catgory"
                      name="cat_id"
                      value={productSubCategory}
                      onChange={handleProductCategoryChange}
                    >
                      <option value="0">Select Sub Category</option>
                      {productSubCategories.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                          {ele.subcategoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Model Name</label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_box"
                      min={0}
                      type="text"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Model No </label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_box"
                      min={0}
                      type="number"
                      value={modalNo}
                      onChange={(e) => setModalNo(e.target.value)}
                    />
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
              {/*
                <button
                type="button"
                id="exportCsv"
                className="btn btn-outline-primary float-right ml-2"
              >
                Export Excel
              </button>
              <a
                href="https://mira-dev.genuinemark.org/category/upload"
                className="btn btn-success ml-2 float-right"
              >
                Upload
              </a>
            */}
            
              <button className="btn btn-outline-success float-right mb-3" 
              onClick={addProduct}>Add </button>
              <h6 className="card-title"></h6>

              <div className="table-responsive">
                <div className="row">
                  <div className="col-sm-12 col-md-12"></div>
                  <div className="col-sm-12 col-md-12">
                    <div
                      id="dataTableExample_filter"
                      className="dataTables_filter"
                    >
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
                  data={allProductsListFiltered}
                  pagination
                />

                {/*

                <table id="dataTableExample" className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Creation Date</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Qty</th>
                      <th>Model No</th>
                      <th>Qr Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProductsList.map((prod) => (
                      <tr key={prod.id}>
                        <td>{prod.p_name}</td>
                        <td>{prod.p_description}</td>
                        <td>{prod.p_creation}</td>
                        <td>{prod.categoryName}</td>
                        <td>{prod.subCategoryName}</td>
                        <td>{prod.qty}</td>
                        <td>{prod.modalNo}</td>
                        <td>{prod.qr_type}</td>
                        <td>
                          <a
                            // href="https://mira-dev.genuinemark.org/Product/product-category/256"
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
                    ))}
                  <tr>
                      <td>Airi Satou</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>33</td>
                      <td>2008/11/28</td>
                      <td>$162,700</td>
                      <td>
                        <a
                         // href="https://mira-dev.genuinemark.org/Product/product-category/256"
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
              </tr>*
                  </tbody>
                    </table>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
