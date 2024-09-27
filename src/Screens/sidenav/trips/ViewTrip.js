import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { get, post, patch } from "../../../Network/Config/Axios";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from "dayjs";
import moment from "moment";





export default function ViewTrip() {
    const navigate = useNavigate();

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

    // const checkAllRequiredValues =()=>{

    //     if(vendorError==null &&  )
    // }









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
        // let vendorTemp = {};
        // vendors.forEach(element => {
        //     if (element.id == trip.vendor[0].id) {
        //         vendorTemp = element;
        //     }
        // });
        // setVendor(vendorTemp);
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
        if (state) {
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

            if (state) {
                setTripDateReturn(trip.returnTrip.tripDate);
            }
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
                        "fare": 0,
                        hidden: false
                    }
                    tempFareObj.push(element);
                }
            }
            setAllPossibleFares(tempFareObj);
        } else {
            if (state) {
                console.log("this is state ", state)
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
            if (state && state.returnTrip) {
                setAllPossibleFaresReturn(state.returnTrip.fares.fares);
            }
        }
    }, [fromReturn, toReturn, stopsReturn])

    const restrictions = {
        types: ['geocode'],
        componentRestrictions: { country: "ca" },
    };






    return (
        <div className="page-content">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{state ? "View Trip" : "Add New Trip"}</h4>
                            <div className="cmxform">
                                {/* <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Vendor</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={vendor.id}
                                            disabled={true}
                                        >
                                            <option value=''>Select Vendor</option>
                                            {vendors.map((key) => <option value={key.id}>{key.name}</option>)}
                                        </select>
                                      
                                    </div>

                                </div>*/}

                                <div className="form-group row">

                                    <div className="col-md-6 my-2">
                                        <label>Origin </label>
                                        <div>
                                        </div>
                                        <input className="form-control" disabled={true} value={from.name} />
                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label>Destination </label>
                                        <input className="form-control" disabled={true} value={to.name} />


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
                                                >
                                                    {key ? key.place_name : "Some Stop"}
                                                </span>
                                            </label>
                                        ))}

                                        <label>
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
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Luggage Type</label>
                                        <select
                                            multiple
                                            className="js-example-basic-multiple w-100"
                                            value={luggage}
                                            disabled={true}

                                        >
                                            <option className=".text-info" value={'s'}>Small</option>
                                            <option className=".text-info" value={'m'}>Medium</option>
                                            <option value={'l'}>Large</option>

                                        </select>

                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Vehicle</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={vehicle.id}
                                            disabled={true}>
                                            {vehicles?.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>

                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Driver</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={driver.id}
                                            disabled={true}>
                                            {drivers.map((data, idx) => <option key={idx} value={data.id}>{data.name}</option>)}
                                        </select>

                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Refreshments </label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={refreshments ? 'true' : 'false'}
                                            disabled={true}>
                                            <option value={'true'}>True</option>
                                            <option value={'false'}>False</option>
                                        </select>

                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label>Return Trip</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={returnTrip ? 'true' : 'false'}
                                            disabled={true}>
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
                                            disabled={true}
                                            value={bookingMinimumAmount}
                                        />

                                    </div>

                                    <div className="col-md-12 my-12">
                                        <label>Fares</label>

                                        {/* Table for Desktop */}
                                        <div className="d-none d-md-block">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">From</th>
                                                            <th scope="col">To</th>
                                                            <th scope="col">Fare</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allPossibleFares?.map((key, idx) => (
                                                            !key.hidden && (
                                                                <tr key={idx}>
                                                                    <th scope="row">{idx + 1}</th>
                                                                    <td>{key.from.name}</td>
                                                                    <td>{key.to.name}</td>
                                                                    <td>{key.fare}</td>
                                                                </tr>
                                                            )
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Card Layout for Mobile */}
                                        <div className="d-md-none">
                                            <div className="row">
                                                {allPossibleFares?.map((key, idx) => (
                                                    !key.hidden && (
                                                        <div className="col-12 mb-3" key={idx}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{`Fare #${idx + 1}`}</h5>
                                                                    <div className="mb-2">
                                                                        <strong>From:</strong> {key.from.name}
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <strong>To:</strong> {key.to.name}
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <strong>Fare:</strong> {key.fare}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>

                                    </div>


                                    <div className="col-md-6 my-3">
                                        <label>Trip Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DateTimePicker']}>
                                                <DemoItem>
                                                    <DateTimePicker
                                                        value={dayjs(moment(new Date(tripDate)).format("YYYY-MM-DDTHH:mm"))}
                                                        disabled={true}

                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>


                                    </div>

                                </div>




                            </div>

                            {returnTrip && <div className="cmxform">
                                <h1 className="card-title">View Return Trip</h1>

                                <div className="form-group row">

                                    <div className="col-md-6 my-3">
                                        <label>Origin </label>
                                        <input className="form-control" disabled={true} value={fromReturn.place_name} />
                                    </div>

                                    <div className="col-md-6 my-2">

                                        <label>Destination </label>
                                        <input className="form-control" disabled={true} value={toReturn.place_name} />
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
                                                >
                                                    {key.place_name}
                                                </span>
                                            </label>
                                        ))}

                                    </div>
                                </div>

                                <div className="form-group row">

                                    <div className="col-md-12 my-12">
                                        <label>Fares Return</label>

                                        {/* Table for Desktop */}
                                        <div className="d-none d-md-block">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">From</th>
                                                            <th scope="col">To</th>
                                                            <th scope="col">Fare</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allPossibleFaresReturn?.map((key, idx) => (
                                                            !key.hidden && (
                                                                <tr key={idx}>
                                                                    <th scope="row">{idx + 1}</th>
                                                                    <td>{key.from.name}</td>
                                                                    <td>{key.to.name}</td>
                                                                    <td>{key.fare}</td>
                                                                </tr>
                                                            )
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Card Layout for Mobile */}
                                        <div className="d-md-none">
                                            <div className="row">
                                                {allPossibleFaresReturn?.map((key, idx) => (
                                                    !key.hidden && (
                                                        <div className="col-12 mb-3" key={idx}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{`Fare #${idx + 1}`}</h5>
                                                                    <div className="mb-2">
                                                                        <strong>From:</strong> {key.from.name}
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <strong>To:</strong> {key.to.name}
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <strong>Fare:</strong> {key.fare}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-md-6 my-3">
                                        <label>Return Trip Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DateTimePicker']}>
                                                <DemoItem>
                                                    <DateTimePicker
                                                        value={dayjs(moment(new Date(tripDateReturn)).format("YYYY-MM-DDTHH:mm"))}
                                                        disabled={true}

                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>


                                    </div>

                                </div>
                            </div>}
                            <div className="row">
                                <div className="col-md-5"></div>
                                <div className="col-md-6">
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
