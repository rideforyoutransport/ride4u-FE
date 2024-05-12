import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tenant } from "../../utils/tenant";

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

export default function ProductSubCategory() {
  const navigate = useNavigate();
  const [selectedProd, setSelectedProd] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryListFiltered, setSubCategoryListFiltered] = useState([]);

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
      name: "Sub Category Name",
      selector: (row) => row.subcategoryname,
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

  const handleFilter = (e) => {
    let filteredItems = subCategoryList.filter(
      (item) =>
        item.categoryname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.subcategoryname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()),
    );
    setSubCategoryListFiltered(filteredItems);
  };

  const addProduct = () => {
    navigate("/tenant/addProductSubCategory");
  };

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodSubCategory/",
      headers: {
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        setSubCategoryList(response.data);
        setSubCategoryListFiltered(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Sub Categories</div>
              {/*<button
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
              </a>*/}
              <button
                className="btn btn-success float-right"
                onClick={addProduct}
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
                  data={subCategoryListFiltered}
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
