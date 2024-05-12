import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const productsAvailingObj = {
  Genuinity: { taken: false, users: [] },
  DWAN: { taken: false, users: [] },
  ScanAndWin: { taken: false, users: [] },
  Rewardify: { taken: false, users: [] },
  SupplyBeam: { taken: false, users: [] },
  HybridOcean: { taken: false, users: [] },
};
const smsOptionsObject = {
  otp: false,
  registraion: false,
  block_account: false,
  activate_account: false,
  reset: false,
  profile_completion: false,
  set_mpin: false,
  redeem_request: false,
  bonus_points: false,
  birthday_wishes: false,
  redemption_reminders: false,
  scan_coupon_points: false,
  complaint_message: false,
  gift_delivery: false,
  extra_points: false,
};

const mailOptionObject = {
  welcome_mail: false,
  account_status_mail: false,
  redemption_mail: false,
  points_mail: false,
  gift_status_mail: false,
  points_mail: false,
  registration_mail:false,
  account_activation_mail: false,
  warranty_mail: false,
  gift_redemption_mail: false,
  claim_mail: false,
  support_mail: false,
  reset_password_mail:false,
  special_day_mail: false,
  celebrations_mail: false,


};

export default function BasicSetup() {
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [selectedRewardifyOption, setSelectedRewardifyOption] = useState([]);
  const [rewardifySubOptions, setRewardifySubOptions] = useState({});
  const [rewardifyOptions, setRewardifyOptions] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [updateDisabled, setUpdateDisabled] = useState(true);
  const [companyIndustry, setCompanyIndustry] = useState(0);
  const [industryList, setIndustryList] = useState([]);
  const [userTypes, setUsersTypes] = useState([]);
  const [userTypesObj, setUserTypesObj] = useState({});
  const [newUserValue, setNewUserValue] = useState("");
  const [productsAvailing, setproductsAvailing] = useState(productsAvailingObj);
  const [mailsOptions, setMailsOptions] = useState(mailOptionObject);
  const [smsOptions, setSmsOptions] = useState(smsOptionsObject);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/industry/get",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setIndustryList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (companyIndustry != 0 && selectedVendor != 0) {
      setUpdateDisabled(false);
    } else setUpdateDisabled(true);
  }, [companyIndustry, selectedVendor]);

  useEffect(() => {
    if (window.location.search.split("=")[1]) {
      console.log(window.location.search.split("=")[1]);
      setCompanyId(() =>
        window.location.search ? window.location.search.split("=")[1] : 0,
      );
      setSelectedVendor(
        window.location.search ? window.location.search.split("=")[1] : 0,
      );
      setUpdateDisabled(false);
    }

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/rewardify/get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    axios(config)
      .then(function (response) {
        ////console.log(response.data);
        const data = response.data;
        //console.log({ data });
        let allOptions = [];
        let allSubOptions = {};

        data.forEach((element) => {
          allSubOptions[element["option_name"]] = element["sub_option_array"];
          //  console.log(element);
          allOptions.push(element.option_name);
        });
        setRewardifyOptions(allOptions);
        setRewardifySubOptions(allSubOptions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleCompanyIndustryChange = (e) => {
     setCompanyIndustry(e.target.value);
    console.log(industryList.filter((element)=>element.id==e.target.value)[0].i_users);
    // console.log(industryList[e.target.value].i_users);
     createUserTypesObject(...(industryList.filter((element)=>element.id==e.target.value)[0].i_users));//          ...industryList[e.target.value].i_users);
    setUsersTypes(industryList.filter((element)=>element.id==e.target.value)[0].i_users);
     setproductsAvailing(productsAvailingObj);
  };

  const createUserTypesObject = (...users) => {
    const newUsersObject = {};
    users.forEach((user) => {
      newUsersObject[user] = true;
    });
    setUserTypesObj(newUsersObject);
    console.log({ newUsersObject });
  };
  const addNewUserTypeInObj = (newUserValues) => {
    console.log(newUserValues);
    const newUsersObject = { ...userTypesObj };
    newUsersObject[newUserValues] = true;
    setUserTypesObj(newUsersObject);
    console.log({ userTypesObj });
  };

  const removeFromUserTypes = (e, key) => {
    console.log(key);
    let oldValues = [...userTypes];
    oldValues = oldValues.filter((user) => user != key);
    setUsersTypes(oldValues);
    removeFromUserTypesObject(e, key);
  };

  const removeFromUserTypesObject = (e, key) => {
    console.log(key);
    let oldValues = [];
    oldValues = Object.keys(userTypesObj).filter((user) => user != key);
    createUserTypesObject(...oldValues);
    setUsersTypes(oldValues);
  };

  const handleProgramSelection = (e, type) => {
    // e.preventDefault();
    console.log(type, e);
    let copiedValue = { ...productsAvailing };
    console.log(productsAvailing);
    copiedValue[type]["taken"] = copiedValue[type]["taken"] ? false : true;
    setproductsAvailing(() => copiedValue);
    //console.log(productsAvailing);
  };

  const handleSmsOptionsSelection = (type) => {
    let copiedValue = { ...smsOptions };
    copiedValue[type] = copiedValue[type] ? false : true;
    setSmsOptions(copiedValue);
  };

  const handleMailOptionsSelection = (type) => {
    let copiedValue = { ...mailsOptions };
    copiedValue[type] = copiedValue[type] ? false : true;
    setMailsOptions(copiedValue);
  };

  const handleUserAddition = (e, type) => {
    e.stopPropagation();

    let productsAvailingUsers = { ...productsAvailing };
    console.log({ productsAvailingUsers });
    if (!productsAvailingUsers[type].users.includes(e.target.value))
      productsAvailingUsers[type]["users"].push(e.target.value);
    else productsAvailingUsers[type].users.pop(e.target.value);
    setproductsAvailing(productsAvailingUsers);
  };

  const checkUserPresent = (e, type) => {
    if (productsAvailing[type]["users"].includes(e)) return true;
    return false;
  };

  const handleSelectOption = (e, key, item, idx) => {
    e.preventDefault();
    let oldOptions = { ...rewardifySubOptions };
    oldOptions[key][idx]["taken"] = !item["taken"];
    setRewardifySubOptions({ ...oldOptions });
    console.log(rewardifySubOptions);
  };

  useEffect(() => {
    if (selectedVendor != 0) {
      var config = {
        method: "get",
        url: `http://127.0.0.1:3003/admin/rewardifyUsage/${selectedVendor}`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      var configDetails = {
        method: "get",
        url: `http://127.0.0.1:3003/admin/vendor/${selectedVendor}`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      };

      axios(configDetails)
        .then(function (response) {
          console.log(response.data);
           if (response.data.productsAvailing)
          setproductsAvailing(response.data.productsavailing);
          //  if (response.data.industry)
          setCompanyIndustry(response.data.industry);
          //if (response.data.userTypes) {
          setUserTypesObj(response.data.usertypes);
          setUsersTypes(Object.keys(response.data.usertypes));
         if(response.data.msg_options)  setSmsOptions(response.data.msg_options)
         
         let data=response.data.mail_options;
       
         if(response.data.mail_options) setMailsOptions({...mailOptionObject, ...data});
          //   }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [selectedVendor]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/vendor/get",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setVendorsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedVendor(event.target.value);
    console.log(event.target.value);
  };

  const handleUpdatingBasicSetup = () => {
    var data = new FormData();
    data.append("productsavailing", JSON.stringify(productsAvailing));
    data.append("industry", companyIndustry);
    data.append("usertypes", JSON.stringify(userTypesObj));
    data.append("msg_options", JSON.stringify(smsOptions));
    data.append("mail_options", JSON.stringify(mailsOptions));


    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/admin/vendor/${selectedVendor}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        alert(`redirecting to set Rewardify Options ${selectedVendor}`);
        setTimeout(() => {
          navigate(`/rewardify?vendor=${selectedVendor}`);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddingRewardifyUsage = () => {
    var data = JSON.stringify({
      vendor_id: selectedVendor,
      options: rewardifySubOptions,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:3003/admin/rewardifyUsage/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        const { id } = response.data.data;
        updatingInMainDb(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updatingInMainDb = (id) => {
    const formData = new FormData();
    formData.append("rewardify", id);

    console.log(formData);

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/admin/vendor/${selectedVendor}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        alert(`redirecting to set Rewardify Options ${id}`);
        setTimeout(() => {
          navigate(`/basicSetup?vendor=${id}`);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">Welcome to Basic Setup</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            {/*
          <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/addNewRewardifyOption")}
            >
              Add New Options
            </button>
  */}
          </div>
        </div>
        <div className="row">
          {
            // <div className='col-3 col-xl-3 col-xs-3'>
            // <label>Select Vendor</label>
            // </div>
          }
          <div className="col-12 col-xl-6 col-xs-12">
            <select
              className="js-example-basic-single w-100"
              value={selectedVendor}
              onChange={handleChange}
            >
              <option value={0}>Select Vendor</option>
              {vendorsList.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.c_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*
        <div className="row my-10 py-10">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Options for Rewardify</h4>
                <p className="card-description">
                  Select the Options you want to use
                </p>

                <div className="d-flex justify-content-center">
                  <MultipleSelectChip
                    names={rewardifyOptions}
                    optName={"Select"}
                    setSelectedRewardifyOption={setSelectedRewardifyOption}
                  />
                </div>
              </div>
            </div>
          </div>
          {selectedRewardifyOption.map((val, idx) => {
            return (
              <div key={idx} className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{val}</h4>
                    <p className="card-description">Select the option to use</p>
                    <FormGroup>
                      {rewardifySubOptions[val].map((item, idx) => (
                        <FormControlLabel
                          key={item.key}
                          control={
                            <Checkbox
                              checked={item.taken}
                              onClick={(e) =>
                                handleSelectOption(e, val, item, idx)
                              }
                            />
                          }
                          label={item.value}
                        />
                      ))}
                    </FormGroup>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
*/}
        <div className="form-group row">
          <div className="col-md-6 my-1">
            <label className="my-1">Industry </label>
            <select
              className="js-example-basic-single w-100"
              value={companyIndustry}
              onChange={handleCompanyIndustryChange}
            >
              <option value={0}>Select Industry</option>
              {industryList.map((industry, idx) => (
                <option key={idx} value={industry.id}>
                  {" "}
                  {industry.i_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12 my-3">
            <div>
              <label className="text-capitalize font-weight-bold"> Users</label>
            </div>
            {userTypes.map((key) => (
              <label key={key}>
                <span
                  className="px-2 mx-2 btn btn-outline-danger"
                  onClick={(e) => removeFromUserTypes(e, key)}
                >
                  {key}
                </span>
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
                    let oldUserTypes = [...userTypes];
                    oldUserTypes.push(newUserValue);
                    addNewUserTypeInObj(newUserValue);
                    setUsersTypes(oldUserTypes);
                    console.log(userTypes);
                    setNewUserValue("");
                  }
                }}
              />
            </label>
          </div>
        </div>

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
                checked={productsAvailing["SupplyBeam"].taken ? "checked" : ""}
                onChange={(e) => handleProgramSelection(e, "SupplyBeam")}
              />
              <span className="px-2 mx-2">SupplyBeam</span>

              <div className="ml-3 mt-1">
                {productsAvailing["SupplyBeam"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        key={idx}
                        value={e}
                        checked={
                          checkUserPresent(e, "SupplyBeam") ? "checked" : ""
                        }
                        onChange={(e) => handleUserAddition(e, "SupplyBeam")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                value={"ScanAndWin"}
                checked={productsAvailing["ScanAndWin"].taken ? "checked" : ""}
                onChange={(e) => handleProgramSelection(e, "ScanAndWin")}
              />{" "}
              <span className="px-2 mx-2">Scan and Win</span>
              <div className="ml-3 mt-1">
                {productsAvailing["ScanAndWin"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={e}
                        checked={
                          checkUserPresent(e, "ScanAndWin") ? "checked" : ""
                        }
                        onChange={(e) => handleUserAddition(e, "ScanAndWin")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                checked={productsAvailing["Rewardify"].taken ? "checked" : ""}
                value={"Rewardify"}
                onChange={(e) => handleProgramSelection(e, "Rewardify")}
              />{" "}
              <span className="px-2 mx-2">Rewardify</span>
              <div className="ml-3 mt-1">
                {productsAvailing["Rewardify"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={e}
                        checked={
                          checkUserPresent(e, "Rewardify") ? "checked" : ""
                        }
                        onClick={(e) => handleUserAddition(e, "Rewardify")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                value={"Genuinity"}
                checked={productsAvailing["Genuinity"].taken ? "checked" : ""}
                onChange={(e) => handleProgramSelection(e, "Genuinity")}
              />{" "}
              <span className="px-2 mx-2">GenuineMark</span>
              <div className="ml-3 mt-1">
                {productsAvailing["Genuinity"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={e}
                        checked={
                          checkUserPresent(e, "Genuinity") ? "checked" : ""
                        }
                        onClick={(e) => handleUserAddition(e, "Genuinity")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                value={"DWAN"}
                checked={productsAvailing["DWAN"].taken ? "checked" : ""}
                onChange={(e) => handleProgramSelection(e, "DWAN")}
              />{" "}
              <span className="px-2 mx-2">DWAN</span>
              <div className="ml-3 mt-1">
                {productsAvailing["DWAN"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={e}
                        checked={checkUserPresent(e, "DWAN") ? "checked" : ""}
                        onChange={(e) => handleUserAddition(e, "DWAN")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                value={"HybridOcean"}
                checked={productsAvailing["HybridOcean"].taken ? "checked" : ""}
                onChange={(e) => handleProgramSelection(e, "HybridOcean")}
              />{" "}
              <span className="px-2 mx-2">HybridOcean</span>
              <div className="ml-3 mt-1">
                {productsAvailing["HybridOcean"].taken &&
                  userTypes.map((e, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={e}
                        checked={
                          checkUserPresent(e, "HybridOcean") ? "checked" : ""
                        }
                        onChange={(e) => handleUserAddition(e, "HybridOcean")}
                      />
                      <span className="px-2 mx-2">{e}</span>
                    </div>
                  ))}
              </div>
            </label>
          </div>
        </div>

        {/* Message Options    */}

        <div className="row">
          <div className="col-md-12 my-3">
            <div>
              <label className="text-capitalize font-weight-bold">
                {" "}
                Message Options
              </label>
            </div>

            {Object.keys(smsOptions).map((e,idx) => (
              <label key={idx} >
                <input
                  type="checkbox"
                  value={e}
                  checked={smsOptions[e] ? "checked" : ""}
                  onChange={() => handleSmsOptionsSelection(e)}
                />
                <span className="px-2 mx-2">
                  {e.replaceAll("_", " ").toLocaleUpperCase()}
                </span>

                <div className="ml-3 mt-1"></div>
              </label>
            ))}
          </div>
        </div>

        {/* Mail Options    */}

        <div className="row">
          <div className="col-md-12 my-3">
            <div>
              <label className="text-capitalize font-weight-bold">
                {" "}
                Mail Options
              </label>
            </div>

            {Object.keys(mailsOptions).map((e,idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  value={e}
                  checked={mailsOptions[e] ? "checked" : ""}
                  onChange={() => handleMailOptionsSelection(e)}
                />
                <span className="px-2 mx-2">
                  {e.replaceAll("_", " ").toLocaleUpperCase()}
                </span>

                <div className="ml-3 mt-1"></div>
              </label>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleUpdatingBasicSetup}
              disabled={updateDisabled}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
