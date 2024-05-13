import React, { useState } from "react";
import validator from "validator";
import { post } from "../../Network/Config/Axios";
import { set } from "../../utils/Crypto";

export default function Login({ setAuthorized, url }) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState(null);

    const handleLogin = () => {
        if (emailError == null && passError == null) {
            let data = {
                email, password
            }
            post(`login`, data, (e, r) => {
                if(r){
                    set("access_token", r.result.token);
                    set("authorized", true);
                    set("adminId", r.result.id);
                    setAuthorized(true);
                    resetValues();
                }
            })
        }
    };

    const resetValues = () => {
        setEmail("");
        setPassword("");
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
        // if (
        //   event.target.value.length > 0 &&
        //   !validator.isStrongPassword(event.target.value, {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        //     minSymbols: 1,
        //   })
        // ) {
        //   setPassError(
        //     "Password is not strong , must include a number , symbol , uppercase and lowercase ",
        //   );
        // } else {
        //   setPassError(null);
        // }

        setPassword(event.target.value);
    };

    return (
        <div className="main-wrapper">
            <div className="page-wrapper full-page">
                <div className="page-content d-flex align-items-center justify-content-center">
                    <div className="row w-100 mx-0 auth-page">
                        <div className="col-md-8 col-xl-6 mx-auto">
                            <div className="card">
                                <div className="col-md-12 pl-md-1">
                                    <div className="auth-form-wrapper px-4 py-5">
                                        <p className="noble-ui-logo d-block mb-2">
                                            RIDEFORUTRANSPORT<span></span>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
