import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dynamicForm } from "../programOptions/exampleJsonObjects/dynamicFormsObj";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditDynamicForm() {
  const location = useLocation();

  const elementsRaw = dynamicForm.elements;
  const [elements, setElements] = useState(location.state.template_json || []);

  const [lableName, setLableName] = useState("");
  const [inputLength, setInputLength] = useState("");
  const [inputType, setInputType] = useState("");
  const [required, setRequired] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [userTypes, setUsersTypes] = useState([]);
  const [newUserValue, setNewUserValue] = useState("");
  const [industryList, setIndustryList] = useState([]);
  const [templateName, setTemplateName] = useState(
    location.state.template_name || "",
  );
  const [companyIndustry, setCompanyIndustry] = useState(
    location.state.industry || 0,
  );
  const [formType, setFormType] = useState(location.state.form_type || 0);


  //preview Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  console.log(location);

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
        //console.log(response.data);
        setIndustryList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // setElements(elementsRaw);
    const handleNewElementAddition = () => {
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
    navigate("/allDynamicForms");
  };

  const handleCompanyIndustryChange = (e) => {
    console.log(e.target.value);
    setCompanyIndustry(e.target.value);
  };
  const handleCompanyFormtypeChange = (e) => {
    console.log(e.target.value);
    setFormType(e.target.value);
  };

  const handleUserTypeSelection = (e, type) => {
    console.log(type);
    let copiedValue = [...userTypes];
    copiedValue[type] = copiedValue[type] ? false : true;
    setUsersTypes(copiedValue);
    //console.log(productsAvailing);
  };

  const handleDeleteElement = (e, eIdx) => {
    let oldElements = elements;

    oldElements = oldElements.filter((ele, idx) => idx !== eIdx);
    setElements(oldElements);
    setReRender((old) => !old);
  };

  const editFormTemplate = () => {
    var data = JSON.stringify({
      template_name: templateName,
      form_type: formType,
      industry: companyIndustry,
      template_json: elements,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/admin/dynamicForm/${location.state.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        alert("Updated Successfully");

        setTimeout(function () {
          navigate("/allDynamicForms");
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong please try again later");
      });
  };

  return (
    <>
      <div className="page-content">
        <div className="row">
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                 Preview
                  </Typography>
                  {elements.map((element, idx) => {
                    return element.type === "select" ? (
                      <div className="col-md-12 my-2" key={idx}>
                        <div className="d-flex my-1">
                          <span className="p-2">{element.label} </span>
                         
                        </div>
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
                      <div className="col-md-12 my-2" key={idx}>
                        <div className="d-flex my-1">
                          <span className="p-2">{element.label} </span>
                         
                        </div>
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
                </Box>
              </Fade>
            </Modal>
          </div>

          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{templateName}</h4>
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
                      <label className="mx-2">
                        <input
                          type="number"
                          className="border p-2"
                          placeholder="Max Length"
                          value={inputLength}
                          onChange={(e) => setInputLength(e.target.value)}
                        />
                      </label>
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
                        <label className="mx-2">
                          {userTypes.map((key) => (
                            <label key={key}>
                              <span
                                className="px-2 py-2 mx-2 btn btn-outline-danger"
                                onClick={(e) => removeFromUserTypes(e, key)}
                              >
                                {key}
                              </span>
                            </label>
                          ))}

                          <input
                            type="text"
                            className="border p-2"
                            placeholder="Add new option"
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
                        <span className="px-1 py-1 ">Required</span>
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
                          <div className="d-flex my-1">
                            <span className="p-2">{element.label} </span>
                            <span
                              className="p-2 ml-auto text-danger"
                              onClick={(e) => handleDeleteElement(e, idx)}
                            >
                              x
                            </span>{" "}
                          </div>
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
                          <div className="d-flex my-1">
                            <span className="p-2">{element.label} </span>
                            <span
                              className="p-2 ml-auto text-danger"
                              onClick={(e) => handleDeleteElement(e, idx)}
                            >
                              x
                            </span>{" "}
                          </div>
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
                    <div className="col-md-4 my-1">
                      <label className="my-1">Industry </label>
                      <select
                        className="js-example-basic-single w-100"
                        value={companyIndustry}
                        onChange={handleCompanyIndustryChange}
                      >
                        <option value={0}>Select Industry</option>
                        {industryList.map((industry, idx) => (
                          <option key={industry.id} value={industry.id}>
                            {" "}
                            {industry.i_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 my-1">
                      <label className="my-1">Form Type </label>
                      <select
                        className="js-example-basic-single w-100"
                        value={formType}
                        onChange={handleCompanyFormtypeChange}
                      >
                        <option value={0}>Product </option>
                        <option value={1}>Warranty </option>

                      </select>
                    </div>
                    <div className="col-md-4 my-1">
                      <label className="my-1">Template Name </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Template Name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mr-2 w-100"
                        onClick={editFormTemplate}
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-md-2 mt-3">
                    <button
                      className="btn btn-outline-secondary w-100 mr-2"
                      onClick={handleOpen}
                    >
                      Preview
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
