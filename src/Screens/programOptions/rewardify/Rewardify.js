import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MultipleSelectChip from "../../../Components/materialUiComponents/ChipSelect";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { tenant } from "../../../utils/tenant";



export default function Rewardify() {
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [selectedRewardifyOption, setSelectedRewardifyOption] = useState([]);
  const [rewardifySubOptions, setRewardifySubOptions] = useState({});
  const [rewardifyOptions, setRewardifyOptions] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [usagePresent, setUsagePresent] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(true);
  
  // used to fetch the records from the std rewardify options from  table 
  useEffect(() => {
    console.log(window.location.search.split("=")[1]);
    if(window.location.search.split("=")[1]){
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
         withCredentials: true,
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 
        
      },
    };
    axios(config)
    .then(function (response) {
      console.log(response.data);
      const data = response.data;
      console.log({ data });
      let allOptions = [];
      let allSubOptions = {};

      data.forEach((element) => {
        allSubOptions[element["option_name"]] = element["sub_option_array"];
        console.log(element);
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
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 
        }
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          let data= response.data.options;
        //  console.log({data});
          setUsagePresent(true);
          let allOptions = [];
          let allSubOptions = {};
    
          Object.keys(data).forEach((element) => {
           // allSubOptions[element["option_name"]] = element["sub_option_array"];
            console.log(data[element]);
            allSubOptions[element]=data[element];
            allOptions.push(element);
          //  allOptions.push(element.option_name);
          });
          setRewardifyOptions(allOptions);
          setRewardifySubOptions(allSubOptions);
        })
        .catch(function (error) {
          console.log(error);
          setUsagePresent(false);
          //alert('Error: ' + error);
          console.log({ usagePresent });
        });
    }
  }, [selectedVendor]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/vendor/get",
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 
      }
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
    setUpdateDisabled(false);
    console.log(event.target.value);
  };

  const handleAddingRewardifyUsage = () => {
    if (!usagePresent) {
      var data = JSON.stringify({
        vendor_id: selectedVendor,
        options: rewardifySubOptions,
      });
      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/admin/rewardifyUsage/add",
        headers: {
          slug: tenant,
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

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
    } else {
      updateRewardifyOptions();
    }
  };

  const updateRewardifyOptions = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/admin/rewardifyUsage/${selectedVendor}`,
      headers: {
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
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
        headers:{
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

        }
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
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
            <h4 className="mb-3 mb-md-0">Welcome to Rewardify</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/addNewRewardifyOption")}
            >
              Add New Options
            </button>
          </div>
        </div>
        <div className="row">
          {
            // <div className='col-3 col-xl-3 col-xs-3'>
            // <label>Select Vendor</label>
            // </div>
          }
          <div className="col-6 col-xl-6 col-xs-12">
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
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddingRewardifyUsage}
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
