import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get, patch, post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";




export default function AddDriver() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [vendor, setVendor] = useState('');
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
        post(`vendor/all`, {}, (e, r2) => {
            if (r2) {
                setVendors(r2.result.items);
                if (state) {
                    setName(state.name);
                    setNumber(state.number);
                    setEmail(state.email);
                    let vendorTemp = {};
                    r2.result.items.array.forEach(element => {
                        if (element.id == state.vendor[0].id) {
                            vendorTemp = element;
                        }
                    });
                    setVendor(vendorTemp);
                } else {
                    setVendor(r2.result.items[0]);
                }
            }
        })
    }, [])

    let addUpdateDriver = (e) => {
        e.preventDefault();

        if (state) {
            let data = {
                name,
                number,
                email,
                vendorId: vendor.id
            }
            patch(`driver/${state.id}`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("Driver updated successfully!");
                        navigate("/drivers");
                    }
                }
            })
        } else {
            let data = {
                name,
                number,
                email,
                password: `${name}@2024`,
                passwordConfirm: `${name}@2024`,
                vendorId: vendor.id
            }
            post(`driver/add`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("Driver added successfully!");
                        navigate("/drivers");
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
                            <h4 className="card-title">{state ? 'Edit Driver' : 'Add Driver'}</h4>
                            <div className="cmxform">
                                <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={vendor}
                                            onChange={(e) => {
                                                setVendor(e.target.value);
                                            }}
                                        >{vendors.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 my-3">
                                        <label>Driver Name</label>
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
                                                addUpdateDriver(e)
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
