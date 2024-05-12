import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";


const ButtonDelete = () => (
  <button
    type="button"
    data-id="256"
    className="btn btn-sm  btn-outline-danger"
  >
    Delete{" "}
  </button>
);

export default function ProductPoints() {
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
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.p_name,
      sortable: true,
    },
    {
      name: "Product Description",
      selector: (row) => row.p_description,
      sortable: true,
    },

    {
      name: "Points",
      selector: (row) => row.points,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => <button className={row.status?'btn btn-sm  btn-outline-primary':'btn btn-sm  btn-outline-danger'}> {row.status?"True":"False"}</button> ,
      sortable: true,
    },
    {
      name: "Creation Time",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Edit",
      button: true,
      cell: (row) => <button className="btn btn-outline-success btn-sm" type="button" onClick={()=>{
        navigate(`/tenant/editPoints?id=${row.id}`);
      //  ?prod=${id}`
        //console.log("jgvgvg")
      }}>
        Edit
      </button>,
    },
    {
      name: "Delete",
      button: true,
      cell: () => <ButtonDelete />,
    },
  ]);

  const addProductPoints = () => {
    navigate("/tenant/addPoints");
  };

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodPoints/",
      headers: {
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setProductCategories(response.data);
        setProductCategoriesFiltered(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-content">
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
                onClick={addProductPoints}
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
