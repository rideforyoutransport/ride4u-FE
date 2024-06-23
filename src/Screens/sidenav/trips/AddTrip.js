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
import dayjs from "dayjs";
import moment from "moment";





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


    //trips 
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState({});
    const [driver, setDriver] = useState({});
    const [vehicle, setVehicle] = useState({});
    const [luggage, setLuggage] = useState([]);
    const [refreshments, setRefreshments] = useState(false);
    const [bookingMinimumAmount, setBookingMinimumAmount] = useState(25);
    const [totalTripAmount, settotalTripAmount] = useState(0);
    const [tripDiscription, setTripDiscription] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [tripDateReturn, setTripDateReturn] = useState('');
    const [returnTrip, setReturnTrip] = useState(false);
    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [fromReturn, setFromReturn] = useState({});
    const [toReturn, setToReturn] = useState({});
    const [stops, setStops] = useState([]);
    const [stopsReturn, setStopsReturn] = useState([]);
    const { state } = useLocation();

    const [allPossibleFares, setAllPossibleFares] = useState([]);
    const [allPossibleFaresReturn, setAllPossibleFaresReturn] = useState([])




    // errors

    const [companyEmailError, setCompanyEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordReError, setPasswordReError] = useState(null);
    const [masterError, setMasterError] = useState(null);
    const [companyMobileError, setCompanyMobileError] = useState(null);

    // useEffect(() => {
    //     if (
    //         !companyEmailError &&
    //         !passwordError &&
    //         !passwordReError &&
    //         !companyMobileError
    //     ) {
    //         setMasterError(null);
    //     }
    // }, [companyEmailError, passwordError, passwordReError, companyMobileError]);

    useEffect(() => {
        let data = {
            "from": 0,
            "to": 500,
            "expandKeys": {
                "from": [
                    "name",
                    "id",
                    "place_id",
                    "geoLocation"
                ],
                "to": [
                    "name",
                    "id",
                    "place_id",
                    "geoLocation"
                ],
                "vehicle": [],
                "stops": [
                    "name",
                    "id",
                    "place_id",
                    "geoLocation"
                ],
                "driver": ["name", "id", "number", "rating"],
                "vendor": [],
            }
        }

        post(`trips/all`, data, (e, r) => {
            if (r) {
                let tempTrip = [{ id: '', name: "Select Trip" }];
                r.result.forEach(trip => {
                    if (trip.returnTrip) {
                        trip.name = trip.from.name + " - " + trip.to.name + " - " + trip.from.name;
                    } else {
                        trip.name = trip.from.name + " - " + trip.to.name;
                    }
                })
                tempTrip.push(...r.result);
                setTrips(tempTrip);
                get(`vehicle/all`, (e, r) => {
                    if (r) {
                        let tempVehicles = [{ id: '', name: "Select Vehicle" }, ...r.result];
                        setVehicles(tempVehicles);
                        post(`driver/all`, {}, (e, r1) => {
                            if (r1) {
                                let tempDrivers = [{ id: '', name: "Select Driver" }, ...r1.result.items];
                                setDrivers(tempDrivers);
                                post(`vendor/all`, {}, (e, r2) => {
                                    if (r2) {
                                        setVendors(r2.result.items);
                                        if (state) {
                                            setValues(state, tempVehicles, tempDrivers, r2.result.items);
                                        }
                                    }
                                })
                            }
                        })


                    }
                })
            }
        })




    }, [])

    let setValues = (trip, vehicles, drivers, vendors) => {
        let vehicleTemp = {}
        vehicles.forEach(element => {
            if (element.id == trip.vehicle.id) {
                vehicleTemp = element;
            }
        });
        setVehicle(vehicleTemp);
        let driverTemp = {}
        drivers.forEach(element => {
            if (element.id == trip.driver.id) {
                driverTemp = element;
            }
        });
        setDriver(driverTemp);
        let vendorTemp = {};
        vendors.forEach(element => {
            if (element.id == trip.vendor[0].id) {
                vendorTemp = element;
            }
        });
        setVendor(vendorTemp);
        setLuggage(trip.luggage);
        setTripDiscription(trip.tripDescription);
        setRefreshments(trip.refreshments);
        setReturnTrip(trip.returnTrip ? true : false);
        let from = trip.from;
        from.lat = trip.from.geoLocation.lat;
        from.lng = trip.from.geoLocation.lng;
        from.place_name = from.name;
        setFrom(from);
        let to = trip.to;
        to.lat = trip.to.geoLocation.lat;
        to.lng = trip.to.geoLocation.lng;
        to.place_name = to.name;
        setTo(to);
        let stops = [...trip.stops];
        stops.map(stop => {
            stop.lat = stop.geoLocation.lat;
            stop.lng = stop.geoLocation.lng;
            stop.place_name = stop.name;
        })
        setStops(stops);
        setAllPossibleFares(trip.fares.fares);
        if(state){
            setTripDate(trip.tripDate);
        }
        if (trip.returnTrip) {
            let stops = [...trip.returnTrip.stops];
            stops.map(stop => {
                stop.lat = stop.geoLocation.lat;
                stop.lng = stop.geoLocation.lng;
                stop.place_name = stop.name;
            })
            setStopsReturn(stops);
            setAllPossibleFaresReturn(trip.returnTrip.fares.fares);

            let from = trip.returnTrip.from;
            from.lat = trip.returnTrip.from.geoLocation.lat;
            from.lng = trip.returnTrip.from.geoLocation.lng;
            from.place_name = from.name;
            setFromReturn(from);

            let to = trip.returnTrip.to;
            to.lat = trip.returnTrip.to.geoLocation.lat;
            to.lng = trip.returnTrip.to.geoLocation.lng;
            to.place_name = to.name;
            setToReturn(to);

            if(state){
                setTripDateReturn(trip.returnTrip.tripDate);
            }
        }
    }

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
                "tripDescription": tripDiscription,
                "totalTripAmount": totalTripAmount,
                "refreshments": refreshments,
                "returnTrip": returnTrip ?
                    {
                        "isReturnTrip": true,
                        "vendor": vendor.id,
                        "from": to,
                        "to": from,
                        "duration": 0,
                        "tripDate": tripDateReturn,
                        "tripDescription": tripDiscription,
                        "vehicle": vehicle.id,
                        "driver": driver.id,
                        "luggage": [...luggage],
                        "stops": [...stopsReturn],
                        "totalTripAmount": totalTripAmount,
                        "refreshments": refreshments,
                        "fares": allPossibleFaresReturn
                    } : null,
                "fares": allPossibleFares
            }
            patch(`trips/${state.id}`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("Trip updated successfully!");
                        navigate("/");
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
                "tripDescription": tripDiscription,
                "totalTripAmount": totalTripAmount,
                "refreshments": refreshments,
                "bookingAmount": bookingMinimumAmount,
                "returnTrip": returnTrip ?
                    {
                        "isReturnTrip": true,
                        "vendor": vendor.id,
                        "from": fromReturn,
                        "to": toReturn,
                        "duration": 0,
                        "tripDate": tripDateReturn,
                        "vehicle": vehicle.id,
                        "driver": driver.id,
                        "luggage": [...luggage],
                        "stops": [...stopsReturn],
                        "bookingAmount": bookingMinimumAmount,
                        "totalTripAmount": totalTripAmount,
                        "refreshments": refreshments,
                        "fares": allPossibleFaresReturn,
                        "tripDescription": tripDiscription
                    } : null,
                "fares": allPossibleFares

            }
            post(`trips/add`, data, (e, r) => {
                if (r) {
                    if (r.success) {
                        showToast("Trip added successfully!");
                        navigate("/");
                    }
                }
            })
        }
    }

    useEffect(() => {
        if (!state || JSON.stringify(to) !== JSON.stringify(state.to) || JSON.stringify(from) !== JSON.stringify(state.from) || JSON.stringify(stops) !== JSON.stringify(state.stops)) {
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
        } else {
            if(state){
                setAllPossibleFares(state.fares.fares);
            }
        }
        console.log(allPossibleFares)
    }, [stops, from, to])


    // set return stops 
    useEffect(() => {
        if (returnTrip) {
            setStopsReturn([...stops].reverse());
            setFromReturn(to);
            setToReturn(from);
        }
    }, [returnTrip, from, to, stops])

    useEffect(() => {
        if (!state || (state.returnTrip && (JSON.stringify(fromReturn) !== JSON.stringify(state.returnTrip.from) || JSON.stringify(toReturn) !== JSON.stringify(state.returnTrip.to) || JSON.stringify(stopsReturn) !== JSON.stringify(state.returnTrip.stops)))) {
            let tempFareObj = []
            let stopsCurr = [];
            stopsCurr.push(fromReturn);
            stopsCurr.push(...stopsReturn);
            stopsCurr.push(toReturn);
            console.log("========stopscurr========", stopsCurr);
            for (let index = 0; index < stopsCurr.length; index++) {
                for (let j = index + 1; j < stopsCurr.length; j++) {
                    let element = {
                        "from": { "name": stopsCurr[index].place_name, "place_id": stopsCurr[index].place_id },
                        "to": { "name": stopsCurr[j].place_name, "place_id": stopsCurr[j].place_id },
                        "fare": 0
                    }
                    console.log("========element========", element);
                    tempFareObj.push(element);
                }
            }
            console.log("========tempFareObj========", tempFareObj);
            setAllPossibleFaresReturn(tempFareObj);
            console.log(allPossibleFaresReturn)
        } else {
            if(state && state.returnTrip){
                setAllPossibleFaresReturn(state.returnTrip.fares.fares);
            }
        }
    }, [fromReturn, toReturn, stopsReturn])

    const restrictions = {
        types: ['geocode'],
        componentRestrictions: {country :"ca"} ,
      };

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
        let oldValues = [...stopsReturn];
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

    const handleLuggageChange = (event) => {
        if (luggage.includes(event.target.value)) {
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
    const handleTripSelect = async (event) => {
        event.preventDefault();
        if (event.target.value != '') {
            let trip = trips.find((trip) => trip.id == event.target.value);
            setSelectedTrip(trip);
            setValues(trip, vehicles, drivers, vendors);
        }
    }
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
                            <h4 className="card-title">{state ? "Edit Trip" : "Add New Trip"}</h4>
                            <div className="cmxform">
                                <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleVendorChange}
                                            value={vendor.id}
                                        >
                                            {vendors.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>

                                    </div>
                                </div>
                                {state ? null : <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Copy values from previous trip</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            onChange={handleTripSelect}
                                            value={selectedTrip.id}
                                        >
                                            {trips.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>

                                    </div>
                                </div>}
                                <div className="form-group row">

                                    <div className="col-md-6 my-2">
                                        <label>Origin </label>
                                        <div>                                        
                                        </div>
                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            options={restrictions}
                                            value={from.name}
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
                                            options={restrictions}
                                            value={to.name}
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
                                                    {key ? key.place_name : "Some Stop"}
                                                </span>
                                            </label>
                                        ))}

                                        <label>
                                            <Autocomplete
                                                apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                                className="form-control"
                                                type="text"
                                                options={restrictions}
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
                                            value={vehicle.id}
                                            onChange={handleVehicleChange}>
                                            {vehicles?.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Driver</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={driver.id}
                                            onChange={handleDriverChange}>
                                            {drivers.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Refreshments </label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={refreshments ? 'true' : 'false'}
                                            onChange={handleRefreshmentChange}>
                                            <option value={'true'}>True</option>
                                            <option value={'false'}>False</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Return Trip</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={returnTrip ? 'true' : 'false'}
                                            onChange={handleReturnTrip}>
                                            <option value={'true'}>True</option>
                                            <option value={'false'}>False</option>
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
                                                        value={dayjs(moment(new Date(tripDate)).format("YYYY-MM-DDTHH:mm"))}
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
                                        <label>Origin </label>
                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            options={restrictions}
                                            value={fromReturn.place_name}
                                            onPlaceSelected={(place) => {

                                                let lng = place.geometry.location.lng();
                                                let lat = place.geometry.location.lat();
                                                let place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let destination = { lat, lng, place_id, place_name };
                                                setFromReturn(destination);
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
                                            options={restrictions}
                                            value={toReturn.place_name}
                                            onPlaceSelected={(place) => {

                                                var lng = place.geometry.location.lng();
                                                var lat = place.geometry.location.lat();
                                                var place_id = place.place_id;
                                                let place_name = place.formatted_address;
                                                let origin = { lat, lng, place_id, place_name };
                                                setToReturn(origin);
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
                                                options={restrictions}
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
                                                        <td>{key.from.name}</td>
                                                        <td>{key.to.name}</td>
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
                                                        value={dayjs(moment(new Date(tripDateReturn)).format("YYYY-MM-DDTHH:mm"))}
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
                                        className="btn btn-outline-warning mr-2 w-100"
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
