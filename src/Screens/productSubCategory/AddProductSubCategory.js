import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tenant } from "../../utils/tenant";

export default function AddProductSubCategory() {
  const [productSubCategoryName, setProductSubCategoryName] = useState("");
  const [selectedProd, setSelectedProd] = useState("");
  const [productCategoryList, setProductCategoryList] = useState([]);

  const navigate = useNavigate();

  const cancelAddProductSubCategory = () => {
    navigate("/tenant/productSubCategory");
  };

  const handleChange = (event) => {
    setSelectedProd(()=>event.target.value);
    console.log(event.target.value);
  };
  const addProductSubCat = () => {
    if (productSubCategoryName.length > 0 && selectedProd != 0) {
      // Hit the Api for adding product category
      var data = JSON.stringify({
        productCategory: selectedProd,
        subCategoryName: productSubCategoryName,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/api/prodSubCategory/",
        headers: {
          "Content-Type": "application/json",
          slug: tenant,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          navigate("/tenant/prodSubCategory")
          //console.log(response.data);
          selectedProd("");
          setProductSubCategoryName("");
        
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // add logic to display the error
    }
  };

  useEffect(() => {
    // Hit the APi to get the product category

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodCategory/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        setProductCategoryList(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-content">
      {
        // <nav className="page-breadcrumb">
        //     <ol className="breadcrumb">
        //       <li className="breadcrumb-item">
        //         <a href="#">Forms</a>
        //       </li>
        //       <li className="breadcrumb-item active" aria-current="page">
        //         Advanced Elements
        //       </li>
        //     </ol>
        //   </nav>
      }
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Product Subcategory</h4>

              <div className="cmxform" id="signupForm" >
                <div className="form-group row">
                  <div className="col-md-12">
                    <label>Product Category</label>

                    <select
                      className="js-example-basic-single w-100"
                      value={selectedProd}
                      onChange={handleChange}
                    >
                    <option value={0}>
                          Select Category
                        </option>
                      {productCategoryList.map((prod) => (
                        
                        <option key={prod.id} value={prod.id}>
                          {prod.categoryname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <label for="name">Sub Category Name </label>
                    <input
                      id="name"
                      className="form-control"
                      value={productSubCategoryName}
                      onChange={(e) => {
                        setProductSubCategoryName(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mt-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={addProductSubCat}
                    >
                      Add Category
                    </button>
                  </div>
                  <div className="col-md-6 mt-3">
                    <button
                      type="cancel"
                      className="btn btn-outline-danger mr-2 w-100"
                      onClick={cancelAddProductSubCategory}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
