import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";
import { useSelector } from "react-redux";



const ButtonEdit = () => (
  <button className="btn btn-outline-success btn-sm" type="button">
    Edit
  </button>
);
const ButtonDelete = () => (
  <button
    type="button"
    data-id="256"
    className="btn btn-sm  btn-outline-danger"
  >
    Delete{" "}
  </button>
);

export default function ProductCategory() {

  const rewardiOptions = useSelector((state) => state.counter.rewardifyOptions);

  console.log({rewardiOptions});
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState([]);

  const [productCategoriesFiltered, setProductCategoriesFiltered] = useState([{
    id: 0,
    categoryName: "testing",
    creationTime: "2022-12-01T01:21:57.000Z",
  },])

const handleFilter= (e)=>{
  let filteredItems= productCategories.filter((item)=> 
  item.categoryname.toLowerCase().includes(e.target.value.toLowerCase())
  )
  
  setProductCategoriesFiltered(filteredItems);
  };
  
  const [columns, setColums] = useState([
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "Creation Time",
      selector: (row) => row.creationtime,
      sortable: true,
    },
    {
      name: "Edit",
      button: true,
      cell: () => <ButtonEdit />,
    },
    {
      name: "Delete",
      button: true,
      cell: () => <ButtonDelete />,
    },
  ]);

  const addProductCategory = () => {
    navigate("/tenant/addProductCategory");
  };

  useEffect(() => {
    var data = JSON.stringify({
      categoryName: "Indoor",
    });

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodCategory/",
      headers: {
        "Content-Type": "application/json",
        'slug': tenant
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setProductCategories(response.data);
        setProductCategoriesFiltered(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-content">
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

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Categories</div>
              {
                //					<button type="button" id="exportCsv" className="btn btn-outline-primary float-right ml-2">Export Excel</button>
                //				<a href="https://mira-dev.genuinemark.org/category/upload" className="btn btn-success ml-2 float-right">Upload</a>
              }{" "}
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
                  data={productCategoriesFiltered}
                  pagination
                />
{/*
<table id="dataTableExample" className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Category Name</th>
                      <th>Creation Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCategories.map((cat) => {
                      return (
                        <tr key={cat.id}>
                          <td>{cat.id}</td>
                          <td>{cat.categoryName}</td>
                          <td>{cat.creationTime}</td>
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
                      );
                    })}
                  </tbody>
                </table> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
