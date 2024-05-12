import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dynamicForm } from "../exampleJsonObjects/dynamicFormsObj";
export default function SupplyBeamNonUsable() {
  const elementsRaw = dynamicForm.elements;
  const [elements, setElements] = useState(elementsRaw);

  const [lableName, setLableName] = useState("");
  const [inputLength, setInputLength] = useState("");
  const [inputType, setInputType] = useState("");
  const [required, setRequired] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [userTypes, setUsersTypes] = useState([]);
  const [newUserValue, setNewUserValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // setElements(elementsRaw);
    const handleNewElementAddition = () => {
      console.log("added");

      let newElementObj = {
        label: lableName,
        name: lableName,
        type: inputType,
        required: required,
        maxLength: inputLength,
        options: userTypes,
      };

      let oldOptions = elements;
      oldOptions.push(newElementObj);
      setElements(oldOptions);
      console.log("added");

      console.log(oldOptions);
    };
    if (lableName !== "" && inputType !== "" && inputLength !== "") {
      handleNewElementAddition();
      setLableName("");
      setInputLength("");
      setRequired(false);
      setInputType("");
    }
  }, [reRender]);

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const removeFromUserTypes = (e, key) => {
    console.log(key);
    let oldValues = [...userTypes];
    oldValues = oldValues.filter((user) => user != key);
    setUsersTypes(oldValues);
  };

  const cancelAddProductSubCategory = () => {
    navigate("/industryMaster");
  };
  const handleUserTypeSelection = (e, type) => {
    console.log(type);
    let copiedValue = [...userTypes];
    copiedValue[type] = copiedValue[type] ? false : true;
    setUsersTypes(copiedValue);
    //console.log(productsAvailing);
  };

  // const addIndustry = () => {
  //   if (indusrtyName.length > 0) {
  //     // Hit the Api for adding product category

  //     var data = JSON.stringify({
  //       i_name: indusrtyName,
  //       i_users: userTypes,
  //     });

  //     var config = {
  //       method: "post",
  //       url: "http://127.0.0.1:3003/admin/industry/add",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //       },
  //       data: data,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         console.log(response.data);
  //         navigate("/industryMaster");
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
  //     // add logic to display the error
  //   }
  // };

  return (
    <>
      <div className="page-content">
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{dynamicForm.templateName}</h4>

                <div className="cmxform my-2" id="signupForm">
                  <div className="form-group row">
                    <div className="col-md-12 my-3">
                      <div>
                        <label className="text-capitalize font-weight-bold">
                          New Input
                        </label>
                      </div>

                      <label className="mx-2">
                        <input
                          type="text"
                          className="border p-2"
                          placeholder="Add Label Name"
                          value={lableName}
                          onChange={(e) => setLableName(e.target.value)}
                        />
                      </label>
                      <label className="mx-2"></label>
                      <input
                        type="number"
                        className="border p-2"
                        placeholder="Max Length"
                        value={inputLength}
                        onChange={(e) => setInputLength(e.target.value)}
                      />
                      <label className="mx-2">
                        <select
                          className="mx-2 p-2"
                          value={inputType}

                          onChange={(e) => handleInputTypeChange(e)}
                        >
                          <option value={""}>Select Type</option>
                          <option value={"date"}>Date</option>
                          <option value={"file"}>File</option>
                          <option value={"checkbox"}>Checkbox</option>
                          <option value={"text"}>Text</option>
                          <option value={"select"}>Options</option>
                        </select>
                      </label>
                      {inputType === "select" ? (
                        <label className="mx-3 my-2">
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
                                  setUsersTypes(oldUserTypes);
                                  setNewUserValue("");
                                }
                              }}
                            />
                          </label>
                        </label>
                      ) : (
                        <label></label>
                      )}
                      <label className="mx-3 my-2">
                        <input
                          type="checkbox"
                          className="px-1 py-1"
                          checked={required ? "checked" : ""}
                          onChange={() => setRequired(!required)}
                        />{" "}
                        <span className="px-1 py-1">Required</span>
                      </label>

                      <button
                        type="button"
                        className="btn btn-outline-primary mx-3 my-1"
                        onClick={() => setReRender(!reRender)}
                      >
                        Add
                      </button>
                    </div>

                    {elements.map((element, idx) => {
                      return element.type === "select" ? (
                        <div className="col-md-6 my-2" key={idx}>
                          <lable>{element.label}</lable>
                          <select className="my-2 py-1">
                            <option value={"Select Options"}>
                              Select Options
                            </option>

                            {element.options.map((opt) => (
                              <option value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="col-md-6 my-2" key={idx}>
                          <label>{element.label} </label>
                          <input
                            className="form-control"
                            type={element.type}
                            maxLength={element.maxLength}
                            placeholder={element.label}
                            required={element.required}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="row">
                    <div className="col-md-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mr-2 w-100"
                        // onClick={addIndustry}
                      >
                        Add Industry
                      </button>
                    </div>
                    <div className="col-md-2 mt-3">
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
    </>
  );
}
