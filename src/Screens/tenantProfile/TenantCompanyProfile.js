import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";

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
const vid = sessionStorage.getItem("vendorId");

export default function TenantCompanyProfile() {
  const navigate = useNavigate();

  const [enabled, setEnabled] = useState(false);
  const [comapnyName, setComapnyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyMobile, setCompanyMobile] = useState("");
  const [companyAddress, setcompanyAddress] = useState(companyAddressObj);
  const [companySocialMedia, setCompanySocialMedia] = useState(companySocialMediaObj);

  const [companyGstin, setCompanyGstin] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");


  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/admin/vendor/${vid}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log("this is the response on tenantEditPage",response.data)
        setComapnyName(response.data.c_name);
        setCompanyEmail(response.data.c_email);
        setCompanyMobile(response.data.c_mobile);
        setCompanyUrl(response.data.website);
        if (response.data.c_address) setcompanyAddress(response.data.c_address);
        setCompanyGstin(response.data.c_gstin);
        setCompanySocialMedia(response.data.socials);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  const handleCompanySocialChange = (e, target) => {
    let copiedValue = { ...companySocialMedia };
    copiedValue[target] = e.target.value;
    setCompanySocialMedia(copiedValue);
  };
  const handleChange = (event) => {
    setEnabled(event.target.checked);
  };


  const updateVendorDetails = (e) => {
     e.preventDefault();

      const formData = new FormData();
      
      formData.append("c_name", comapnyName);
      formData.append("socials", JSON.stringify(companySocialMedia));
      formData.append("c_email", companyEmail);
      formData.append("c_mobile", companyMobile);
      formData.append("website", companyUrl);
      formData.append("c_gstin", companyGstin);

    
      console.log(formData);

      var config = {
        method: "put",
        url: `http://127.0.0.1:3003/admin/vendor/${vid}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data);
          alert("Updated form data")
        })
        .catch(function (error) {
          console.log(error);
        });
      //.finally(() => resetValues());
    
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-md-12 col-md-offset-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="card-title d-inline">Company Profile</div>
              <Switch
              checked={enabled}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              color="secondary"
            />
            </div>
            <div className="card-body">
              <div id="mainForm">
                <table className="table table-hover">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={comapnyName}
                          disabled={!enabled}
                          onChange={(e) => setComapnyName(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          value={companyUrl}
                          disabled={!enabled}
                          onChange={(e) => setCompanyUrl(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>HO Address</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="ho_address"
                          value={
                            companyAddress.homeAddress +
                            " " +
                            companyAddress.district +
                            " " +
                            companyAddress.city +
                            " " +
                            companyAddress.state +
                            " " +
                            companyAddress.pincode +
                            " " +
                            companyAddress.country
                          }
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>GSTIN</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="gstin"
                          value={companyGstin}
                          disabled={!enabled}
                          onChange={(e) => setCompanyGstin(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Customer Care Mobile</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="cc_mobile"
                          value={companyMobile}
                          disabled={!enabled}
                          onChange={(e) => setCompanyMobile(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Customer Care Email</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="cc_email"
                          value={companyEmail}
                          disabled={!enabled}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Instagram</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="socials[instagram]"
                          value={companySocialMedia.instagram}
                          disabled={!enabled}
                          onChange={(e) =>
                            handleCompanySocialChange(e, "instagram")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Facebook</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="socials[facebook]"
                          value={companySocialMedia.facebook}
                          disabled={!enabled}
                          onChange={(e) =>
                            handleCompanySocialChange(e, "facebook")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Youtube</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="socials[youtube]"
                          value={companySocialMedia.youtube}
                          disabled={!enabled}
                          onChange={(e) =>
                            handleCompanySocialChange(e, "youtube")
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Twitter</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="socials[twitter]"
                          value={companySocialMedia.twitter}
                          disabled={!enabled}
                          onChange={(e) =>
                            handleCompanySocialChange(e, "twitter")
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="submitGroup" className="form-group text-center mt-5">
                  <button type="submit" className="btn btn-outline-success" onClick={updateVendorDetails}>
                    Update
                  </button>
                  <button
                    id="cancelFormEdit"
                    type="button"
                    className="btn btn-outline-danger mx-2"
                    onClick={(e)=>navigate("/tenant")}
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
  );
}
