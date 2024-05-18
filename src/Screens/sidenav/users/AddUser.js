import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get, patch, post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";




export default function AddUser() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
        if(state){
            setName(state.name);
            setNumber(state.phoneNumber);
            setEmail(state.email);
        }
    }, [])

    let addUpdateUser = (e) => {
        e.preventDefault();

        if(state){
            let data = {
                name,
                phoneNumber: number,
                email
            }
            patch(`trips/${state.id}`, data, (e,r)=> {
                if(r){
                    if(r.success){
                        showToast("User updated successfully!");
                        navigate("/users");
                    }
                }
            })
        } else {
            let data = {
                name,
                phoneNumber: number,
                email,
                password: number,
                passwordConfirm: number
            }
            post(`user/register`, data, (e,r)=> {
                if(r){
                    if(r.success){
                        showToast("User added successfully!");
                        navigate("/users");
                    }
                }
            })
        }
    }

    return (
        <div className="page-content">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{state? 'Edit User': 'Add User'}</h4>
                            <div className="cmxform">
                                <div className="form-group row">
                                    <div className="col-md-6 my-3">
                                        <label>User Name</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Phone Number</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="tel"
                                            maxLength={10}
                                            minLength={10}
                                            value={number}
                                            onChange={(e) => {
                                                setNumber(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Email</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6 mt-3">
                                        <button
                                            className="btn btn-outline-primary mr-2 w-100"
                                            onClick={(e) => {
                                                addUpdateUser(e)
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* {masterError && (
                                <p className="text-danger mx-2 my-2">{masterError}</p>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
