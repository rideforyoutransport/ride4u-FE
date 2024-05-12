import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import BasicModal from "../../../Components/materialUiComponents/BasicModal";

export default function AddNewGmOption() {
  const [vendorsList, setVendorsList] = useState([]);
  const [rewardifyOptionsList, setRewardifyOptionsList] = useState([]);
  const [newOptionName, setnewOptionName] = useState("");
  const [selectedRewardifyOption, setSelectedRewardifyOption] = useState("");
  const [rewardifySubOptions, setRewardifySubOptions] = useState({});
  const [rewardifyOptions, setRewardifyOptions] = useState([]);
  const [newOptionValue, setNewOptionValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newOptionId, setNewOptionId] = useState(0);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/genuine/get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        const data = response.data;
        console.log({ data });
        let allOptions = [];
        let allSubOptions = {};

        data.forEach((element) => {
          allSubOptions[element["option_name"]] = element["sub_option_array"];
          allSubOptions[element["option_name"]].id = element.id;
          //console.log(element);
          allOptions.push(element.option_name);
        });
        setRewardifyOptions(allOptions);
        setRewardifySubOptions(allSubOptions);
        console.log(allSubOptions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddingNewRewardifyOption = () => {
    let oldOptions = [...rewardifyOptions];
    oldOptions.push(newOptionValue);
    console.log(oldOptions);
    setRewardifyOptions([...oldOptions]);
    let oldRewardifySubOptions = { ...rewardifySubOptions };
    oldRewardifySubOptions[newOptionValue] = [];
    console.log({ oldRewardifySubOptions });
    setRewardifySubOptions(oldRewardifySubOptions);
    console.log(rewardifySubOptions);

    var data = JSON.stringify({
      option_name: newOptionValue,
      sub_option_array: [],
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:3003/admin/genuine/add",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let oldRewardifySubOptions = { ...rewardifySubOptions };
        console.log("response", response.data.data.id);
        const { id } = response.data.data;
        setNewOptionId(id);
        console.log(id);
        console.log({ oldRewardifySubOptions });
        console.log(newOptionValue);
        oldRewardifySubOptions[newOptionValue]["id"] = id;
        console.log({ rewardifySubOptions });
        setRewardifySubOptions({ ...oldRewardifySubOptions });
        console.log(rewardifySubOptions);
        setNewOptionValue("");
        setShowModal(!showModal);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  };

  const handleAddingNewOption = (e) => {
    e.preventDefault();

    if (newOptionValue.length > 0 && selectedRewardifyOption !== "") {
      let oldValues = { ...rewardifySubOptions };
      let newAddition = {
        key: new Date().getTime(),
        taken: false,
        value: newOptionValue.toString(),
      };
      oldValues[selectedRewardifyOption].push(newAddition);
      console.log(oldValues[selectedRewardifyOption]);
      setRewardifySubOptions({ ...oldValues });
      console.log(rewardifySubOptions);
      updateToDb(
        selectedRewardifyOption,
        rewardifySubOptions[selectedRewardifyOption].id,
        oldValues[selectedRewardifyOption],
      );
      setSelectedRewardifyOption("");
      setNewOptionValue("");
    }
  };

  const navigate = useNavigate();

  const handleSelectOption = (e, key, item, idx) => {
    e.preventDefault();

    let oldOptions = { ...rewardifySubOptions };
    oldOptions[key][idx]["taken"] = !item["taken"];
    setRewardifySubOptions({ ...oldOptions });
    console.log(rewardifySubOptions);
  };

  const handleDeleteOption = (e, key, item, idx, id) => {
    console.log(key, item, idx, id);
    let newSubOptions = { ...rewardifySubOptions };
    newSubOptions[key] = newSubOptions[key].filter((item, index) => {
      console.log(index);
      return index !== idx;
    });
    setRewardifySubOptions(newSubOptions);
    console.log(newSubOptions[key]);
    updateToDb(key, id, newSubOptions[key]);
  };
  const updateToDb = (key, id, newSubOptions) => {
    var data = JSON.stringify({
      option_name: key,
      sub_option_array: newSubOptions,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/admin/genuine/${id}`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

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

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/vendor/get",
      headers:{
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
    setSelectedRewardifyOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">Welcome to GenuineMark</h4>
          </div>
          {
            <div className="d-flex align-items-center flex-wrap text-nowrap m-2">
              {showModal ? (
                <span>
                  <input
                    type="text"
                    className="border p-2 m-2"
                    onChange={(e) => setNewOptionValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-1"
                    onClick={handleAddingNewRewardifyOption}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger my-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                  onClick={() => setShowModal(!showModal)}
                >
                  Add New Options
                </button>
              )}
            </div>
          }
        </div>

        <div className="row">
          <div className="col-3">
            <select
              className="js-example-basic-single "
              value={selectedRewardifyOption}
              onChange={handleChange}
            >
              <option value={""}>Select Option</option>
              {rewardifyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="border p-2 w-100"
              onChange={(e) => setNewOptionValue(e.target.value)}
              placeholder="add new suboption value"
            />
          </div>
          <div className="col-3">
            <button
              className="btn btn-outline-primary my-1"
              type="button"
              onClick={(e) => handleAddingNewOption(e)}
            >
              Add New Sub Option{" "}
            </button>
          </div>
        </div>
        <div className="row my-10 py-10">
          {/*
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

  */}

          {rewardifyOptions.map((val, idx) => {
            return (
              <div key={idx} className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{val}</h4>
                    <p className="card-description">
                      Delete the options from master setup{" "}
                    </p>
                    <FormGroup>
                      {rewardifySubOptions[val].map((item, idx) => (
                        <FormControlLabel
                          key={item.key}
                          control={
                            <>
                              {/* 
                            <Checkbox
                              checked={item.taken}
                              onClick={(e) =>
                                handleSelectOption(e, val, item, idx)
                              }
                            />
                        
                        */}
                              <button
                                className="px-2"
                                onClick={(e) =>
                                  handleDeleteOption(
                                    e,
                                    val,
                                    item,
                                    idx,
                                    rewardifySubOptions[val].id,
                                  )
                                }
                              >
                                ❌
                              </button>
                            </>
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
      </div>
    </div>
  );
}
