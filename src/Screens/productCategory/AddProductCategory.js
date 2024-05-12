import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tenant } from "../../utils/tenant";

export default function AddProductCategory() {
  const [productCategoryName, setProductCategoryName] = useState("");
  const navigate = useNavigate();

  const cancelAddProductCategory = () => {
    navigate("/productCategory");
  };
  const addProductCat = () => {
    if (productCategoryName.length > 0) {
      // Hit the Api for adding product category

      var data = JSON.stringify({
        categoryName: productCategoryName,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/api/prodCategory/",
        headers: {
          "Content-Type": "application/json",
          'slug':tenant
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
          navigate("/tenant/productCategory")
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // add logic to display the error
    }
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Forms</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Advanced Elements
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add New Product</h4>

              <div className="cmxform" id="signupForm">
                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="name">Category Name</label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_cat"
                      type="text"
                      value={productCategoryName}
                      onChange={(e) => setProductCategoryName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mt-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={addProductCat}
                    >
                      Add Category
                    </button>
                  </div>
                  <div className="col-md-6 mt-3">
                    <button
                      type="cancel"
                      className="btn btn-outline-danger mr-2 w-100"
                      onClick={cancelAddProductCategory}
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
