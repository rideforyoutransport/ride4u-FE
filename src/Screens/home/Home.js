import React from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Trips from '../sidenav/trips/Trips';
import AddTrip from '../sidenav/trips/AddTrip';
import Bookings from '../sidenav/bookings/Bookings';
import Drivers from '../sidenav/drivers/Drivers';
import Vehicles from '../sidenav/vehicles/Vehicles';
import Vendors from '../sidenav/vendors/Vendors';
import Users from '../sidenav/users/Users';
import TopBar from '../../Components/TopBar';
import ChangePassword from '../sidenav/changePassword/ChangePassword';
import Stops from '../sidenav/stops/Stops';
import AddVehicle from '../sidenav/vehicles/AddVehicle';
import AddVendor from '../sidenav/vendors/AddVendor';
import AddDriver from '../sidenav/drivers/AddDriver';
import AddUser from '../sidenav/users/AddUser';




export default function Home() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Navbar />
        <TopBar/>
        <Routes>
          <Route path="" element={<Trips />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="stops" element={<Stops />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="users" element={<Users />} />
          <Route path="changePassword" element={<ChangePassword />} />

          <Route path="addTrip" element={<AddTrip />} />
          <Route path="addVehicle" element={<AddVehicle />} />
          <Route path="addVendor" element={<AddVendor />} />
          <Route path="addDriver" element={<AddDriver />} />
          <Route path="addUser" element={<AddUser />} />
        </Routes>
        <Footer />
      </div>

    </div>
  )
}
