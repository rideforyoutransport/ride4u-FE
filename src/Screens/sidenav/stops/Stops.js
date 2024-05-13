import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Autocomplete from "react-google-autocomplete";
import { get } from "../../../Network/Config/Axios";




const DefaultLocation = { lat: 25, lng: 75 };
const DefaultZoom = 40;

export default function Stops() {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [userTypes, setUsersTypes] = useState([]);

    // maps 
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }


    const [weather, setWeather] = useState(null);



    const [tableDataItems, setTableDataItems] = useState([]);

    // useEffect(() => {
    //   console.log("state", selectedRows);
    // }, [selectedRows]);

    useEffect(() => {

        get(`stops/all`, (e,r)=> {
            if(r){
              setTableDataItems(r.result);
            }
        })


    }, [])

    const handleButtonEditClick = (r) => {

        //handle the edit functionality 
        navigate(`/editIndustry?industry=${r.id}`)

    }

    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }


    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        handleChangeLocation(latitude, longitude);

        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Make API call to OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }

    function error() {
        console.log("Unable to retrieve your location");
    }


    const handleButtonClick = (r) => {
        console.log(r);
        console.log(tableDataItems);
        let tbc = [...tableDataItems];
        let data;
        tbc.forEach((element) => {

            if (element.id == r.id) {
                if (element.c_status == 0) {
                    element.c_status = 1;
                    console.log("status changed to 1 ")
                }
                else {
                    element.c_status = 0;
                    console.log("status changed to 0 ")
                }
                data = JSON.stringify({
                    "c_status": `${element.c_status}`
                });
            }
        });

        setTableDataItems(tbc);
        var config = {
            method: 'put',
            url: `http://127.0.0.1:3003/admin/vendor/${r.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),

            },
            data: data
        };

        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleChange = useCallback((state) => {
        // setSelectedRows(state.selectedRows);
    }, []);




    const columns = [

        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,

        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,

        },

        {
            name: "Created On",
            selector: (row) => row.created,
            sortable: true,
        },
        {
            name: "Action",
            cell: (r) => <button className="btn btn-outline-success btn-sm" onClick={() => handleButtonEditClick(r)}>Edit</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    return (
            <div className="mt-20">

                <div className="row">
                    <div className="col-12 col-xl-12">

                        <DataTable
                            actions={<button
                                type="button"
                                className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                                onClick={() => navigate("/addIndustry")}
                            >
                                Add Stops
                            </button>}
                            title="Stops"
                            data={tableDataItems}
                            columns={columns}
                            selectableRows
                            onSelectedRowsChange={handleChange}
                        />




                        <button onClick={handleResetLocation}>Reset Location</button>
                        <label>Latitute:</label><input type='text' value={location.lat} disabled />
                        <label>Longitute:</label><input type='text' value={location.lng} disabled />
                        <label>Zoom:</label><input type='text' value={zoom} disabled />
                        <button onClick={handleLocationClick}>Get Location Location</button>





                        <Autocomplete
                            apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'
                            onPlaceSelected={(place) => {
                                console.log(place);
                                console.log("this is latitude", place.geometry.location.lat())
                            }}
                        />

                        {/*        <APIProvider apiKey='AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'>
          <Map
              style={{width: '100vw', height: '100vh'}}
              defaultCenter={{lat: 22.54992, lng: 0}}
              defaultZoom={3}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            />
            </APIProvider> */}

                        <APIProvider apiKey={'AIzaSyCe2Qm2I2LbbZKGDagFKq1yYyF5_JyUcUI'}>
                            <Map center={location} zoom={10} style={{ width: '100vw', height: '100vh' }}
                            >
                                <Marker position={location} />
                            </Map>
                        </APIProvider>

                    </div>
                </div>
            </div>
    );
}
