import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../Components/ProductCategory";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import RevenueTab from "../Components/RevenueTab";
import Sidebar from "../Components/Sidebar";
import Table from "../Components/Table";
import TopBar from "../Components/TopBar";
import ProductCategory from "../Components/ProductCategory";
import BatchCreation from "../Components/BatchCreation";
import GenerateQrCode from "../Components/GenerateQrCode";
import FormElemets from "../Components/FormElemets";

export default function DashboardOne() {
  return (
    <div>
      <div className="main-wrapper">
         <Navbar />
         <Sidebar />
        <div className="page-wrapper">
            <ProductCategory/>
            <FormElemets/>
            <Table/>
            <BatchCreation/>
            <GenerateQrCode/>
         
          <Footer />

        </div>
      </div>
    </div>
  );
}
