import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { TenMp } from "@mui/icons-material";
import { get, post, patch } from "../../../Network/Config/Axios";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { showToast } from "../../../utils/Toast";





export default function AddTrip() {
    const navigate = useNavigate();

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: "AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI",
    });


    const addTripObj = {
        "vendor": "",
        "from": "",
        "to": "",
        "duration": 0,
        "tripDate": "",
        "vehicle": "",
        "drive": "",
        "luggage": [],
        "stops": "",
        "bookingMinimumAmount": "",
        "totalTripAmount": "",
        "refreshments": false,
        "cancelationCharges": "",
        "recurring": "",
        "promoCodes": "",
        "totalSeats": 0,
        "totalSeatsLeft": 0
    }





    const [companyMobile, setCompanyMobile] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [contactPersonNumber, setContactPersonNumber] = useState("");




    const [picture, setPicture] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [companyGstin, setCompanyGstin] = useState("");
    const [panelStatus, setPanelStatus] = useState(0);
    const [companyStatus, setCompanyStatus] = useState(0);
    const [companyUrl, setCompanyUrl] = useState("");
    const [qrType, setQrType] = useState(0);
    const [demoValue, setDemoValue] = useState(0);

    const [companyUserReqirements, setCompanyUserReqirements] = useState(0);
    const [vendorId, setVendorId] = useState(0);


    //trips 
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState({});
    const [driver, setDriver] = useState({ 'name': '', 'id': '' });
    const [vehicle, setVehicle] = useState({ 'name': '', 'id': '' });
    const [luggage, setLuggage] = useState([]);
    const [refreshments, setRefreshments] = useState(false);
    const [bookingMinimumAmount, setBookingMinimumAmount] = useState(25);
    const [totalTripAmount, settotalTripAmount] = useState(0);
    const [tripDiscription, setTripDiscription] = useState('');
    const [cancelationCharges, setCancelationCharges] = useState(0);
    const [requestedTrip, setRequestedTrip] = useState(false);
    const [requestedUser, setRequestedUser] = useState({ 'name': '', 'id': '' });
    const [tripDate, setTripDate] = useState('');
    const [tripDateReturn, setTripDateReturn] = useState('');
    const [returnTrip, setReturnTrip] = useState(false);
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [stops, setStops] = useState([]);
    const [stopsReturn, setStopsReturn] = useState([]);
    const { state } = useLocation();


    const [tripDetails, setTripDetails] = useState(addTripObj);
    const [allPossibleFares, setAllPossibleFares] = useState([])
    const [allPossibleFaresReturn, setAllPossibleFaresReturn] = useState([])




    // errors

    const [companyEmailError, setCompanyEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordReError, setPasswordReError] = useState(null);
    const [masterError, setMasterError] = useState(null);
    const [companyMobileError, setCompanyMobileError] = useState(null);
    const [logoErr, setLogoErr] = useState(null);

    useEffect(() => {
        if (
            !companyEmailError &&
            !passwordError &&
            !passwordReError &&
            !companyMobileError
        ) {
            setMasterError(null);
        }
    }, [companyEmailError, passwordError, passwordReError, companyMobileError]);



    let addUpdateTrip = (e) => {
        e.preventDefault();

        if (state) {

            let data = {
                "vendor": vendor.id,
                "from": from,
                "to": to,
                "duration": 0,
                "tripDate": tripDate,
                "vehicle": vehicle.id,
                "driver": driver.id,
                "luggage": [...luggage],
                "stops": [...stops],
                "totalTripAmount": totalTripAmount,
                "refreshments": refreshments,
                "returnTrip": returnTrip ?
                    {
                        "isReturnTrip": true,
                        "vendor": vendor.id,
                        "from": from,
                        "to": to,
                        "duration": 0,
                        "tripDate": tripDateReturn,
                        "vehicle": vehicle.id,
                        "driver": driver.id,
                        "luggage": [...luggage],
                        "stops": [...stopsReturn],
                        "totalTripAmount": totalTripAmount,
                        "refreshments": refreshments
                    } : null,
                "fares": allPossibleFares
            }
            patch(`trips/${state.id}`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("User updated successfully!");
                        navigate("/trips");
                    }
                }
            })
        } else {
            let data = {
                "vendor": vendor.id,
                "from": from,
                "to": to,
                "duration": 0,
                "tripDate": tripDate,
                "vehicle": vehicle.id,
                "driver": driver.id,
                "luggage": [...luggage],
                "stops": [...stops],
                "totalTripAmount": totalTripAmount,
                "refreshments": refreshments,
                "returnTrip": returnTrip ?
                    {
                        "isReturnTrip": true,
                        "vendor": vendor.id,
                        "from": from,
                        "to": to,
                        "duration": 0,
                        "tripDate": tripDateReturn,
                        "vehicle": vehicle.id,
                        "driver": driver.id,
                        "luggage": [...luggage],
                        "stops": [...stopsReturn],
                        "totalTripAmount": totalTripAmount,
                        "refreshments": refreshments
                    } : null,
                "fares": allPossibleFares

            }
            post(`trips/add`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("Trip added successfully!");
                        navigate("/trip");
                    }
                }
            })
        }
    }

    useEffect(() => {

        get(`vehicle/all`, (e, r) => {
            if (r) {
                setVehicles(r.result);
                post(`driver/all`, {}, (e, r1) => {
                    if (r1) {
                        setDrivers(r1.result.items);
                        post(`vendor/all`, {}, (e, r2) => {
                            if (r2) {
                                setVendors(r2.result.items);
                            }
                        })
                    }
                })
            }
        })
    }, [])

    useEffect(() => {
        let tempFareObj = []
        let stopsCurr = [];
        stopsCurr.push(from);
        stopsCurr.push(...stops);
        stopsCurr.push(to);
        for (let index = 0; index < stopsCurr.length; index++) {
            for (let j = index + 1; j < stopsCurr.length; j++) {
                let element = {
                    "from": { "name": stopsCurr[index].place_name, "place_id": stopsCurr[index].place_id },
                    "to": { "name": stopsCurr[j].place_name, "place_id": stopsCurr[j].place_id },
                    "fare": 0
                }
                tempFareObj.push(element);
            }
        }
        setAllPossibleFares(tempFareObj);
        console.log(allPossibleFares)
    }, [stops, from, to])

    useEffect(() => {
        let tempFareObj = []
        let stopsCurr = [];
        stopsCurr.push(to);
        stopsCurr.push(...stopsReturn);
        stopsCurr.push(from);
        for (let index = 0; index < stopsCurr.length; index++) {
            for (let j = index + 1; j < stopsCurr.length; j++) {
                let element = {
                    "from": stopsCurr[index].place_name,
                    "to": stopsCurr[j].place_name,
                    "fare": 0
                }
                tempFareObj.push(element);
            }
        }
        setAllPossibleFaresReturn(tempFareObj);
        console.log(allPossibleFaresReturn)
    }, [stopsReturn])





    const setFare = (event, idx) => {
        console.log(event.target.value, idx)
        let allPossibleFaresTemp = [...allPossibleFares];
        console.log({ allPossibleFaresTemp })
        allPossibleFaresTemp[idx].fare = event.target.value;
        setAllPossibleFares(allPossibleFaresTemp);
        console.log({ allPossibleFares });
    }

    const setFareReturn = (event, idx) => {
        console.log(event.target.value, idx)
        let allPossibleFaresTemp = [...allPossibleFaresReturn];
        console.log({ allPossibleFaresTemp })
        allPossibleFaresTemp[idx].fare = event.target.value;
        setAllPossibleFaresReturn(allPossibleFaresTemp);
        console.log({ allPossibleFaresReturn });
    }

    const removeFromStops = (e, key) => {
        console.log(key);
        let oldValues = [...stops];
        oldValues = oldValues.filter((stop) => stop != key);
        setStops(oldValues);
    };

    const removeFromStopsReturn = (e, key) => {
        console.log(key);
        let oldValues = [...stops];
        oldValues = oldValues.filter((stop) => stop != key);
        setStopsReturn(oldValues);
    };



    const handleLocationSelected = useCallback((place) => {
        if (place != null) {
            let lng = place.geometry.location.lng();
            let lat = place.geometry.location.lat();
            let place_id = place.place_id;
            let place_name = place.formatted_address;

            let stopsObj = { lat, lng, place_id, place_name };
            setStops((prevStop) => [...prevStop, stopsObj]);
        }
    }, [stops]);

    const handleLocationSelectedReturn = useCallback((place) => {
        if (place != null) {
            let lng = place.geometry.location.lng();
            let lat = place.geometry.location.lat();
            let place_id = place.place_id;
            let place_name = place.formatted_address;

            let stopsObj = { lat, lng, place_id, place_name };
            setStopsReturn((prevStop) => [...prevStop, stopsObj]);
        }
    }, [stopsReturn]);


    const handleAddTripChange = (e, key) => {

        let copiedValue = { ...tripDetails };
        if (key == 'from' || key == 'to') {
            copiedValue[key] = e;
        } else {
            copiedValue[key] = e;
        }
        setTripDetails(copiedValue);
    };

    const resetValues = () => {

        setVehicle([]);
        setDrivers([]);
        setVendors([]);
        setVendor({});
        setDriver({ 'name': '', 'id': '' });
        setVehicle({ 'name': '', 'id': '' });
        setLuggage('s');
        settotalTripAmount(0);
        setTripDiscription('');
        setRequestedTrip(false);
        setReturnTrip(false);
        setFrom({});
        setTo({});
        setStops([]);
        setStopsReturn([]);
        setAllPossibleFares([]);
        setAllPossibleFaresReturn([]);

    };

    const handleLuggageChange = (event) => {
        if(luggage.includes(event.target.value)){
            luggage.splice(luggage.indexOf(event.target.value), 1);
        } else {
            luggage.push(event.target.value);
        }
    };


    const handleVehicleChange = async (event) => {
        event.preventDefault();
        if (event.target.value != '') {
            let tempVehicle = {};
            tempVehicle.name = (vehicles.find((o => o.id === event.target.value))).name;
            tempVehicle.id = event.target.value;
            setVehicle(tempVehicle);
        }
    };
    const handleVendorChange = async (event) => {
        event.preventDefault();
        if (event.target.value != '') {
            let tempVendor = {};
            tempVendor.name = (vendors.find((o => o.id === event.target.value))).name;
            tempVendor.id = event.target.value;
            setVendor(tempVendor);
        }
    };
    const handleDriverChange = async (event) => {
        event.preventDefault();
        if (event.target.value != '') {
            let tempDriver = {};
            tempDriver.name = (drivers.find((o => o.id === event.target.value))).name;
            tempDriver.id = event.target.value;
            setDriver(tempDriver);
        }
    };
    const handleRefreshmentChange = async (event) => {
        event.preventDefault();
        setRefreshments(event.target.value);
    };

    const handleReturnTrip = async (event) => {
        event.preventDefault();
        setReturnTrip((prevVal) => !prevVal);
    };

    return (
        <div className="page-content">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add New Trip</h4>
                            <div className="cmxform">
                                <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleVendorChange}
                                        >
                                            <option value={''}>Select Vendor</option>
                                            {vendors.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>

                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Origin </label>
                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"

                                            onPlaceSelected={(place) => {

                                                let lng = place.geometry.location.lng();
                                                let lat = place.geometry.location.lat();
                                                let place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let from = { lat, lng, place_id, place_name };
                                                setFrom(from);
                                                console.log(from);
                                            }}
                                        />



                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label>Destination </label>

                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            onPlaceSelected={(place) => {

                                                var lng = place.geometry.location.lng();
                                                var lat = place.geometry.location.lat();
                                                var place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let to = { lat, lng, place_id, place_name };
                                                setTo(to);
                                                console.log(to);

                                            }}
                                        />
                                    </div>


                                    <div className="col-md-6 my-3">
                                        <div>
                                            <label className="text-capitalize font-weight-bold">
                                                {" "}
                                                Stops
                                            </label>
                                        </div>
                                        {stops.map((key, idx) => (
                                            <label key={idx}>
                                                <span
                                                    className="px-2 mx-2 btn btn-outline-danger"
                                                    onClick={(e) => removeFromStops(e, key)}

                                                >
                                                    {key.place_name}
                                                </span>
                                            </label>
                                        ))}

                                        <label>
                                            <Autocomplete
                                                apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                                className="form-control"
                                                type="text"

                                                onPlaceSelected={(place) => {
                                                    handleLocationSelected(place);
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 my-3">
                                        <label>Trip Description</label>
                                        <textarea
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="string"
                                            value={tripDiscription}
                                            onChange={(e) => setTripDiscription(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Luggage Type</label>
                                        <select
                                            multiple
                                            className="js-example-basic-multiple w-100"
                                            value={luggage}
                                            onChange={handleLuggageChange}
                                        >
                                            <option value={'s'}>Small</option>
                                            <option value={'m'}>Medium</option>
                                            <option value={'l'}>Large</option>

                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Vehicle</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleVehicleChange}>
                                            <option value={''}>Select Vehicle</option>
                                            {vehicles?.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Driver</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleDriverChange}>
                                            <option value={''}>Select Driver</option>
                                            {drivers.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Refreshments </label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleRefreshmentChange}>
                                            <option value={'true'}>False</option>
                                            <option value={'false'}>True</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Return Trip</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleReturnTrip}>
                                            <option value={'true'}>False</option>
                                            <option value={'false'}>True</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Booking Amount</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="number"
                                            value={bookingMinimumAmount}
                                            onChange={(e) => setBookingMinimumAmount(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-12 my-12">

                                        <label>Fares</label>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">From</th>
                                                    <th scope="col">To</th>
                                                    <th scope="col">Fare</th>
                                                </tr>
                                            </thead>
                                            {allPossibleFares?.map((key, idx) => (

                                                <tbody>
                                                    <tr>
                                                        <th scope="row" key={idx}>{idx + 1}</th>
                                                        <td>{key.from.name}</td>
                                                        <td>{key.to.name}</td>
                                                        <input

                                                            className="form-control"
                                                            type="number"
                                                            value={key.fare}
                                                            onChange={(e) => setFare(e, idx)}
                                                        />
                                                    </tr>

                                                </tbody>
                                            ))}
                                        </table>

                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Trip Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DateTimePicker']}>
                                                <DemoItem>
                                                    <DateTimePicker
                                                        onChange={(e) => setTripDate(e.$d.toISOString())}
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </div>

                                </div>




                            </div>

                            {returnTrip && <div className="cmxform">
                                <h1 className="card-title">Add Return Trip</h1>

                                <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={tripDetails.vendor}
                                            onChange={handleVendorChange}
                                        >
                                            <option value={''}>Select Vendor</option>
                                            {vendors.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleVendorChange}>
                                            <option value={''}>Select Vendor</option>
                                            {vendors?.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Origin </label>
                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            value={from.place_name}
                                            onPlaceSelected={(place) => {

                                                let lng = place.geometry.location.lng();
                                                let lat = place.geometry.location.lat();
                                                let place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let destination = { lat, lng, place_id, place_name };
                                                setTo(destination);
                                                console.log(destination);
                                            }}
                                        />



                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label>Destination </label>

                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            value={to.place_name}
                                            onPlaceSelected={(place) => {

                                                var lng = place.geometry.location.lng();
                                                var lat = place.geometry.location.lat();
                                                var place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let origin = { lat, lng, place_id, place_name };
                                                setFrom(origin);
                                                console.log(origin);

                                            }}
                                        />
                                    </div>


                                    <div className="col-md-6 my-3">
                                        <div>
                                            <label className="text-capitalize font-weight-bold">
                                                {" "}
                                                Return Stops
                                            </label>
                                        </div>
                                        {stopsReturn.map((key, idx) => (
                                            <label key={idx}>
                                                <span
                                                    className="px-2 mx-2 btn btn-outline-danger"
                                                    onClick={(e) => removeFromStopsReturn(e, key)}

                                                >
                                                    {key.place_name}
                                                </span>
                                            </label>
                                        ))}

                                        <label>
                                            <Autocomplete
                                                apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                                className="form-control"
                                                type="text"

                                                onPlaceSelected={(place) => {
                                                    handleLocationSelectedReturn(place);
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <div className="col-md-12 my-12">

                                        <label>Fares Return</label>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">From</th>
                                                    <th scope="col">To</th>
                                                    <th scope="col">Fare</th>
                                                </tr>
                                            </thead>
                                            {allPossibleFaresReturn?.map((key, idx) => (

                                                <tbody>
                                                    <tr>
                                                        <th scope="row" key={idx}>{idx + 1}</th>
                                                        <td>{key.from}</td>
                                                        <td>{key.to}</td>
                                                        <input

                                                            className="form-control"
                                                            type="number"
                                                            value={key.fare}
                                                            onChange={(e) => setFareReturn(e, idx)}
                                                        />
                                                    </tr>

                                                </tbody>
                                            ))}
                                        </table>
                                    </div>
                                    <div className="col-md-6 my-3">
                                        <label>Return Trip Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DateTimePicker']}>
                                                <DemoItem>
                                                    <DateTimePicker
                                                        onChange={(e) => setTripDateReturn(e.$d.toISOString())}
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </div>

                                </div>
                            </div>}

                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6 mt-3">
                                    <button
                                        className="btn btn-outline-primary mr-2 w-100"
                                        onClick={(e) => addUpdateTrip(e)}
                                    >
                                        Submit
                                    </button>
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
