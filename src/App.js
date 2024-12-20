import "./App.css";
import { useState } from "react";
import Home from "./Screens/home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Screens/login/Login";
import { get } from "./utils/Crypto";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import Redirection from "./Screens/Redirection";


function App() {
  const [authorized, setAuthorized] = useState(() => {
    return get("authorized")
      ? get("authorized")
      : false;
  });

  return (
    <div>
      <Routes>
        <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/trip/*" element={<Redirection/>} />
        <Route
          path="/*"
          element={
            !authorized ? (
              <div>
                <Login setAuthorized={setAuthorized} />
              </div>
            ) : (
              <div>
                <Home />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
export default App;
