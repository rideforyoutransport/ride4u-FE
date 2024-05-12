import "./App.css";

import Register from "./Screens/register/Register";
import { useState } from "react";
import Home from "./Screens/home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
// import Authorization from "./Authorization";
import NotFound from "./Screens/notFound/NotFound";
import THome from "./Screens/masterHome/MHome";
import Login from "./Screens/tenantLogin/Login";

import HomeTenant from "./Screens/home/HomeTenant";
import VerifyQrCode from "./Screens/qr/VerifyQrCode";
import HomeTenantUsers from "./Screens/home/HomeTenantUsers";
import LoginUsers from "./Screens/tenantLogin/LoginUsers";

function App() {
  const [authorized, setAuthorized] = useState(() => {
    return sessionStorage.getItem("authorized")
      ? sessionStorage.getItem("authorized")
      : false;
  });
  const [tenant, setTenant] = useState("tenantAdmin");

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !authorized ? (
              <div>
                <Register setAuthorized={setAuthorized} />
              </div>
            ) : (
              <div>
                <Home />
              </div>
            )
          }
        />
        <Route path="verifyQrCode" element={<VerifyQrCode />} />
        <Route
        path="/tenant/*"
        element={
          !authorized ? (
            <div>
              <Login setAuthorized={setAuthorized} />
            </div>
          ) : (
            <div>
            <HomeTenant />

            </div>
          )
        }
      />
       <Route
        path="/tenantUsers/*"
        element={
          !authorized ? (
            <div>
              <LoginUsers setAuthorized={setAuthorized} />
            </div>
          ) : (
            <div>
            <HomeTenantUsers />

            </div>
          )
        }
      />
      {/*
        <Route
          path="/tenant/*"
          element={
            // Good! Do your composition here instead of wrapping <Route>.
            // This is really just inverting the wrapping, but it's a lot
            // more clear which components expect which props.
            <RequireAuth redirectTo="/">
              <THome />
            </RequireAuth>
          }
        />
         <Route path="*" element={<NotFound />} />
        */
      }
       
      </Routes>

      {/*
    <Routes>
    <Route path="/" 
  <Route path="/admin" 
   render={()=><div>THis is for testing </div>}
  />
    </Routes>
  */}
    </div>
  );
}

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
export default App;
