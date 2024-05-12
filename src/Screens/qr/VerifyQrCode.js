import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";

export default function VerifyQrCode() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  const tenantS = queryParams.get("tenant");

  console.log({ code }, { tenantS });

  const [authorized, setAuthorized] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passError, setPassError] = useState(null);
  const [rePassError, setRePassError] = useState(null);

  const [vendorId, setVendorId] = useState(null);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(null);

  const [register, setRegister] = useState(true);
  const [rewardsData, setRewardsData] = useState(null);
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    setAuthorized(() => sessionStorage.getItem("authorizedVendor"));
  }, []);

  const getRewards = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/api/prodPoints/qrcode/${code}`,
      headers: {
        slug: tenantS,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setRewardsData(response.data);
        setRedeemed(() => response.data.qrDetails.redeemed);
        // updatePointsAndRedeem();
        if (!response.data.qrDetails.redeemed) {
          let newData = JSON.stringify({
            user_id: vendorId ? vendorId : sessionStorage.getItem("vendorId"),
            user_type: 1,
            qrcode_id: response.data.qrDetails.id,
            product_points: response.data.points,
          });
          var config = {
            method: "post",
            url: "http://127.0.0.1:3003/api/rewardifyHistory/",
            headers: {
              slug: tenantS,
              "Content-Type": "application/json",
            },
            data: newData,
          };

          axios(config)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updatePointsAndRedeem = () => {
    if (!redeemed) {
    } else {
      alert("Error No Update Required");
    }
  };

  const handleLogin = () => {
    alert("user tried to login");
    if (emailError == null && passError == null) {
      var data = JSON.stringify({
        email: email,
        password: password,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/api/vendorUser/login",
        headers: {
          slug: tenantS,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.success) {
            sessionStorage.setItem("access_token", response.data.token);
            sessionStorage.setItem("authorizedVendor", true);
            sessionStorage.setItem("vendorId", response.data["vendor_data"].id);
            setVendorId(response.data["vendor_data"].id);
            console.log(response.data["vendor_data"].id);
            setAuthorized(true);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("Try Again After sometime");
        });
    }
  };

  const handleSignup = () => {
    alert("user tried to sign up ");

    if (
      passError == null &&
      rePassError == null &&
      emailError == null &&
      phoneErr == null
    ) {
      var data = JSON.stringify({
        email: email,
        password: password,
        phone: phone,
        name: name,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/api/admin/add",
        headers: {
          slug: "tenant1",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          alert(JSON.stringify(response.data));
          //console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          resetValues();
        });
    }
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
    setName("");
    setRePassword("");
    setPhone("");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setRegister(!register);
  };

  const handlePhoneChange = (event) => {
    if (
      !validator.isMobilePhone(event.target.value, ["en-IN"]) &&
      event.target.value > 0
    ) {
      setPhoneErr("Phone no Invalid");
    } else {
      setPhoneErr(null);
    }

    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(validator.isEmail(event.target.value));
    if (
      !validator.isEmail(event.target.value) &&
      event.target.value.length > 0
    ) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }

    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
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
      setPassError(
        "Password is not strong , must include a number , symbol , uppercase and lowercase "
      );
    } else {
      setPassError(null);
    }

    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    if (event.target.value !== password) {
      setRePassError("Pasword Not Matching");
    } else {
      setRePassError(null);
    }

    setRePassword(event.target.value);
  };

  return (
    <div className="main-wrapper">
      <div
        className={
          authorized ? "page-wrapper full-page" : "page-wrapper full-page"
        }
      >
        {/*{authorized?<Sidebar2 />:<div></div>} */}
        {!authorized ? (
          <div className="page-content d-flex align-items-center justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-md-8 col-xl-6 mx-auto">
                <div className="card">
                  {register ? (
                    //Login
                    <div className="col-md-12 pl-md-1">
                      <div className="auth-form-wrapper px-4 py-5">
                        <p className="noble-ui-logo d-block mb-2">
                          RIDE4UTRANSPORT<span></span>
                        </p>
                        <h5 className="text-muted font-weight-normal mx-auto mb-4">
                          Welcome back! Log in to your account.
                        </h5>
                        <div className="forms-sample">
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={handleEmailChange}
                              placeholder="Email"
                            />
                            <p className="text-danger p-2 m-2">{emailError}</p>
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder="Password"
                            />
                            <p className="text-danger p-2 m-2">{passError}</p>
                          </div>
                        </div>
                        <div className="form-check form-check-flat form-check-primary ml-4">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label ml-2">
                            Remember me
                          </label>
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                        <button
                          className="d-block mt-3 text-muted"
                          onClick={handleChange}
                          disabled
                        >
                          Not a user? Sign up
                        </button>
                      </div>
                    </div>
                  ) : (
                    //Signup
                    <div className="col-md-12 pl-md-0">
                      <div className="auth-form-wrapper px-4 py-5">
                        <a href="#" className="noble-ui-logo d-block mb-2">
                          RIDE4UTRANSPORT<span></span>
                        </a>
                        <h5 className="text-muted font-weight-normal mb-4">
                          Create a free account.
                        </h5>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputUsername1"
                              placeholder="Full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              onChange={handleEmailChange}
                              placeholder="Email"
                            />
                            <p className="text-danger p-1 m-1">{emailError}</p>
                          </div>
                          <div className="form-group">
                            <label>Phone No</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputUsername1"
                              value={phone}
                              placeholder="9988776655"
                              onChange={handlePhoneChange}
                            />
                            <p className="text-danger p-0 m-0">{phoneErr}</p>
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder="Password"
                            />
                            <p className="text-danger p-1 m-1">{passError}</p>
                          </div>
                          <div className="form-group">
                            <label>Re-Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={rePassword}
                              onChange={handleRePasswordChange}
                              placeholder="Re-Password"
                            />
                            <p className="text-danger p-2 m-2">{rePassError}</p>
                          </div>
                          <div className="form-check form-check-flat form-check-primary ml-4">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <label className="form-check-label ml-2">
                              Remember me
                            </label>
                          </div>
                          <div className="mt-3">
                            <button
                              className="btn btn-primary text-white mr-2 mb-2 mb-md-0"
                              onClick={handleSignup}
                            >
                              Sign up
                            </button>
                          </div>
                          <button
                            className="d-block mt-3 text-muted"
                            onClick={handleChange}
                          >
                            Already a user? Sign in
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-content">
            {/*
    <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Tables</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data Table
          </li>
        </ol>
      </nav>
     */}
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">VerifyQrCode</div>
                  </div>

                  <div className="card-body">
                    {
                      //   <h6 className="card-title">Data Table</h6>
                      // <p className="card-description">
                      //   Read the{" "}
                      //   <a href="https://datatables.net/" target="_blank">
                      //     {" "}
                      //     Official DataTables Documentation{" "}
                      //   </a>
                      //   for a full list of instructions and other options.
                      // </p>
                    }

                    <h2>
                      Unique Code <span>{code}</span>
                    </h2>
                    <button
                      className="btn btn-outline-primary my-4"
                      onClick={getRewards}
                    >
                      Get Rewards
                    </button>
                    {rewardsData && !redeemed ? (
                      <div>
                        <table className="table table-striped ">
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                          <tr>
                            <td>Points</td>
                            <td>{rewardsData["points"]}</td>
                          </tr>
                          <tr>
                            <td>Product Name</td>
                            <td>{rewardsData["prodDetails"].p_name}</td>
                          </tr>
                          <tr>
                            <td>Product Description</td>
                            <td>{rewardsData["prodDetails"].p_description}</td>
                          </tr>
                          <tr>
                            <td>Product Category</td>
                            <td>{rewardsData["prodDetails"].categoryname}</td>
                          </tr>
                          <tr>
                            <td>Product Sub Category</td>
                            <td>
                              {rewardsData["prodDetails"].subcategoryname}
                            </td>
                          </tr>
                          <tr>
                            <td>Batch Code</td>
                            <td>
                              {rewardsData["prodDetails"].subcategoryname}
                            </td>
                          </tr>
                        </table>
                      </div>
                    ) : (
                      <div>
                        {redeemed && (
                          <span className="btn btn-outline-danger">
                            Already Redeemed
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
