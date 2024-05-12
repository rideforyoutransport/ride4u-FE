import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompanyUpdation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [companyId, setCompanyId] = useState(location.state.id || "");

  console.log(location.state)

  const companyAddressObj = {
    homeAddress: "",
    state: "",
    country: "",
    state: "",
    district: "",
    landMark: "",
    city: "",
    pincode: "",
  };
  const companySocialMediaObj = {
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
  };

  const productsAvailingObj = {
    Genuinity: false,
    DWAN: false,
    ScanAndWin: false,
    Rewardify: false,
    SupplyBeam: false,
    HybridOcean: false,
  };

  const userTypesObj = {
    Customer: false,
    Distributor: false,
    Retailers: false,
    "Channel Partner": false,
    CEO: false,
    WareHouse: false,
    Vendor: false,
  };

  const [comapnyName, setComapnyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyRePassword, setCompanyRePassword] = useState("");
  const [companyMobile, setCompanyMobile] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");
  const [companyAddress, setcompanyAddress] = useState(companyAddressObj);
  const [companySocialMedia, setCompanySocialMedia] = useState(
    companySocialMediaObj,
  );
  const [picture, setPicture] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [companyIndustry, setCompanyIndustry] = useState(0);
  const [companyGstin, setCompanyGstin] = useState("");
  const [panelStatus, setPanelStatus] = useState(0);
  const [companyStatus, setCompanyStatus] = useState(0);
  const [companyUrl, setCompanyUrl] = useState("");
  const [qrType, setQrType] = useState(0);
  const [demoValue, setDemoValue] = useState(0);
  const [productsAvailing, setproductsAvailing] = useState(productsAvailingObj);
  const [userTypes, setUsersTypes] = useState(userTypesObj);
  const [newUserValue, setNewUserValue] = useState("");
  const [companyUserReqirements, setCompanyUserReqirements] = useState(0);

  // errors

  const [companyEmailError, setCompanyEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordReError, setPasswordReError] = useState(null);
  const [masterError, setMasterError] = useState(null);
  const [companyMobileError, setCompanyMobileError] = useState(null);
  const [logoErr, setLogoErr] = useState(null);

  useEffect(() => {
    setAllValues(location.state);
  }, []);

  useEffect(() => {
    if (
      !companyEmailError &&
      !passwordError &&
      !passwordReError &&
      !companyMobileError
    ) {
      setMasterError(null);
    }
  }, [companyEmailError, passwordError, passwordReError, companyMobileError]);

  const handleProgramSelection = (e, type) => {
    console.log(type);
    let copiedValue = { ...productsAvailing };
    copiedValue[type] = copiedValue[type] ? false : true;
    setproductsAvailing(copiedValue);
    //console.log(productsAvailing);
  };

  const handleUserTypeSelection = (e, type) => {
    console.log(type);
    let copiedValue = { ...userTypes };
    copiedValue[type] = copiedValue[type] ? false : true;
    setUsersTypes(copiedValue);
    //console.log(productsAvailing);
  };

  const handleComapnyAddressChange = (e, target) => {
    let copiedValue = { ...companyAddress };
    copiedValue[target] = e.target.value;
    setcompanyAddress(copiedValue);
  };
  const handleUsersRequirementChange = (e) => {
    setCompanyUserReqirements(e.target.value);
    console.log(companyUserReqirements);
  };

  const handlePhoneChange = (event) => {
    if (
      !validator.isMobilePhone(event.target.value, ["en-IN"]) &&
      event.target.value > 0
    ) {
      setCompanyMobileError("Phone no Invalid");
    } else {
      setCompanyMobileError(null);
    }

    setCompanyMobile(event.target.value);
  };

  const handleCompanySocialChange = (e, target) => {
    let copiedValue = { ...companySocialMedia };
    copiedValue[target] = e.target.value;
    setCompanySocialMedia(copiedValue);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    console.log(validator.isEmail(event.target.value));
    if (
      !validator.isEmail(event.target.value) &&
      event.target.value.length > 0
    ) {
      setCompanyEmailError("Email is invalid");
    } else {
      setCompanyEmailError(null);
    }
    setCompanyEmail(event.target.value);
  };

  const handlePasswordChange = (event, type) => {
    if (
      event.target.value.length > 0 &&
      !validator.isStrongPassword(event.target.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      if (event.target.value !== companyPassword && type == 1) {
        setPasswordReError("Password Not Same");
      } else if (type == 1)
        setPasswordReError(
          "Password is not strong , must include a number , symbol , uppercase and lowercase ",
        );
      else
        setPasswordError(
          "Password is not strong , must include a number , symbol , uppercase and lowercase ",
        );
    } else {
      if (type == 1) setPasswordReError(null);
      else setPasswordError(null);
    }

    if (type == 1) setCompanyRePassword(event.target.value);
    else setCompanyPassword(event.target.value);
  };

  const handledemoStatus = (e) => {
    setDemoValue(e.target.value);
    console.log(demoValue);
  };
  const handleCompanyIndustryChange = (e) => {
    setCompanyIndustry(e.target.value);
  };

  const updateVendorDetails = (e) => {
    e.preventDefault();
    if (
      companyEmailError == null &&
      companyMobileError == null &&
      passwordError == null &&
      passwordReError == null &&
      companyEmail.length > 0 &&
      comapnyName.length > 0 &&
      companyGstin.length > 0
    ) {
      if (document.getElementById("file").files[0]) {
        const formData = new FormData();
        if (companyPassword.length > 0)
          formData.append("password", companyPassword);
        formData.append("file", document.getElementById("file").files[0]);
        formData.append("pName", comapnyName);
        formData.append("pSocials", JSON.stringify(companySocialMedia));
        formData.append("pEmail", companyEmail);
        formData.append("pPhone", companyMobile);
        formData.append("pWebsite", companyUrl);
        formData.append("pAddress", JSON.stringify(companyAddress));
        formData.append("pGstin", companyGstin);
        formData.append("pDemoValue", panelStatus);
        formData.append("deleted", companyStatus);
        formData.append("pQrType", qrType);
        formData.append("pContactPerson", contactPerson);
        formData.append("pContactPersonNumber", contactPersonNumber);
        formData.append("industry", companyIndustry);
        formData.append("productsawailing", JSON.stringify(productsAvailing));
        formData.append("usertypes", JSON.stringify(userTypes));
        formData.append("company_users_requirement", companyUserReqirements);
        if (demoValue) {
          formData.append("demovalue", demoValue);
        }
        console.log(formData);

        var config = {
          method: "put",
          url: `http://127.0.0.1:3003/admin/vendor/${companyId}`,
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

          },
          data: formData,
        };

        axios(config)
          .then(function (response) {
            //console.log(response.data);
            alert("Updaated Successfully")
            navigate('/');
     
          })
          .catch(function (error) {
            console.log(error);
          });
        //.finally(() => resetValues());
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
    setComapnyName("");
    setCompanyEmail("");
    setCompanyPassword("");
    setCompanyRePassword("");
    setCompanyGstin("");
    setcompanyAddress(companyAddressObj);
    setCompanySocialMedia(companySocialMediaObj);
    setContactPerson("");
    setContactPersonNumber("");
    setCompanyIndustry(0);
    setCompanyMobile("");
    setCompanyUrl("");
    setPanelStatus(0);
    setDemoValue(0);
    setPicture(null);
    setThumbnail(null);
    setproductsAvailing(productsAvailingObj);
    setCompanyStatus(0);
  };
  const setAllValues = (data) => {
    console.log(data.productsavailing);
    setComapnyName(data.pName);
    setCompanyEmail(data.pEmail);
    setCompanyPassword("");
    setCompanyRePassword("");
    setCompanyGstin(data.pGstin);
    setcompanyAddress((data.pAddress));
    setCompanySocialMedia(data.pSocials);
    setContactPerson(data.pContactPerson ? data.pContactPerson : "");
    setContactPersonNumber(
      data.pContactPersonNumber ? data.pContactPersonNumber : "",
    );
    setCompanyIndustry(data.industry ? data.industry : 0);
    setCompanyMobile(data.pPhone);
    setCompanyUrl(data.pWebsite);
    setPanelStatus(data.pDemoValue);
    if (data.demovalue) {
      setDemoValue(data.demovalue);
    }
    setUsersTypes(data.usertypes ? data.usertypes : userTypesObj);
    setCompanyUserReqirements(
      data.company_users_requirement ? data.company_users_requirement : 0,
    );
    setPicture(null);
    setThumbnail(null);
    setQrType(data.qr_type);
    if (data.productsavailing) {
      setproductsAvailing(data.productsavailing);
    } else {
      setproductsAvailing(productsAvailingObj);
    }
    setCompanyStatus(data.deleted);

   
  };

  const handleChange = (event) => {
    // setProductCategoryId(event.target.value);
  };

  const handleCompanyStatus = (event) => {
    setCompanyStatus(event.target.value);
  };
  const handleCompanyPanelStatus = (event) => {
    // console.log(panelStatus);
    console.log(event.target.value);
    setPanelStatus(event.target.value);
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
              <h4 className="card-title">Add New Vendor</h4>
              <div className="cmxform">
                <div className="form-group row">
                  <div className="col-md-6 my-3">
                    <label>Name </label>
                    <input
                    
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={comapnyName}
                      onChange={(e) => setComapnyName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Email </label>
                    <input
                   
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={companyEmail}
                      onChange={(e) => handleEmailChange(e)}
                    />
                    {companyEmailError && (
                      <p className="text-danger mx-2 my-2">
                        {companyEmailError}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>New Password </label>
                    <input
                 
                      className="form-control"
                      name="password"
                      type="password"
                      value={companyPassword}
                      onChange={(e) => handlePasswordChange(e, 0)}
                    />
                    {passwordError && (
                      <p className="text-danger mx-2 my-2">{passwordError}</p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>New Re-Password </label>
                    <input
                 
                      className="form-control"
                      name="re-password"
                      type="password"
                      value={companyRePassword}
                      onChange={(e) => handlePasswordChange(e, 1)}
                    />
                    {passwordReError && (
                      <p className="text-danger mx-2 my-2">{passwordReError}</p>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6 my-3">
                    <label>Mobile No </label>
                    <input
                    
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={companyMobile}
                      onChange={(e) => handlePhoneChange(e)}
                    />
                    {companyMobileError && (
                      <p className="text-danger mx-2 my-2">
                        {companyMobileError}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Contact Person </label>
                    <input
                 
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Contact Person Number</label>
                    <input
                 
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={contactPersonNumber}
                      onChange={(e) => setContactPersonNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-3"></div>
                  <div className="col-md-6 mt-3">
                    <label>Head Office Address </label>
                    <textarea
                      id="maxlength-textarea"
                      className="form-control"
                      maxLength="100"
                      rows="4"
                      value={companyAddress.homeAddress}
                      placeholder="This textarea has a limit of 100 chars."
                      onChange={(e) =>
                        handleComapnyAddressChange(e, "homeAddress")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Landmark </label>
                    <input
                 
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={companyAddress.landMark}
                      onChange={(e) =>
                        handleComapnyAddressChange(e, "landMark")
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6 my-2 ">
                    <label>State </label>
                    <input
                 
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={companyAddress.state}
                      onChange={(e) => handleComapnyAddressChange(e, "state")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>City </label>
                    <input
                 
                      className="form-control"
                      name="city"
                      type="text"
                      value={companyAddress.city}
                      onChange={(e) => handleComapnyAddressChange(e, "city")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>Country </label>
                    <input
                 
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={companyAddress.country}
                      onChange={(e) => handleComapnyAddressChange(e, "country")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>District </label>
                    <input
                 
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={companyAddress.district}
                      onChange={(e) =>
                        handleComapnyAddressChange(e, "district")
                      }
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>Pincode </label>
                    <input
                 
                      className="form-control"
                      name="pincode"
                      type="text"
                      value={companyAddress.pincode}
                      onChange={(e) => handleComapnyAddressChange(e, "pincode")}
                    />
                  </div>
                </div>
                <label className="text-xl text-uppercase">Social Media </label>

                <div className="form-group row">
                  <div className="col-md-11 my-2">
                    <label>Facebook </label>

                    <input
                 
                      className="form-control"
                      name="fb"
                      type="text"
                      value={companySocialMedia.facebook}
                      onChange={(e) => handleCompanySocialChange(e, "facebook")}
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Instagram </label>

                    <input
                 
                      className="form-control"
                      name="ig"
                      type="text"
                      value={companySocialMedia.instagram}
                      onChange={(e) =>
                        handleCompanySocialChange(e, "instagram")
                      }
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Twitter </label>

                    <input
                 
                      className="form-control"
                      name="tw"
                      type="text"
                      value={companySocialMedia.twitter}
                      onChange={(e) => handleCompanySocialChange(e, "twitter")}
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Youtube </label>

                    <input
                 
                      className="form-control"
                      name="yt"
                      type="text"
                      value={companySocialMedia.youtube}
                      onChange={(e) => handleCompanySocialChange(e, "youtube")}
                    />
                  </div>
                </div>

                <div className="form-group row my-2">
                  <div className="col-md-6 my-1">
                    <label>Company URL</label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_box"
                      value={companyUrl}
                      onChange={(e) => {
                        setCompanyUrl(e.target.value);
                      }}
                      type="text"
                    />
                  </div>

                  <div className="col-md-6 my-1">
                    <label>Company GSTIN</label>
                    <input
                      id="gstin"
                      className="form-control"
                      name="p_box"
                      value={companyGstin}
                      maxLength={16}
                      onChange={(e) => {
                        setCompanyGstin(e.target.value);
                      }}
                      type="text"
                    />
                  </div>

                  <div className="col-md-6 my-2">
                    <label>QR Type</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={qrType}
                      onChange={handleQrChange}
                    >
                      <option value={0}>Simple QR Codes </option>
                      <option value={1}>Complex QR Codes</option>
                    </select>
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Status</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={companyStatus}
                      onChange={handleCompanyStatus}
                    >
                      <option value={0}>Active</option>
                      <option value={1}>Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6 my-1">
                    <label className="my-1">Pannel Status</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={panelStatus}
                      onChange={handleCompanyPanelStatus}
                    >
                      <option value={0}>Demo</option>
                      <option value={1}>Testing / Staging</option>
                      <option value={2}>Pre-Production</option>
                      <option value={3}>Production (Live)</option>
                    </select>
                  </div>
                  {panelStatus == 0 ? (
                    <div className="col-md-6 my-1">
                      <label className="my-1">Demo Period</label>
                      <select
                        className="js-example-basic-single w-100"
                        value={demoValue}
                        onChange={handledemoStatus}
                      >
                        <option value={0}>7 Days</option>
                        <option value={1}>15 Days / Staging</option>
                        <option value={2}>21 Days</option>
                        <option value={3}>28 Days </option>
                      </select>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="form-group row">
                 {/*
                   <div className="col-md-6 my-1">
                    <label className="my-1">Industry </label>
                    <select
                      className="js-example-basic-single w-100"
                      value={companyIndustry}
                      onChange={handleCompanyIndustryChange}
                    >
                      <option value={14}>Computer Parts</option>
                      <option value={15}>Pharmaceuticals</option>
                      <option value={16}>Housing Furniture</option>
                    </select>
                  </div>
                   <div className="col-md-6"></div>
                  */ }
                 
                  <div className="col-md-6 my-2">
                    <label className="my-2">User Login Requirements </label>
                    <select
                      className="js-example-basic-single w-100"
                      value={companyUserReqirements}
                      onChange={handleUsersRequirementChange}
                    >
                      <option value={0}>Un-Limited</option>
                      <option value={1}>1-2 Users</option>
                      <option value={2}>2-5 Users</option>
                      <option value={3}>5-10 Users</option>
                      <option value={4}>10-50 Users</option>
                      <option value={5}>50-100 Users</option>
                    </select>
                  </div>

                  <div className="col-md-6 my-3">
                    <img
                      className="userUpdateImg"
                      src={picture ? picture : ""}
                      alt=""
                    />
                    <label htmlFor="file">Upload Logo</label>
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
                  {/* 
                  <div className="col-md-12 my-3">
                    <div>
                      <label className="text-capitalize font-weight-bold">
                        {" "}
                        Select Programs
                      </label>
                    </div>

                    <label>
                      <input
                        type="checkbox"
                        value={"SupplyBeam"}
                        checked={
                          productsAvailing["SupplyBeam"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "SupplyBeam")
                        }
                      />{" "}
                      <span className="px-2 mx-2">SupplyBeam</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"ScanAndWin"}
                        checked={
                          productsAvailing["ScanAndWin"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "ScanAndWin")
                        }
                      />{" "}
                      <span className="px-2 mx-2">Scan and Win</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={productsAvailing["Rewardify"] ? "checked" : ""}
                        value={"Rewardify"}
                        onChange={(e) => handleProgramSelection(e, "Rewardify")}
                      />{" "}
                      <span className="px-2 mx-2">Rewardify</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"Genuinity"}
                        checked={productsAvailing["Genuinity"] ? "checked" : ""}
                        onChange={(e) => handleProgramSelection(e, "Genuinity")}
                      />{" "}
                      <span className="px-2 mx-2">GenuineMark</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"DWAN"}
                        checked={productsAvailing["DWAN"] ? "checked" : ""}
                        onChange={(e) => handleProgramSelection(e, "DWAN")}
                      />{" "}
                      <span className="px-2 mx-2">DWAN</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"HybridOcean"}
                        checked={
                          productsAvailing["HybridOcean"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "HybridOcean")
                        }
                      />{" "}
                      <span className="px-2 mx-2">HybridOcean</span>
                    </label>
                  </div>*/}
                </div>
                <div className="row">
                  {/*
                  <div className="col-md-12 my-3">
                    <div>
                      <label className="text-capitalize font-weight-bold">
                        {" "}
                        Select Users
                      </label>
                    </div>
                    {Object.keys(userTypes).map((key) => (
                      <label>
                        <input
                          type="checkbox"
                          value={key}
                          checked={userTypes[key] ? "checked" : ""}
                          onChange={(e) => handleUserTypeSelection(e, key)}
                        />{" "}
                        <span className="px-2 mx-2">{key}</span>
                      </label>
                    ))}

                    <label>
                      <input
                        type="text"
                        className="border p-1"
                        placeholder="Add new UserType"
                        value={newUserValue}
                        onChange={(e) => setNewUserValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            console.log(newUserValue);
                            let oldUserTypes = { ...userTypes };
                            oldUserTypes[newUserValue] = false;
                            setUsersTypes(oldUserTypes);
                            console.log(userTypes);
                            setNewUserValue("");
                          }
                        }}
                      />
                    </label>
                      </div> 
                    */}
                </div>

                <div className="row"></div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => updateVendorDetails(e)}
                    >
                      Update
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
