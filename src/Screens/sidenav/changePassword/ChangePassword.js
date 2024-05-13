import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function ChangePassword() {
  const navigate = useNavigate();

  
  const [oldPassword, setOldPassword] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyRePassword, setCompanyRePassword] = useState("");

  // errors

  const [passwordError, setPasswordError] = useState(null);
  const [passwordReError, setPasswordReError] = useState(null);
  const [masterError, setMasterError] = useState(null);



  useEffect(() => {
    if (
      !passwordError &&
      !passwordReError 
    ) {
      setMasterError(null);
    }
  }, [ passwordError, passwordReError]);

  // const handleEmailChange = (event) => {
  //   console.log(event.target.value);
  //   console.log(validator.isEmail(event.target.value));
  //   if (
  //     !validator.isEmail(event.target.value) &&
  //     event.target.value.length > 0
  //   ) {
  //     setCompanyEmailError("Email is invalid");
  //   } else {
  //     setCompanyEmailError(null);
  //   }
  //   setCompanyEmail(event.target.value);
  // };

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


  const handleChangePassword = (e) => {
    e.preventDefault();
    if (
      passwordError == null &&
      passwordReError == null
   
    ) {
        // const formData = new FormData();
        // formData.append("password", companyPassword);
        // formData.append("u_name", oldPassword);
       

        // console.log(formData);

        var data = JSON.stringify({
          "oldPassword": oldPassword,
          "password": companyPassword
        });
        let id = sessionStorage.getItem("adminId");
        var config = {
          method: 'put',
          url: 'http://127.0.0.1:3003/admin/changepassword/'+id,
          headers: { 
       //    'slug': 'tenant1', 
            'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 
            'Content-Type': 'application/json', 
            withCredentials: true
          },
          
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log((response.data));
          alert('Password Chanhed Successfully');
        })
        .catch(function (error) {
          console.log(error);
          alert('Password Chanhed Failure Try after some time ');
        }).finally(resetValues);
        



        // var config = {
        //   method: "post",
        //   url: "http://127.0.0.1:3003/api/vendorUser/add",
        //   headers: {
        //     slug: tenant,
        //   },
        //   data: data,
        // };
        // axios(config)
        //   .then(function (response) {
        //     console.log(response.data);
        //     console.log(response.data.data);
        //     const { id } = response.data.data;

        //     if (!id) {
        //       alert("Some issues occured while registring please try agan ");
        //     } else {
        //       resetValues();
        //       alert(`redirecting to set Rewardify Options ${id}`);
        //       navigate(`/tenant`);
            
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })
        //   .finally(() => {});
     
    } else {
      setMasterError(
        "Please Fill All the Required fields and check the errors",
      );
    }
  };

  const resetValues = () => {
    setOldPassword("");
    setCompanyPassword("");
    setCompanyRePassword("");
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Admin Password</h4>
              <div className="cmxform">
                <div className="form-group row">
                  <div className="col-md-4 my-3">
                    <label>Old Password </label>
                    <input
                      id="m_name"
                      className="form-control"
                      name="m_name"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 my-3">
                    <label>Password </label>
                    <input
                      id="m_no"
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
                  <div className="col-md-4 my-3">
                    <label>Re-Password </label>
                    <input
                      id="m_no"
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

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e) => handleChangePassword(e)}
                    >
                      Update Password
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
