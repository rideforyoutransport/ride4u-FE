import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tenant } from "../../utils/tenant";

export default function VendorUserRegistration() {
  const navigate = useNavigate();

  const userAddressObj = {
    homeAddress: "",
    state: "",
    country: "",
    state: "",
    district: "",
    landMark: "",
    city: "",
    pincode: "",
  };
  const userSocialMediaObj = {
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

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRePassword, setUserRePassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAlterMobile, setUserAlterMobile] = useState("");
  const [userAadharNo, setUserAadharNo] = useState("");
  const [userPanNumber, setUserPanNumber] = useState("");
  const [userAddress, setuserAddress] = useState(userAddressObj);
  const [userSocialMedia, setUserSocialMedia] = useState(
    userSocialMediaObj,
  );
  const [gender, setGender] = useState(0);
  const [picture, setPicture] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [userIndustry, setUserIndustry] = useState(0);
  const [userGstin, setUserGstin] = useState("");
  const [userRoleStatus, setUserRoleStatus] = useState(0);
  const [userStatus, setUserStatus] = useState(0);
  const [userUrl, setUserUrl] = useState("");
  const [qrType, setQrType] = useState(0);
  const [demoValue, setDemoValue] = useState(0);
  const [productsAvailing, setproductsAvailing] = useState(productsAvailingObj);
  const [userTypes, setUsersTypes] = useState(userTypesObj);
  const [newUserValue, setNewUserValue] = useState("");
  const [userUserReqirements, setUserUserReqirements] = useState(0);
  const [vendorId, setVendorId] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [userRoles, setUserRoles] = useState([]);

  // errors

  const [userEmailError, setUserEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordReError, setPasswordReError] = useState(null);
  const [masterError, setMasterError] = useState(null);
  const [userMobileError, setUserMobileError] = useState(null);
  const [logoErr, setLogoErr] = useState(null);
  const [genderError, setGenderError] = useState(null);

  useEffect(() => {
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
        setUserRoles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (
      !userEmailError &&
      !passwordError &&
      !passwordReError &&
      !userMobileError
    ) {
      setMasterError(null);
    }
  }, [userEmailError, passwordError, passwordReError, userMobileError]);

  const handleUsersRequirementChange = (e) => {
    setUserUserReqirements(e.target.value);
    console.log(userUserReqirements);
  };

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

  const handleUserAddressChange = (e, target) => {
    let copiedValue = { ...userAddress };
    copiedValue[target] = e.target.value;
    setuserAddress(copiedValue);
  };

  const handlePhoneChange = (event, type) => {
    if (
      !validator.isMobilePhone(event.target.value, ["en-IN"]) &&
      event.target.value > 0
    ) {
      setUserMobileError("Phone no Invalid");
    } else {
      setUserMobileError(null);
    }

    if (type == 1) {
      setUserMobile(event.target.value);
    } else {
      setUserAlterMobile(event.target.value);
    }
  };

  const handleUserSocialChange = (e, target) => {
    let copiedValue = { ...userSocialMedia };
    copiedValue[target] = e.target.value;
    setUserSocialMedia(copiedValue);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    console.log(validator.isEmail(event.target.value));
    if (
      !validator.isEmail(event.target.value) &&
      event.target.value.length > 0
    ) {
      setUserEmailError("Email is invalid");
    } else {
      setUserEmailError(null);
    }
    setUserEmail(event.target.value);
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
      if (event.target.value !== userPassword && type == 1) {
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

    if (type == 1) setUserRePassword(event.target.value);
    else setUserPassword(event.target.value);
  };

  const handledemoStatus = (e) => {
    setDemoValue(e.target.value);
    console.log(demoValue);
  };
  const handleUserIndustryChange = (e) => {
    setUserIndustry(e.target.value);
  };

  const addNewVendor = (e) => {
    e.preventDefault();
    if (
      userEmailError == null &&
      userMobileError == null &&
      passwordError == null &&
      passwordReError == null &&
      userEmail.length > 0 &&
      userName.length > 0
    ) {
      if (document.getElementById("file").files[0]) {
        const formData = new FormData();
        formData.append("password", userPassword);
        formData.append("file", document.getElementById("file").files[0]);
        formData.append("u_name", userName);
        formData.append("socials", JSON.stringify(userSocialMedia));
        formData.append("u_email", userEmail);
        formData.append("u_mobile", userMobile);
        formData.append("u_altr_mobile", userAlterMobile);
        formData.append("u_dob", startDate);
        formData.append("gender", gender);
        formData.append("u_address", JSON.stringify(userAddress));
        formData.append("user_role", userRoleStatus);
        formData.append("u_status", userStatus);
        formData.append("u_aadhar", userAadharNo);
        formData.append("tenant_slug", tenant);
        // formData.append("industry", userIndustry);
        formData.append("u_pan", userPanNumber);
        // formData.append("productsAwailing", JSON.stringify(productsAvailing));
        // formData.append("userTypes", JSON.stringify(userTypes));
        //formData.append("user_users_requirement", userUserReqirements);

        console.log(formData);

        var config = {
          method: "post",
          url: "http://127.0.0.1:3003/api/vendorUser/add",
          headers: {
            slug: tenant,
          },
          data: formData,
        };
        axios(config)
          .then(function (response) {
            console.log(response.data);
            console.log(response.data.data);
            const { id } = response.data.data;

            setVendorId(id);
            if (!id) {
              alert("Some issues occured while registring please try agan ");
            } else {
              resetValues();
              alert(`redirecting to set Rewardify Options ${id}`);
              navigate(`/tenant`);
            
            }
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
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserRePassword("");
    setUserGstin("");
    setuserAddress(userAddressObj);
    setUserSocialMedia(userSocialMediaObj);
    setUserAadharNo("");
    setUserPanNumber("");
    setUserIndustry(0);
    setUserMobile("");
    setUserUrl("");
    setUserRoleStatus(0);
    setDemoValue(0);
    setPicture(null);
    setThumbnail(null);
    setproductsAvailing(productsAvailingObj);
    setUserStatus(0);
    setUserUserReqirements(0);
    setUsersTypes(userTypesObj);
  };

  const handleChange = (event) => {
    // setProductCategoryId(event.target.value);
  };

  const handleUserStatus = (event) => {
    setUserStatus(event.target.value);
  };
  const handleUserRoleStatus = (event) => {
    // console.log(userRoleStatus);
    console.log(event.target.value);
    setUserRoleStatus(event.target.value);
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
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Email </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="m_no"
                      type="text"
                      value={userEmail}
                      onChange={(e) => handleEmailChange(e)}
                    />
                    {userEmailError && (
                      <p className="text-danger mx-2 my-2">
                        {userEmailError}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Password </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="password"
                      type="password"
                      value={userPassword}
                      onChange={(e) => handlePasswordChange(e, 0)}
                    />
                    {passwordError && (
                      <p className="text-danger mx-2 my-2">{passwordError}</p>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Re-Password </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="re-password"
                      type="password"
                      value={userRePassword}
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
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={userMobile}
                      onChange={(e) => handlePhoneChange(e, 1)}
                    />
                    {userMobileError && (
                      <p className="text-danger mx-2 my-2">
                        {userMobileError}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6 my-3">
                    <label>Alternate Mobile No </label>
                    <input
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="text"
                      value={userAlterMobile}
                      onChange={(e) => handlePhoneChange(e, 2)}
                    />
                    {userMobileError && (
                      <p className="text-danger mx-2 my-2">
                        {userMobileError}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Date Of Birth</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        console.log(date.getDate() )
                        setStartDate(date);
                        console.log(startDate);
                      }}
                      className="border px-2 py-1.5  w-100"
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Aadhar No</label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="m_no"
                      type="text"
                      maxLength={16}
                      value={userAadharNo}
                      onChange={(e) => setUserAadharNo(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Pan No</label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="m_no"
                      type="text"
                      maxLength={10}
                      value={userPanNumber}
                      onChange={(e) => setUserPanNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 my-3">
                    <label>Select Gender</label>
                    <div
                      onChange={(e) => {
                        setGender(() => e.target.value);
                        console.log(gender);
                      }}
                    >
                      <input
                        type="radio"
                        value={0}
                        name="gender"
                        className="mx-2 my-2"
                      />{" "}
                      Male
                      <input
                        type="radio"
                        value={1}
                        name="gender"
                        className="mx-2 my-2"
                      />{" "}
                      Female
                      <input
                        type="radio"
                        value={2}
                        name="gender"
                        className="mx-2 my-2"
                      />{" "}
                      Other
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Home Address </label>
                    <textarea
                      id="maxlength-textarea"
                      className="form-control"
                      maxLength="100"
                      rows="4"
                      value={userAddress.homeAddress}
                      placeholder="This textarea has a limit of 100 chars."
                      onChange={(e) =>
                        handleUserAddressChange(e, "homeAddress")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Landmark </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={userAddress.landMark}
                      onChange={(e) =>
                        handleUserAddressChange(e, "landMark")
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6 my-2 ">
                    <label>State </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={userAddress.state}
                      onChange={(e) => handleUserAddressChange(e, "state")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>City </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="city"
                      type="text"
                      value={userAddress.city}
                      onChange={(e) => handleUserAddressChange(e, "city")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>Country </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={userAddress.country}
                      onChange={(e) => handleUserAddressChange(e, "country")}
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>District </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="landmark"
                      type="text"
                      value={userAddress.district}
                      onChange={(e) =>
                        handleUserAddressChange(e, "district")
                      }
                    />
                  </div>
                  <div className="col-md-6 my-2 ">
                    <label>Pincode </label>
                    <input
                      id="m_no"
                      className="form-control"
                      name="pincode"
                      type="text"
                      value={userAddress.pincode}
                      onChange={(e) => handleUserAddressChange(e, "pincode")}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <label>Status</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={userStatus}
                      onChange={handleUserStatus}
                    >
                      <option value={0}>Active</option>
                      <option value={1}>Inactive</option>
                    </select>
                  </div>
                </div>

                {/*  
               <label className="text-xl text-uppercase">Social Media </label>
                <div className="form-group row">
                  <div className="col-md-11 my-2">
                    <label>Facebook </label>

                    <input
                      id="m_no"
                      className="form-control"
                      name="fb"
                      type="text"
                      value={userSocialMedia.facebook}
                      onChange={(e) => handleUserSocialChange(e, "facebook")}
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Instagram </label>

                    <input
                      id="m_no"
                      className="form-control"
                      name="ig"
                      type="text"
                      value={userSocialMedia.instagram}
                      onChange={(e) =>
                        handleUserSocialChange(e, "instagram")
                      }
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Twitter </label>

                    <input
                      id="m_no"
                      className="form-control"
                      name="tw"
                      type="text"
                      value={userSocialMedia.twitter}
                      onChange={(e) => handleUserSocialChange(e, "twitter")}
                    />
                  </div>
                  <div className="col-md-11 my-2">
                    <label>Youtube </label>

                    <input
                      id="m_no"
                      className="form-control"
                      name="yt"
                      type="text"
                      value={userSocialMedia.youtube}
                      onChange={(e) => handleUserSocialChange(e, "youtube")}
                    />
                  </div>
                </div>
                
                <div className="form-group row my-2">
                  <div className="col-md-6 my-1">
                    <label>User URL</label>
                    <input
                      id="name"
                      className="form-control"
                      name="p_box"
                      value={userUrl}
                      onChange={(e) => {
                        setUserUrl(e.target.value);
                      }}
                      type="text"
                    />
                  </div>

                  <div className="col-md-6 my-1">
                    <label>User GSTIN</label>
                    <input
                      id="gstin"
                      className="form-control"
                      name="p_box"
                      value={userGstin}
                      maxLength={16}
                      onChange={(e) => {
                        setUserGstin(e.target.value);
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
               
                </div>

                    */}

                <div className="form-group row">
                  <div className="col-md-6 my-1">
                    <label className="my-1">User Role</label>
                    <select
                      className="js-example-basic-single w-100"
                      value={userRoleStatus}
                      onChange={handleUserRoleStatus}
                    >
                      <option value={0}>Select Role</option>
                      {userRoles.map((role) => (
                        <option value={role.id}>{role.name}</option>
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
                <div className="form-group row">
                  {/*
                  <div className="col-md-6 my-1">
                    <label className="my-1">Industry </label>
                    <select
                      className="js-example-basic-single w-100"
                      value={userIndustry}
                      onChange={handleUserIndustryChange}
                    >
                      <option value={0}>Select Industry</option>
                      <option value={1}>Wires & Cables</option>
                      <option value={2}>Tyres</option>
                      <option value={3}>
                        Electrical & Electronics Equipment
                      </option>
                      <option value={4}>Helmets</option>
                      <option value={5}>Home Appliance</option>
                      <option value={6}>Certificates</option>
                      <option value={7}>Cosmetics</option>
                      <option value={8}>FMCG</option>
                      <option value={9}>Chemicals</option>
                      <option value={10}>Fertilizers</option>
                      <option value={11}>Auto Parts</option>
                      <option value={12}>Clothing</option>
                      <option value={13}>Kitchen & Cloud</option>
                      <option value={14}>Computer Parts</option>
                      <option value={15}>Pharmaceuticals</option>
                      <option value={16}>Housing Furniture</option>
                    </select>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6 my-2">
                    <label className="my-2">User Login Requirements </label>
                    <select
                      className="js-example-basic-single w-100"
                      value={userUserReqirements}
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
                  */}
                </div>
                {/*
                <div className="row">
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
                  </div>
                </div>
                User types   

                <div className="row">
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
                </div>*/}

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => addNewVendor(e)}
                    >
                      Register
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
