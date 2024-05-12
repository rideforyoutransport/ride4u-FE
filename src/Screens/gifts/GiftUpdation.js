import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useLocation, useNavigate } from "react-router-dom";
import { tenant } from "../../utils/tenant";

export default function GiftUpdation() {
   const location = useLocation();
  console.log(location);

  const [giftName, setGiftName] = useState(location.state.g_name||"");
  const [brandName, setCompanyEmail] = useState(location.state.g_brand||"");
  const [points, setCompanyPassword] = useState(location.state.g_value||"");
  const [price, setPrice] = useState(location.state.g_price||"");
  const [picture, setPicture] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [status, setStatus] = useState(location.state.status||false);
  const [vendorId, setVendorId] = useState(0);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(location.state.user_type||0);

  // errors

  const [brandNameError, setBrandNameError] = useState(null);
  const [pointsError, setPointsError] = useState(null);
  const [masterError, setMasterError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [logoErr, setLogoErr] = useState(null);

  useEffect(() => {
    if (!brandNameError && !pointsError && !priceError) {
      setMasterError(null);
    }
  }, [brandNameError, pointsError, priceError]);

  const handleUserRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    ////////////////////////////////////////////////////////////////

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/userPermission/",
      headers: {
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUserRoles(() => response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlePriceChange = (event) => {
    if (!event.target.value > 0) {
      setPriceError("Price is Mandatory");
    } else {
      setPriceError(null);
    }
    setPrice(event.target.value);
  };

  const handleBrandNameChange = (event) => {
    console.log(event.target.value);
    console.log(validator.isEmail(event.target.value));
    if (!event.target.value.length > 0) {
      setBrandNameError("Add Brand Name ");
    } else {
      setBrandNameError(null);
    }
    setCompanyEmail(event.target.value);
  };

  const handlePointsChange = (event, type) => {
    if (!event.target.value.length > 0) {
      setPointsError("Points cannot be null");
    } else {
      setPointsError(null);
    }
    setCompanyPassword(event.target.value);
  };

  const addNewVendor = (e) => {
    e.preventDefault();
    if (
      brandNameError == null &&
      priceError == null &&
      pointsError == null &&
      brandName.length > 0 &&
      giftName.length > 0
    ) {
      if (document.getElementById("file").files[0]) {
        const formData = new FormData();
        formData.append("g_value", points);
        formData.append("file", document.getElementById("file").files[0]);
        formData.append("g_name", giftName);
        formData.append("g_brand", brandName);
        formData.append("g_price", price);
        formData.append("user_type", selectedRole);
        formData.append("status", status);

        console.log(formData);
        var config = {
          method: 'put',
          url: `http://127.0.0.1:3003/api/gift/${location.state.id}`,
          headers: { 
            'slug': tenant, 
          },
          data : formData
        };



        axios(config)
          .then(function (response) {
            console.log(response.data);
       //     const { id } = response.data.data;

           
            //  resetValues();
              alert(`Gift Edited successfully`);
            //  navigate(`/tenant`);
            //
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {});
      } else {
        setLogoErr("Upload Image First");
      }
    } else {
      setMasterError(
        "Please Fill All the Required fields and check the errors",
      );
    }
  };

  const resetValues = () => {
    setGiftName("");
    setCompanyEmail("");
    setCompanyPassword("");
    setPrice("");
    setStatus(0);
    setPicture(null);
    setThumbnail(null);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Gift</h4>
              <div className="cmxform">
                <div className="form-group row">
                  <div className="col-md-6 my-3">
                    <label>Gift Name </label>
                    <input
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={giftName}
                      onChange={(e) => setGiftName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Brand Name </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={brandName}
                      onChange={(e) => handleBrandNameChange(e)}
                    />
                    {brandNameError && (
                      <p className="text-danger mx-2 my-2">{brandNameError}</p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Points to Redeem </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="password"
                      type="number"
                      value={points}
                      onChange={(e) => handlePointsChange(e)}
                    />
                    {pointsError && (
                      <p className="text-danger mx-2 my-2">{pointsError}</p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Price</label>
                    <input
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="number"
                      value={price}
                      onChange={(e) => handlePriceChange(e)}
                    />
                    {priceError && (
                      <p className="text-danger mx-2 my-2">{priceError}</p>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6 my-1">
                    <label className="my-1">Status</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>In-Active</option>
                    </select>
                  </div>
                  <div className="col-md-6 my-1">
                    <label className="my-1">User Role</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={selectedRole}
                      onChange={handleUserRoleChange}
                    >
                      <option value={0}>Select User</option>

                      {userRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 my-3">
                    <img
                      className="userUpdateImg"
                      src={picture ? picture : ""}
                      alt=""
                    />
                    <label htmlFor="file">Upload Image</label>
                    <div>
                      <input
                        data-testid="fileInput"
                        type="file"
                        id="file"
                        accept="image/jpeg ,image/png  , image/jpg"
                        onChange={(e) => {
                          setPicture(URL.createObjectURL(e.target.files[0]));
                          setThumbnail(e.target.files);
                        }}
                      />
                    </div>
                    {logoErr && (
                      <p className="text-danger mx-2 my-2">{logoErr}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => addNewVendor(e)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {masterError && (
                <p className="text-danger mx-2 my-2">{masterError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
