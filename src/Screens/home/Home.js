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



export default function Home() {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Navbar />
        <TopBar/>
        <Routes>
          <Route path="" element={<Trips />} />
          <Route path="addTrip" element={<AddTrip />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="stops" element={<Stops />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="users" element={<Users />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Routes>
        <Footer />
      </div>

    </div>
  )
}
