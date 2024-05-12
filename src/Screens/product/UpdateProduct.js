import React, { useEffect, useState } from "react";
import axios from "axios";
import { tenant } from "../../utils/tenant";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState(0);
  const [modalName, setModalName] = useState("");
  const [modalNo, setModalNo] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSubCategoryId, setProductSubCategoryId] = useState(0);
  const [productQty, setProductQty] = useState(0);
  const [qrType, setQrType] = useState(0);
  const [prodId, setProdId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    console.log(window.location.search.split("=")[1]);
    setProdId(()=>window.location.search ? window.location.search.split("=")[1]:null);
   const produtId=  window.location.search ? window.location.search.split("=")[1]:null;
   
if(produtId){
    var configProd = {
      method: "get",
      url: `http://127.0.0.1:3003/api/product/${window.location.search.split("=")[1]}`,
      headers: {
        slug: tenant
      },
    };

    axios(configProd)
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setModalName(data.p_name);
        setProductDescription(data.p_description);
        setProductCategoryId(data.productcategories);
        setProductSubCategoryId(data.productsubcategory);
        setQrType(data.qr_type);
        setProductQty(data.qty);
        setModalNo(data.modelno);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
  }, []);

  /// for fetching sub categories

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/api/prodSubCategory/subCat/${productCategoryId}`,
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
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

  const editProduct = (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      p_name: modalName,
      p_description: productDescription,
      productCategories: parseInt(productCategoryId),
      productSubCategory: parseInt(productSubCategoryId),
      modelNo: parseInt(modalNo),
      qty: productQty,
      qr_type: qrType,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/api/product/${prodId}`,
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setProductDescription("");
        setProductQty(0);
        setModalName("");
        setModalNo(0);
        console.log(response.data);
        navigate("/tenant/allProducts");
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
  };
  const handleQrChange = (event) => {
    setQrType(parseInt(event.target.value));
    console.log({ qrType });
  };

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
                    <label>QR Type</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={qrType}
                      onChange={handleQrChange}
                    >
                      <option value={0}>Simple</option>
                      <option value={1}>Complex</option>
                    </select>
                  </div>
                  <div className="col-md-6 ">
                    <label>No of Pieces in the box </label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_box"
                      min={0}
                      value={productQty}
                      onChange={(e) => {
                        setProductQty(e.target.value);
                      }}
                      type="number"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Select Category</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={productCategoryId}
                      onChange={handleChange}
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
                      onChange={handleProductCategoryChange}
                    >
                      {subCategoryList.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.subcategoryname}
                        </option>
                      ))}
                      <option value={0}>Select Product Sub Category</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Model Name </label>
                    <input
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 ">
                    <label>Model No </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={modalNo}
                      onChange={(e) => setModalNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label>Product Description</label>
                    <textarea
                      id="maxlength-textarea"
                      className="form-control"
                      maxLength="100"
                      rows="4"
                      value={productDescription}
                      placeholder="This textarea has a limit of 100 chars."
                      onChange={(e) => setProductDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => editProduct(e)}
                      disabled={prodId?false:true}
                    >
                      Update Product
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
