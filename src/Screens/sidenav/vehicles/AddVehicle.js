import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useLocation, useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { TenMp } from "@mui/icons-material";
import DateTimePicker from 'react-datetime-picker';
import { get, patch, post } from "../../../Network/Config/Axios";
import { showToast } from "../../../utils/Toast";




export default function AddVehicle() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [name, setName] = useState('');
    const [vendor, setVendor] = useState('');
    const [number, setNumber] = useState('');
    const [seats, setSeats] = useState(0);
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
        post(`vendor/all`, {}, (e, r2) => {
            if (r2) {
                setVendors(r2.result.items);
                if(state){
                    setName(state.name);
                    setNumber(state.number);
                    setSeats(state.totalSeats);
                    let vendorTemp = {};
                    r2.result.items.array.forEach(element => {
                        if(element.id == state.vendor[0].id){
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

    let addUpdateVehicle = (e) => {
        e.preventDefault();
        console.log(vendor);
        let data = {
            name,
            number,
            totalSeats: seats,
            vendor: vendor.id
        }

        if(state){
            patch(`vehicle/${state.id}`, data, (e,r)=> {
                if(r){
                    if(r.success){
                        showToast("Vehicle updated successfully!");
                        navigate("/vehicles");
                    }
                }
            })
        } else {
            post(`vehicle/add`, data, (e,r)=> {
                if(r){
                    if(r.success){
                        showToast("Vehicle added successfully!");
                        navigate("/vehicles");
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
                            <h4 className="card-title">{state? 'Edit Vehicle': 'Add Vehicle'}</h4>
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
                                        <label>Vehicle Name</label>
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
                                        <label>Vehicle Number</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="text"
                                            value={number}
                                            onChange={(e) => {
                                                setNumber(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Total Seats</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="number"
                                            value={seats}
                                            onChange={(e) => {
                                                setSeats(e.target.value)
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
                                                addUpdateVehicle(e)
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
