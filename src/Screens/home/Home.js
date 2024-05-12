import React from 'react'
import { Routes, Route }  from "react-router-dom";

import GenerateQrCode from '../qr/GenerateQrCode';
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
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
import MHome from '../masterHome/MHome';
import CompanyRegistration from '../partnerRegistration/CompanyRegistration';
import AddTrip from '../partnerRegistration/AddTrip';

import Sidebar2 from '../../Components/Sidebar2';
import CompanyUpdation from '../partnerRegistration/CompanyUpdation';
import ChangePassword from '../changePassword/ChangePassword';
import Rewardify from '../programOptions/rewardify/Rewardify';
import ScanAndWin from '../programOptions/scanandwin/ScanAndWin';
import GenuineMark from '../programOptions/genuinemark/GenuineMark';
import HybridOcean from '../programOptions/hybridocean/HybridOcean';
import SupplyBeam from '../programOptions/supplybeam/SupplyBeam';
import Dwan from '../programOptions/dwan/Dwan';
import AddNewOption from '../programOptions/rewardify/AddNewOption';
import BasicSetup from '../programOptions/basicSetup/BasicSetup';
import IndustryMaster from '../industryMaster/IndustryMaster';
import AddIndustry from '../industryMaster/AddIndustry';
import EditIndustry from '../industryMaster/EditIndustry';
import AddNewGmOption from '../programOptions/genuinemark/addNewGmOption';
import AddNewDwanOption from '../programOptions/dwan/addNewDwanOption';
import DynamicForm from '../dynamicForm/DynamicForm';
import AllDynamicForms from '../dynamicForm/AllDynamicForms';
import EditDynamicForm from '../dynamicForm/EditDynamicForm';
import AddNewScanAndWinOption from '../programOptions/scanandwin/addNewScanAndWinOption';



export default function Home() {
  return (
    <div className="main-wrapper">
    <div className="page-wrapper">
    <Navbar />
    <Sidebar />
      <Routes>
        <Route path="" element={<MHome/> }/>
{   /*    <Route path="changeAdminPassword" element={<ChangeAdminPassword/>}/>
*/
}        
        <Route  path="prodCategory" element={<ProductCategory />} />
        <Route
          exact
          path="prodSubCategory"
          element={<ProductSubCategory />}
        />
        <Route  path="addProd" element={<AddNewProduct />} />
        <Route  path="editProd" element={<UpdateProduct />} />
        <Route  path="batchCreation" element={<BatchCreation />} />
        <Route  path="allProducts" element={<AllProducts />} />
        <Route  path="generateQr" element={<GenerateQrCode />} />
        <Route  path="printQr" element={<PrintQrCode />} />
        <Route  path="addCompanyDetails" element={<AddTrip />} />
        <Route  path="editVendor" element={<CompanyUpdation />} />
        <Route  path="changeAdminPassword" element={<ChangePassword />} />
        <Route  path="industryMaster" element={<IndustryMaster/>} />
        <Route  path="addIndustry" element={<AddIndustry/>} />
        <Route  path="editIndustry" element={<EditIndustry/>} />
        <Route  path="basicSetup" element={<BasicSetup/>} />
        <Route  path="rewardify" element={<Rewardify/>} />
        <Route  path="addNewRewardifyOption" element={<AddNewOption/>} />
        <Route  path="addNewGenuineMarkOption" element={<AddNewGmOption/>} />
        <Route  path="addNewDwanOption" element={<AddNewDwanOption/>} />
        <Route  path="addNewScanAndWinOption" element={<AddNewScanAndWinOption/>} />
        <Route  path="scanandwin" element={<ScanAndWin />} />
        <Route  path="supplybeam" element={<SupplyBeam />} />
        <Route  path="dwan" element={<Dwan />} />
        <Route  path="hybridocean" element={<HybridOcean />} />
        <Route  path="genuinemark" element={<GenuineMark />} />
        <Route  path="dynamicForms" element={<DynamicForm />} />
        <Route  path="allDynamicForms" element={<AllDynamicForms />} />
        <Route  path="editDynamicForm" element={<EditDynamicForm />} />
        <Route
          exact
          path="productCategory"
          element={<ProductCategory />}
        />
        <Route
          exact
          path="productSubCategory"
          element={<ProductSubCategory />}
        />
        <Route
          exact
          path="addProductCategory"
          element={<AddProductCategory />}
        />
        <Route
          exact
          path="addProductSubCategory"
          element={<AddProductSubCategory />}
        />
      </Routes>

      <Footer />
    </div>

  </div>
  )
}
