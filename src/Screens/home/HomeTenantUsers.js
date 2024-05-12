import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import GenerateQrCode from "../qr/GenerateQrCode";
import Footer from "../../Components/Footer";
import ProductCategory from "../productCategory/ProductCategory";
import ProductSubCategory from "../productSubCategory/ProductSubCategory";
import AddNewProduct from "../product/AddNewProduct";
import BatchCreation from "../batch/BatchCreation";
import AllProducts from "../product/AllProducts";
import PrintQrCode from "../qr/PrintQrCode";
import AddProductCategory from "../productCategory/AddProductCategory";
import AddProductSubCategory from "../productSubCategory/AddProductSubCategory";
import UpdateProduct from "../product/UpdateProduct";
import CompanyRegistration from "../partnerRegistration/CompanyRegistration";
import Sidebar2 from "../../Components/Sidebar2";
import CompanyUpdation from "../partnerRegistration/CompanyUpdation";
import ChangePassword from "../changePassword/ChangePassword";
import AddPoints from "../productPoints/AddPoints";
import ProductPoints from "../productPoints/ProductPoints";
import EditPoints from "../productPoints/EditPoints";
import ViewQrCode from "../qr/ViewQrCode";
import VerifyQrCode from "../qr/VerifyQrCode";
import UserRoles from "../userRolesVendor/UserRoles";
import EditUserRole from "../userRolesVendor/EditUserRole";
import AddUserRole from "../userRolesVendor/AddUserRole";
import VendorUsers from "../vendorUsers/VendorUsers";
import VendorUserRegistration from "../vendorUsers/VendorUserRegistration";
import VendorUserUpdation from "../vendorUsers/VendorUserUpdation";
import { useDispatch } from "react-redux";
import { assignRewardifyState } from "../../slice/userStateSlice";
import AllGifts from "../gifts/AllGifts";
import GiftAddition from "../gifts/GiftAddition";
import GiftUpdation from "../gifts/GiftUpdation";
import AllGiftsRedemptions from "../allRedemptions/AllGiftsRedemptions";
import GiftRedemptionDetails from "../allRedemptions/GiftRedemptionDetails";
import Dashboard from "../dashboard/Dashboard";
import AllGiftsSchemes from "../giftSchemes/AllGiftsSchemes";
import GiftSchemeAddition from "../giftSchemes/GiftSchemeAddition";
import GiftSchemeUpdation from "../giftSchemes/GiftSchemeUpdation";
import TenantCompanyProfile from "../tenantProfile/TenantCompanyProfile";
import TenantCompantMasterSetup from "../tenantProfile/TenantCompantMasterSetup";

export default function HomeTenantUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const vendorid = sessionStorage.getItem("vendorId");
    var config = {
      method: "get",
      url: `http://127.0.0.1:3003/admin/rewardifyUsage/${vendorid}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(assignRewardifyState(response.data.options));
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Sidebar2 />
        <Routes>
          <Route path="" element={<Dashboard />} />
          {/*    
          <Route path="changeAdminPassword" element={<ChangeAdminPassword/>}/>
           */}
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="prodCategory" element={<ProductCategory />} />
          <Route path="prodSubCategory" element={<ProductSubCategory />} />
          <Route path="addProd" element={<AddNewProduct />} />
          <Route path="editProd" element={<UpdateProduct />} />
          <Route path="batchCreation" element={<BatchCreation />} />
          <Route path="allProducts" element={<AllProducts />} />
          <Route exact path="generateQr" element={<GenerateQrCode />} />
          <Route path="printQr" element={<PrintQrCode />} />
          <Route path="viewQr" element={<ViewQrCode />} />
          <Route path="productPoints" element={<ProductPoints />} />
          <Route path="addPoints" element={<AddPoints />} />
          <Route path="editPoints" element={<EditPoints />} />
          <Route path="addCompanyDetails" element={<CompanyRegistration />} />
          <Route path="editVendor" element={<CompanyUpdation />} />
          <Route path="verifyQrCode" element={<VerifyQrCode />} />
          <Route path="changeAdminPassword" element={<ChangePassword />} />
          <Route path="vendorUsers" element={<VendorUsers />} />
          <Route path="addVendorUser" element={<VendorUserRegistration />} />
          <Route path="editVendorUser" element={<VendorUserUpdation />} />
          <Route path="userRoles" element={<UserRoles />} />
          <Route path="addRoles" element={<AddUserRole />} />
          <Route path="editRoles" element={<EditUserRole />} />
          <Route path="productCategory" element={<ProductCategory />} />
          <Route path="allGifts" element={<AllGifts />} />
          <Route path="giftAdd" element={<GiftAddition />} />
          <Route path="giftEdit" element={<GiftUpdation />} />
          <Route path="giftDetails" element={<GiftRedemptionDetails />} />
          <Route path="productSubCategory" element={<ProductSubCategory />} />
          <Route path="addProductCategory" element={<AddProductCategory />} />
          <Route path="allGiftRedemptions" element={<AllGiftsRedemptions/>} />
          <Route path="allGiftSchemes" element={<AllGiftsSchemes/>} />
          <Route path="giftSchemeAddition" element={<GiftSchemeAddition/>} />
          <Route path="giftSchemeUpdation" element={<GiftSchemeUpdation/>} />
          <Route path="tenantProfile" element={<TenantCompanyProfile/>} />       
          <Route path="tenantMaster" element={<TenantCompantMasterSetup/>} />




         


          <Route
            path="addProductSubCategory"
            element={<AddProductSubCategory />}
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}
