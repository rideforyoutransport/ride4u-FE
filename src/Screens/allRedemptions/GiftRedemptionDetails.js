import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { tenant } from "../../utils/tenant";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #00000017",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function GiftRedemptionDetails() {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseLocation = () => setOpenLocation(false);
  const handleOpenLocation = () => setOpenLocation(true);

  const [transactionState, setTransactionState] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState(0);
  const [trackLocation, setTrackLocation] = useState("");
  const [statusUpdates, setStatusUpdates] = useState(
    location.state.location || [],
  );
  const [liveLocationUpdates, setLiveLocationUpdates] = useState([]);

  useEffect(() => {
    var configTxnStatus = {
      method: "get",
      url: "http://127.0.0.1:3003/admin/transactionStatus/get",
      headers: {},
    };

    axios(configTxnStatus)
      .then(function (response) {
        console.log(response.data);
        setTransactionState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    ////////////////////////////////////////////////////////////////
  }, []);

  const handleTransactionStatusChange = (event) => {
    setTransactionStatus(event.target.value);
    console.log({ transactionStatus });
  };
  const getLocationUpdates = () => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/api/giftRedemption/${location.state.id}`,
      headers: {
        slug: tenant,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setLiveLocationUpdates(response.data.location);
        handleOpenLocation();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLocationandStatusUpdate = () => {
    alert("Transaction status");
    let transactionStatusName;
    transactionState.forEach((item) => {
      console.log(item);
      if (item.id == transactionStatus)
        transactionStatusName = item.status_name;
    });

    let currentStatus = {
      date: new Date().toDateString(),
      time: new Date().toTimeString().split(" ")[0],
      location: trackLocation,
      status: transactionStatusName,
    };

    let oldStatus = statusUpdates;
    oldStatus.push(currentStatus);
    setStatusUpdates(oldStatus);
    console.log(oldStatus);

    var data = JSON.stringify({
      status: transactionStatus,
      location: oldStatus,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/api/giftRedemption/${location.state.id}`,
      headers: {
        slug: tenant,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-content">
      <div className="row">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openLocation}
          onClose={handleCloseLocation}
          closeAfterTransition
          BackdropComponent={Backdrop}
          className="pb-10"
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLocation}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
              >
                Status Updates
              </Typography>

              <Typography id="transition-modal-description" sx={{ mt: 2 }} >
              
              <div  style={{overflowY:"scroll" , overflowX:"hidden" , height:"300px"}}>
              {liveLocationUpdates.map((location, idx) => {
              return (
                    <div className="row my-10" key={idx}>
                      <div className="col-md-12 px-2 mb-3 mx-2">
                        <p className="text-md">{location.date}</p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-sm text-center">{location.time}</p>
                      </div>
                      <div className="col-md-8 border-left">
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-sm">{location.status}</p>
                          </div>
                          <div className="col-md-12">
                            <p className="text-sm">{location.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>)
                  
                })}
                </div>  
              </Typography>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          className="pb-10"
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
              >
                Add Status
              </Typography>

              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <label>Status</label>
                <select
                  className="js-example-basic-single w-100 py-1 px-2"
                  value={transactionStatus}
                  onChange={handleTransactionStatusChange}
                >
                  <option value={0}>Pending</option>
                  {transactionState.map((status) => (
                    <option value={status.id}>{status.status_name}</option>
                  ))}
                </select>

                <label className="my-2">Location</label>
                <input
                  type="text"
                  className="border w-100 py-1 px-2"
                  value={trackLocation}
                  onChange={(e) => setTrackLocation(e.target.value)}
                />
                <button
                  className="btn btn-primary my-3"
                  onClick={handleLocationandStatusUpdate}
                >
                  Update
                </button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
        <div className="col-lg-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="card-title">Gift Details</h4>
                    </div>
                    <div className="col-lg-12">
                      <table class="table table-borderless w-100">
                        <thead>
                          <tr>
                            <th scope="col">Items</th>
                            <th scope="col">Points</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {location.state.gifts.gift_details.name
                                ? location.state.gifts.gift_details.name
                                : "A32 Samsung"}
                            </td>
                            <td>{location.state.points_used}</td>
                            <td>{location.state.g_price}</td>
                          </tr>
                          <tr>
                            <td colSpan="2">Total</td>
                            <td>{location.state.g_price}</td>
                          </tr>
                        </tbody>
                      </table>

                      <span>
                        <button
                          className="btn btn-outline-primary mx-2 my-10"
                          onClick={getLocationUpdates}
                          disabled={location.state.location?false:true}
                        >
                          Track Package
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={handleOpen}
                        >
                          Add Update
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <h4 className="card-title">User Details</h4>
                </div>
                <div className="col-lg-12 grid-margin stretch-card">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{location.state.u_name}</td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>{location.state.u_mobile}</td>
                      </tr>
                      <tr>
                        <td>Home Address</td>
                        <td>{location.state.u_address.homeAddress}</td>
                      </tr>
                      <tr>
                        <td>Home Address</td>
                        <td>{location.state.u_address.homeAddress}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{location.state.u_address.state}</td>
                      </tr>
                      <tr>
                        <td>District</td>
                        <td>{location.state.u_address.district}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{location.state.u_address.country}</td>
                      </tr>
                      <tr>
                        <td>Pincode</td>
                        <td>{location.state.u_address.pincode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
