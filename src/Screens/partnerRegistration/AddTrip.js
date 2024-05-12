import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { TenMp } from "@mui/icons-material";
import { options } from "../dashboard/Dashboard";
import DateTimePicker from 'react-datetime-picker';




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

    const productsAvailingObj = {
        Genuinity: false,
        DWAN: false,
        ScanAndWin: false,
        Rewardify: false,
        SupplyBeam: false,
        HybridOcean: false,
    };
    const userTypesObj = {
        Customer: false,
        Distributor: false,
        Retailers: false,
        "Channel Partner": false,
        CEO: false,
        WareHouse: false,
        Vendor: false,
    };
    const partnerBusinessDetailsObj = {
        Gstin: "",
        Pan: "",
        url: ""
    };




    const [comapnyName, setComapnyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPassword, setCompanyPassword] = useState("");
    const [companyRePassword, setCompanyRePassword] = useState("");
    const [companyMobile, setCompanyMobile] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [contactPersonNumber, setContactPersonNumber] = useState("");
    const [companyAddress, setcompanyAddress] = useState(companyAddressObj);
    const [companySocialMedia, setCompanySocialMedia] = useState(
        companySocialMediaObj,
    );
    const [tripDetails, setTripDetails] = useState(addTripObj);
    const [stops, setStops] = useState(['nsme']);


    const [partnerBusinessDetails, setPartnerBusinessDetails] = useState(
        partnerBusinessDetailsObj,
    );

    const [picture, setPicture] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [companyIndustry, setCompanyIndustry] = useState(0);
    const [companyGstin, setCompanyGstin] = useState("");
    const [panelStatus, setPanelStatus] = useState(0);
    const [companyStatus, setCompanyStatus] = useState(0);
    const [companyUrl, setCompanyUrl] = useState("");
    const [qrType, setQrType] = useState(0);
    const [demoValue, setDemoValue] = useState(0);
    const [productsAvailing, setproductsAvailing] = useState(productsAvailingObj);
   
    const [companyUserReqirements, setCompanyUserReqirements] = useState(0);
    const [vendorId, setVendorId] = useState(0);


    //trips 
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState({});
    const [driver, setDriver] = useState({'name':'','id':''});
    const [vehicle, setVehicle] = useState({'name':'','id':''});
    const [luggage, setLuggage] = useState('s');
    const [refreshments, setRefreshments] = useState(false);
    const [bookingMinimumAmount, setBookingMinimumAmount] = useState(0);
    const [totalTripAmount, settotalTripAmount] = useState(0);
    const [tripDiscription, setTripDiscription] = useState('');
    const [cancelationCharges, setCancelationCharges] = useState(0);
    const [requestedTrip, setRequestedTrip] = useState(false);
    const [requestedUser, setRequestedUser] = useState({'name':'','id':''});



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


    useEffect(() => {
 
        let configVehicle = {
            method: "get",
            url: "http://127.0.0.1:3003/api/admin/vehicle/all",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            },
        };
        let configDriver = {
            method: "post",
            url: "http://127.0.0.1:3003/api/admin/driver/all",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            },
            data:{
                "from": 0,
                "to":5
            }
        };
        let configVendor = {
            method: "post",
            url: "http://127.0.0.1:3003/api/admin/vendor/all",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            },
            data:{
                "from": 0,
                "to":10
            }
        };
        axios(configVehicle)
            .then(function (response) {
                setVehicles(response.data.result);
                console.log("these are vehicles ",vehicles)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => { });

            axios(configDriver)
            .then(function (response) {
                let drivers =response.data.result.items;
                setDrivers(drivers);
                console.log("these are driver ",drivers)

            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => { });


            axios(configVendor)
            .then(function (response) {
                setVendors(response.data.result.items);
                console.log("these are vendors ",vendors)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => { });

    }, [])


    const removeFromStops = (e, key) => {
        console.log(key);
        let oldValues = [...stops];
        oldValues = oldValues.filter((stop) => stop != key);
        setStops(oldValues);
    };

    const handleUsersRequirementChange = (e) => {
        setCompanyUserReqirements(e.target.value);
        console.log(companyUserReqirements);
    };

  

    const handleLocationSelected = (place) => {
        var lng = place.geometry.location.lng();
        var lat = place.geometry.location.lat();
        var place_id = place.place_id;
        var latlng = { lat, lng, place_id };
        handleAddTripChange(latlng, 'from');
        console.log(place.formatted_address);

        let oldStops = [...stops];
        oldStops.push(place.formatted_address.toString());
        console.log(oldStops);
        setStops(oldStops);
        //   setNewUserValue("");

    }
   

    const handleComapnyAddressChange = (e, target) => {
        let copiedValue = { ...companyAddress };
        copiedValue[target] = e.target.value;
        setcompanyAddress(copiedValue);
    };
    const handleAddTripChange = (e, target) => {
        let copiedValue = { ...tripDetails };
        if (target == 'from' || target == 'to') {
            copiedValue[target] = e;
        } else {
            copiedValue[target] = e.target.value;
        }
        setTripDetails(copiedValue);
    };

    const handlePhoneChange = (event) => {
        if (
            !validator.isMobilePhone(event.target.value, ["en-IN"]) &&
            event.target.value > 0
        ) {
            setCompanyMobileError("Phone no Invalid");
        } else {
            setCompanyMobileError(null);
        }

        setCompanyMobile(event.target.value);
    };

    const handleCompanySocialChange = (e, target) => {
        let copiedValue = { ...companySocialMedia };
        copiedValue[target] = e.target.value;
        setCompanySocialMedia(copiedValue);
    };

    const handleEmailChange = (event) => {
        console.log(event.target.value);
        console.log(validator.isEmail(event.target.value));
        if (
            !validator.isEmail(event.target.value) &&
            event.target.value.length > 0
        ) {
            setCompanyEmailError("Email is invalid");
        } else {
            setCompanyEmailError(null);
        }
        setCompanyEmail(event.target.value);
    };

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

    const handledemoStatus = (e) => {
        setDemoValue(e.target.value);
        console.log(demoValue);
    };
    const handleCompanyIndustryChange = (e) => {
        setCompanyIndustry(e.target.value);
    };

    const addNewVendor = (e) => {
        e.preventDefault();
        if (
            companyEmailError == null &&
            companyMobileError == null &&
            passwordError == null &&
            passwordReError == null &&
            companyEmail.length > 0 &&
            comapnyName.length > 0 &&
            companyGstin.length > 0
        ) {
            if (document.getElementById("file").files[0]) {
                const formData = new FormData();
                formData.append("pPassword", companyPassword);
                formData.append("file", document.getElementById("file").files[0]);
                formData.append("pName", comapnyName);
                formData.append("pSocials", JSON.stringify(companySocialMedia));
                formData.append("pEmail", companyEmail);
                formData.append("pPhone", companyMobile);
                formData.append("pWebsite", companyUrl);
                formData.append("pAddress", JSON.stringify(companyAddress));
                formData.append("pGstin", companyGstin);
                formData.append("deleted", panelStatus);
                formData.append("deleted", companyStatus);
                formData.append("pQrType", qrType);
                formData.append("pContactPerson", contactPerson);
                formData.append("pPanelStatus", true);
                //   formData.append("industry", companyIndustry);
                formData.append("pContactPersonNumber", contactPersonNumber);
                // formData.aclppend("productsAwailing", JSON.stringify(productsAvailing));
                //  formData.append("userTypes", JSON.stringify(userTypes));
                formData.append("pUserRequirement", companyUserReqirements);
                if (demoValue) {
                    formData.append("pDemoValue", demoValue);
                }
                console.log(formData);
                var config = {
                    method: "post",
                    url: "http://127.0.0.1:3003/admin/vendor/add",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),

                    },
                    data: formData,
                };
                axios(config)
                    .then(function (response) {
                        console.log(response.data.data);
                        const { id } = response.data.data;

                        setVendorId(id);

                        resetValues();
                        alert(`redirecting to set Rewardify Options ${id}`);
                        setTimeout(() => {
                            navigate(`/basicSetup?vendor=${id}`);
                        }, 2000);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(() => { });
            } else {
                setLogoErr("Upload Image First");
            }
        } else {
            setMasterError(
                "Please Fill All the Required fields and check the errors",
            );
        }
    };

    const resetValues = () => {
        setComapnyName("");
        setCompanyEmail("");
        setCompanyPassword("");
        setCompanyRePassword("");
        setCompanyGstin("");
        setcompanyAddress(companyAddressObj);
        setCompanySocialMedia(companySocialMediaObj);
        setContactPerson("");
        setContactPersonNumber("");
        setCompanyIndustry(0);
        setCompanyMobile("");
        setCompanyUrl("");
        setPanelStatus(0);
        setDemoValue(0);
        setPicture(null);
        setThumbnail(null);
        setproductsAvailing(productsAvailingObj);
        setCompanyStatus(0);
        setCompanyUserReqirements(0);
    };

    const handleChange = (event) => {
        // setProductCategoryId(event.target.value);
    };

    const handleCompanyStatus = (event) => {
        setCompanyStatus(event.target.value);
    };
    const handleCompanyPanelStatus = (event) => {
        // console.log(panelStatus);
        console.log(event.target.value);
        setPanelStatus(event.target.value);
    };

    const handleLuggageChange = (event) => {
        setLuggage(event.target.value);
        console.log({ luggage });
    };

    const handleVendorChange = (event) => {
        setVendor(parseInt(event.target.value));
        console.log({ qrType });
    };
    const handleVehicleChange = async (event) => {
        event.preventDefault();
        if(event.target.value!=''){
            let tempVehicle = {};
            tempVehicle.name=(vehicles.find((o => o.id === event.target.value))).name;
            tempVehicle.id=event.target.value;
            setVehicle(tempVehicle);
        } 
    };
    const handleDriverChange = async (event) => {
        event.preventDefault();
        if(event.target.value!=''){
            let tempDriver = {};
            tempDriver.name=(drivers.find((o => o.id === event.target.value))).name;
            tempDriver.id=event.target.value;
            setDriver(tempDriver);
        } 
    };
    const handleRefreshmentChange = async (event) => {
        event.preventDefault();     
        setRefreshments(event.target.value);
    };
    

    return (
        <div className="page-content">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add New Vendor</h4>
                            <div className="cmxform">
                                <div className="form-group row">
                                
                                    <div className="col-md-6 my-3">
                                    <label>Vendor</label>
                                    <select
                                        className="js-example-basic-single w-100"
                                        value={tripDetails.vendor}
                                        onChange={(e) => handleAddTripChange(e.target.value, "vendor")}
                                    >{vendors.map((key)=><option value={key.id}>{key.name}</option>)}
                                    </select>
                                 
                                </div>

                                    <div className="col-md-6 my-3">
                                        <label>From </label>
                                        {/* <input
                                    id="m_no"
                                    className="form-control"
                                    name="m_no"
                                    type="text"
                                    value={tripDetails.from}
                                    onChange={(e) => handleAddTripChange(e, "from")}
    />*/}
                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"

                                            onPlaceSelected={(place) => {

                                                var lng = place.geometry.location.lng();
                                                var lat = place.geometry.location.lat();
                                                var place_id = place.place_id;
                                                var latlng = { lat, lng, place_id };
                                                console.log("location is this ", latlng);
                                                handleAddTripChange(latlng, 'from')

                                            }}
                                        />



                                    </div>
                         
                                    <div className="col-md-6 my-2">

                                        <label>To </label>

                                        <Autocomplete
                                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                                            className="form-control"
                                            type="text"
                                            onChange={(e) => console.log(e)}
                                            onPlaceSelected={(place) => {

                                                var lng = place.geometry.location.lng();
                                                var lat = place.geometry.location.lat();
                                                var place_id = place.place_id;
                                                var latlng = { lat, lng, place_id };
                                                handleAddTripChange(latlng, 'from')

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
                                        {stops.map((key) => (
                                            <label key={key}>
                                                <span
                                                    className="px-2 mx-2 btn btn-outline-danger"
                                                    onClick={(e) => removeFromStops(e, key)}
                                                >
                                                    {key}
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
                                                    console.log(place);
                                                }}
                                            />
                                        
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 my-2">
                                        <label>Luggage Type</label>
                                        <select
                                            className="js-example-basic-single w-100"
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
                                        {vehicles.map((data, idx)=><option key={idx} value={data.id}>{data.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-6 my-2">
                                <label>Driver</label>
                                <select
                                    className="js-example-basic-single w-100"
                                    onChange={handleDriverChange}>
                                    <option value={''}>Select Driver</option>
                                    {drivers.map((data, idx)=><option key={idx} value={data.id}>{data.name}</option>)}
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
                            <div className="col-md-6 my-3">
                            <label>Booking Amount</label>
                            <input
                                id="m_no"
                                className="form-control"
                                name="m_no"
                                type="number"
                                value={contactPersonNumber}
                                onChange={(e) => setContactPersonNumber(e.target.value)}
                            />
                        </div>

                        <DateTimePicker />
                                 
                                    <div className="col-md-6 my-3">
                                        <label>Contact Person Number</label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="m_no"
                                            type="text"
                                            value={contactPersonNumber}
                                            onChange={(e) => setContactPersonNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3"></div>
                                    <div className="col-md-6 mt-3">
                                        <label>Head Office Address </label>
                                        <textarea
                                            id="maxlength-textarea"
                                            className="form-control"
                                            maxLength="100"
                                            rows="4"
                                            value={companyAddress.homeAddress}
                                            placeholder="This textarea has a limit of 100 chars."
                                            onChange={(e) =>
                                                handleComapnyAddressChange(e, "homeAddress")
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <label>Landmark </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="landmark"
                                            type="text"
                                            value={companyAddress.landMark}
                                            onChange={(e) =>
                                                handleComapnyAddressChange(e, "landMark")
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 my-2 ">
                                        <label>State </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="landmark"
                                            type="text"
                                            value={companyAddress.state}
                                            onChange={(e) => handleComapnyAddressChange(e, "state")}
                                        />
                                    </div>
                                    <div className="col-md-6 my-2 ">
                                        <label>City </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="city"
                                            type="text"
                                            value={companyAddress.city}
                                            onChange={(e) => handleComapnyAddressChange(e, "city")}
                                        />
                                    </div>
                                    <div className="col-md-6 my-2 ">
                                        <label>Country </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="landmark"
                                            type="text"
                                            value={companyAddress.country}
                                            onChange={(e) => handleComapnyAddressChange(e, "country")}
                                        />
                                    </div>
                                    <div className="col-md-6 my-2 ">
                                        <label>District </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="landmark"
                                            type="text"
                                            value={companyAddress.district}
                                            onChange={(e) =>
                                                handleComapnyAddressChange(e, "district")
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6 my-2 ">
                                        <label>Pincode </label>
                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="pincode"
                                            type="text"
                                            value={companyAddress.pincode}
                                            onChange={(e) => handleComapnyAddressChange(e, "pincode")}
                                        />
                                    </div>
                                </div>
                                <label className="text-xl text-uppercase">Social Media </label>

                                <div className="form-group row">
                                    <div className="col-md-11 my-2">
                                        <label>Facebook </label>

                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="fb"
                                            type="text"
                                            value={companySocialMedia.facebook}
                                            onChange={(e) => handleCompanySocialChange(e, "facebook")}
                                        />
                                    </div>
                                    <div className="col-md-11 my-2">
                                        <label>Instagram </label>

                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="ig"
                                            type="text"
                                            value={companySocialMedia.instagram}
                                            onChange={(e) =>
                                                handleCompanySocialChange(e, "instagram")
                                            }
                                        />
                                    </div>
                                    <div className="col-md-11 my-2">
                                        <label>Twitter </label>

                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="tw"
                                            type="text"
                                            value={companySocialMedia.twitter}
                                            onChange={(e) => handleCompanySocialChange(e, "twitter")}
                                        />
                                    </div>
                                    <div className="col-md-11 my-2">
                                        <label>Youtube </label>

                                        <input
                                            id="m_no"
                                            className="form-control"
                                            name="yt"
                                            type="text"
                                            value={companySocialMedia.youtube}
                                            onChange={(e) => handleCompanySocialChange(e, "youtube")}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row my-2">
                                    <div className="col-md-6 my-1">
                                        <label>Company URL</label>
                                        <input
                                            id="name"
                                            className="form-control"
                                            name="p_box"
                                            value={companyUrl}
                                            onChange={(e) => {
                                                setCompanyUrl(e.target.value);
                                            }}
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-md-6 my-1">
                                        <label>Company GSTIN</label>
                                        <input
                                            id="gstin"
                                            className="form-control"
                                            name="p_box"
                                            value={companyGstin}
                                            maxLength={16}
                                            onChange={(e) => {
                                                setCompanyGstin(e.target.value);
                                            }}
                                            type="text"
                                        />
                                    </div>


                                    <div className="col-md-6 my-2">
                                        <label>Status</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={companyStatus}
                                            onChange={handleCompanyStatus}
                                        >
                                            <option value={0}>Active</option>
                                            <option value={1}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 my-1">
                                        <label className="my-1">Pannel Status</label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={panelStatus}
                                            onChange={handleCompanyPanelStatus}
                                        >
                                            <option value={0}>Demo</option>
                                            <option value={1}>Testing / Staging</option>
                                            <option value={2}>Pre-Production</option>
                                            <option value={3}>Production (Live)</option>
                                        </select>
                                    </div>
                                    {panelStatus == 0 ? (
                                        <div className="col-md-6 my-1">
                                            <label className="my-1">Demo Period</label>
                                            <select
                                                className="js-example-basic-single w-100"
                                                value={demoValue}
                                                onChange={handledemoStatus}
                                            >
                                                <option value={0}>7 Days</option>
                                                <option value={1}>15 Days</option>
                                                <option value={2}>21 Days</option>
                                                <option value={3}>28 Days </option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className="form-group row">
                                    {/*
                  <div className="col-md-6 my-1">
                    <label className="my-1">Industry </label>
                    <select
                      className="js-example-basic-single w-100"
                      value={companyIndustry}
                      onChange={handleCompanyIndustryChange}
                    >
                      <option value={0}>Select Industry</option>
                      <option value={1}>Wires & Cables</option>
                      <option value={2}>Tyres</option>
                      <option value={3}>
                        Electrical & Electronics Equipment
                      </option>
                      <option value={4}>Helmets</option>
                      <option value={5}>Home Appliance</option>
                      <option value={6}>Certificates</option>
                      <option value={7}>Cosmetics</option>
                      <option value={8}>FMCG</option>
                      <option value={9}>Chemicals</option>
                      <option value={10}>Fertilizers</option>
                      <option value={11}>Auto Parts</option>
                      <option value={12}>Clothing</option>
                      <option value={13}>Kitchen & Cloud</option>
                      <option value={14}>Computer Parts</option>
                      <option value={15}>Pharmaceuticals</option>
                      <option value={16}>Housing Furniture</option>
                    </select>
                  </div>
                  <div className="col-md-6"></div>
                  */}

                                    <div className="col-md-6 my-2">
                                        <label className="my-2">User Login Requirements </label>
                                        <select
                                            className="js-example-basic-single w-100"
                                            value={companyUserReqirements}
                                            onChange={handleUsersRequirementChange}
                                        >
                                            <option value={0}>Un-Limited</option>
                                            <option value={1}>1-2 Users</option>
                                            <option value={2}>2-5 Users</option>
                                            <option value={3}>5-10 Users</option>
                                            <option value={4}>10-50 Users</option>
                                            <option value={5}>50-100 Users</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 my-3">
                                        <img
                                            className="userUpdateImg"
                                            src={picture ? picture : ""}
                                            alt=""
                                        />
                                        <label htmlFor="file">Upload Logo</label>
                                        <div>
                                            <input
                                                data-testid="fileInput"
                                                type="file"
                                                id="file"
                                                accept="image/jpeg ,image/png  , image/jpg"
                                                onChange={(e) => {
                                                    setPicture(URL.createObjectURL(e.target.files[0]));
                                                    setThumbnail(e.target.files);
                                                }}
                                            />
                                        </div>
                                        {logoErr && (
                                            <p className="text-danger mx-2 my-2">{logoErr}</p>
                                        )}
                                    </div>
                                </div>
                                {/* 
                <div className="row">
                  <div className="col-md-12 my-3">
                    <div>
                      <label className="text-capitalize font-weight-bold">
                        {" "}
                        Select Programs
                      </label>
                    </div>

                    <label>
                      <input
                        type="checkbox"
                        value={"SupplyBeam"}
                        checked={
                          productsAvailing["SupplyBeam"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "SupplyBeam")
                        }
                      />{" "}
                      <span className="px-2 mx-2">SupplyBeam</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"ScanAndWin"}
                        checked={
                          productsAvailing["ScanAndWin"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "ScanAndWin")
                        }
                      />{" "}
                      <span className="px-2 mx-2">Scan and Win</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={productsAvailing["Rewardify"] ? "checked" : ""}
                        value={"Rewardify"}
                        onChange={(e) => handleProgramSelection(e, "Rewardify")}
                      />{" "}
                      <span className="px-2 mx-2">Rewardify</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"Genuinity"}
                        checked={productsAvailing["Genuinity"] ? "checked" : ""}
                        onChange={(e) => handleProgramSelection(e, "Genuinity")}
                      />{" "}
                      <span className="px-2 mx-2">GenuineMark</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"DWAN"}
                        checked={productsAvailing["DWAN"] ? "checked" : ""}
                        onChange={(e) => handleProgramSelection(e, "DWAN")}
                      />{" "}
                      <span className="px-2 mx-2">DWAN</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={"HybridOcean"}
                        checked={
                          productsAvailing["HybridOcean"] ? "checked" : ""
                        }
                        onChange={(e) =>
                          handleProgramSelection(e, "HybridOcean")
                        }
                      />{" "}
                      <span className="px-2 mx-2">HybridOcean</span>
                    </label>
                  </div>
                </div>

               User types  

                <div className="row">
                  <div className="col-md-12 my-3">
                    <div>
                      <label className="text-capitalize font-weight-bold">
                        {" "}
                        Select Users
                      </label>
                    </div>
                    {Object.keys(userTypes).map((key) => (
                      <label>
                        <input
                          type="checkbox"
                          value={key}
                          checked={userTypes[key] ? "checked" : ""}
                          onChange={(e) => handleUserTypeSelection(e, key)}
                        />{" "}
                        <span className="px-2 mx-2">{key}</span>
                      </label>
                    ))}

                    <label>
                      <input
                        type="text"
                        className="border p-1"
                        placeholder="Add new UserType"
                        value={newUserValue}
                        onChange={(e) => setNewUserValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            console.log(newUserValue);
                            let oldUserTypes = { ...userTypes };
                            oldUserTypes[newUserValue] = false;
                            setUsersTypes(oldUserTypes);
                            console.log(userTypes);
                            setNewUserValue("");
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                 */}






                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6 mt-3">
                                        <button
                                            className="btn btn-outline-primary mr-2 w-100"
                                            onClick={(e) => addNewVendor(e)}
                                        >
                                            Register
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
