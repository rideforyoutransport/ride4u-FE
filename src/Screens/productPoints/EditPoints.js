import React, { useEffect, useState } from "react";
import axios from "axios";
import { tenant } from "../../utils/tenant";

export default function EditPoints() {
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState(0);
  const [productSubCategoryId, setProductSubCategoryId] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [productListFiltered, setProductListFiltered] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [productPoints, setProductPoints] = useState(0);
  const [productPointsId, setProductPointsId] = useState(null);

  useEffect(() => {
    var configProd = {
      method: "get",
      url: "http://127.0.0.1:3003/api/product/",
      headers: {
        slug: tenant,
      },
    };

    axios(configProd)
      .then(function (response) {
        //console.log(response.data);
        setProductsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    var config1 = {
      method: "get",
      url: "http://127.0.0.1:3003/api/prodCategory/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(config1)
      .then(function (response) {
        setProductCategoryList(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [productCategoryId]);

  useEffect(() => {
    console.log(window.location.search.split("=")[1]);
    let pp_id = window.location.search
      ? window.location.search.split("=")[1]
      : null;
    setProductPointsId(pp_id);

    console.log({ pp_id });

    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/api/prodPoints/${pp_id}`,
      headers: {
        slug: tenant,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);

        setProductCategoryId(response.data.cat_id);
        setProductSubCategoryId(response.data.sub_cat_id);
        setSelectedProduct(response.data.p_id);
        setProductPoints(response.data.points);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var data = JSON.stringify({
      categoryName: "Indoor",
    });

    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/api/prodSubCategory/subCat/${productCategoryId}`,
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
      data: data,
    };
    if (productCategoryId != 0) {
      axios(config)
        .then(function (response) {
          console.log(response.data.length);
          setSubCategoryList(response.data);
          //console.log(response.data);
        })
        .catch(function (error) {
          setSubCategoryList([]);
          console.log(error);
        });
    }
  }, [productCategoryId]);

  const updatePoints = (e) => {
    e.preventDefault();

    // var data = JSON.stringify({
    //   p_name: modalName,
    //   p_description: productDescription,
    //   productCategories: parseInt(productCategoryId),
    //   productSubCategory: parseInt(productSubCategoryId),
    //   modelNo: parseInt(modalNo),
    //   qty: productQty,
    //   qr_type: qrType,
    // });
    var data = JSON.stringify({
      cat_id: productCategoryId,
      sub_cat_id: productSubCategoryId,
      p_id: selectedProduct,
      points: productPoints,
      user_type: 1,
      created_by: 39,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/api/prodPoints/${productPointsId}`,
      headers: {
        slug: tenant,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setProductCategoryId(event.target.value);
    console.log({ productCategoryId });
  };
  const handleProductCategoryChange = (event) => {
    setProductSubCategoryId(event.target.value);
    console.log({ productSubCategoryId });
    //updateProductFilteredList();
  };
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    console.log({ selectedProduct });
    //updateProductFilteredList();
  };

  useEffect(() => {
    let prodFiltered = [];
    productsList.map((e) => {
      //console.log(e.productcategories,productCategoryId)

      if (
        e.productcategories == productCategoryId &&
        e.productsubcategory == productSubCategoryId
      ) {
        prodFiltered.push(e);
      }
    });
    //prodFiltered = prodFiltered.filter((item)=> item.productcategories==productCategoryId);
    setProductListFiltered(prodFiltered);
    console.log({ prodFiltered });
  }, [productCategoryId, productSubCategoryId]);

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add New Product</h4>

              <div className="cmxform">
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Select Category</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={productCategoryId}
                      onChange={(e) => handleChange(e)}
                    >
                      {productCategoryList.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.categoryname}
                        </option>
                      ))}
                      <option value={0}>Select Product Category</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Select Sub Category</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={productSubCategoryId}
                      onChange={(e) => handleProductCategoryChange(e)}
                    >
                      <option value={0}>Select Product Sub Category</option>
                      {subCategoryList.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.subcategoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Select Product</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={selectedProduct}
                      onChange={handleProductChange}
                    >
                      {productListFiltered.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.p_name}
                        </option>
                      ))}
                      <option value={0}>Select Product</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Product Points </label>
                    <input
                      id="pPoints"
                      className="form-control"
                      name="p_points"
                      min={0}
                      onChange={(e) => {
                        setProductPoints(e.target.value);
                      }}
                      value={productPoints}
                      type="number"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => updatePoints(e)}
                    >
                      Update Points
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
