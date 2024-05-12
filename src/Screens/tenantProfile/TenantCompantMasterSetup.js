import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import validator from "validator";


const vid = sessionStorage.getItem("vendorId");
export default function TenantCompantMasterSetup() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [googleFonts, setGoogleFonts] = useState({});

  const [points, setPoints] = useState(1);
  const [price, setPrice] = useState(1);

  const handleChange = (event) => {
    setEnabled(event.target.checked);
  };

  const [themeColors, setThemeColors] = useState({});

  const handleThemeColorChange = (event, type) => {
    //console.log(event.target.value);

    let copiedValue = themeColors;
    console.log(copiedValue);
    copiedValue[type] = event.target.value.toString();
    setThemeColors(copiedValue);
    console.log(themeColors);
  };

  useEffect(() => {

    var config = {
      method: "get",
      url: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCgZeb31GEAU8sDQLhftJVZAdjZdbWrNPc",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setGoogleFonts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // !validator.isStrongPassword(event.target.value, {
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })

  // useEffect(() => {
  //   var config = {
  //     method: "get",
  //     url: `http://127.0.0.1:3003/admin/vendor/${vid}`,
  //     headers: {},
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       setComapnyName(response.data.c_name);
  //       setCompanyEmail(response.data.c_email);
  //       setCompanyMobile(response.data.c_mobile);
  //       setCompanyUrl(response.data.website);
  //       if (response.data.c_address) setcompanyAddress(response.data.c_address);
  //       setCompanyGstin(response.data.c_gstin);
  //       setCompanySocialMedia(response.data.socials);

  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // const updateVendorDetails = (e) => {
  //    e.preventDefault();

  //     const formData = new FormData();

  //     formData.append("c_name", comapnyName);
  //     formData.append("socials", JSON.stringify(companySocialMedia));
  //     formData.append("c_email", companyEmail);
  //     formData.append("c_mobile", companyMobile);
  //     formData.append("website", companyUrl);
  //     formData.append("c_gstin", companyGstin);

  //     console.log(formData);

  //     var config = {
  //       method: "put",
  //       url: `http://127.0.0.1:3003/admin/vendor/${vid}`,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //       },
  //       data: formData,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         //console.log(response.data);
  //         alert("Updated form data")
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //     //.finally(() => resetValues());
  // };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-md-12 col-md-offset-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title d-inline">Company Settings</div>
              <Switch
                checked={enabled}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                className="ml-4"
                color="secondary"
              />
            </div>
            <div className="card-body">
              <div className="form-group row">
                <div className="col-md-6 my-3">
                  <label>Points </label>
                  <input
                    id="m_name"
                    className="form-control"
                    name="m_name"
                    type="number"
                    step={0.1}
                    min={1}
                    value={points}
                    disabled={!enabled}
                    onChange={(e) => setPoints(e.target.value)}
                  />
                </div>
                <div className="col-md-6 my-3">
                  <label>Price </label>
                  <input
                    id="m_no"
                    className="form-control"
                    name="m_no"
                    type="number"
                    min={1}
                    step={1}
                    value={price}
                    disabled={!enabled}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Theme Colors </label>
                  <div className="row">
                    <div className="col-md-2">
                      <input
                        id="m_no"
                        className=""
                        type="color"
                        disabled={!enabled}
                        onChange={(e) => handleThemeColorChange(e, "color1")}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        id="m_no"
                        className=""
                        type="color"
                        disabled={!enabled}
                        onChange={(e) => handleThemeColorChange(e, "color2")}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        id="m_no"
                        className=""
                        type="color"
                        disabled={!enabled}
                        onChange={(e) => handleThemeColorChange(e, "color3")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <label>Select Font Family</label>
                  <select
                    className="js-example-basic-single w-100"
                    disabled
                    //  value={qrType}
                    // onChange={handleQrChange}
                  >
                    <option value={0}>Select Font Family </option>

                    {googleFonts.items &&
                      googleFonts.items.map((item,idx) => (
                        <option value={item.family} key={idx}>{item.family} </option>
                      ))}
                  </select>
                </div>
              </div>

              <div id="submitGroup" className="form-group text-center mt-5">
                <button type="submit" className="btn btn-outline-success">
                  Update
                </button>
                <button
                  id="cancelFormEdit"
                  type="button"
                  className="btn btn-outline-danger mx-2"
                  onClick={(e) => navigate("/tenant")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
