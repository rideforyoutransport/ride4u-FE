import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tenant } from "../../utils/tenant";
import {roles} from "./roles";
const userTypesArr = [
  
];

export default function EditUserRole() {
  const [indusrtyName, setIndusrtyName] = useState("");
  const [newUserValue, setNewUserValue] = useState("");
  const [userTypes, setUsersTypes] = useState(userTypesArr);
  const [industryId, setIndustryId] = useState(0)
  const [userRoles, setUserRoles] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);


  useEffect(() => {

  setUserRoles(roles);
   
  }, [renderAgain]);
  

  const handleSubOptionChange =(e,targetMain,target)=>{

    let oldValues=userRoles;
    oldValues[targetMain].options[target].allowed=  oldValues[targetMain].options[target].allowed?false:true;
    setUserRoles(oldValues);
    setRenderAgain((old)=>!old);

  };

const handleProgramSelection = (e,target) => { 

  let oldValues=userRoles;
  oldValues[target].allowed= oldValues[target].allowed?false:true;
  setUserRoles(oldValues);
  setRenderAgain((old)=>!old);

};

  useEffect(() => {
    console.log(window.location.search.split("=")[1]);
    setIndustryId(() =>
       window.location.search.split("=")[1] ? window.location.search.split("=")[1] : 0
    );
    const indId=window.location.search.split("=")[1];
    console.log(indId);
  
    if(indId!==0){
      
      var config = {
        method: 'get',
        url: `http://127.0.0.1:3003/api/userPermission/${indId}`,
        headers: { 
          'slug': tenant, 
          'Content-Type': 'application/json'
        },
      };
       
      axios(config)
      .then(function (response) {
        console.log((response.data));
        setIndusrtyName(response.data.name);
        setUsersTypes(response.data.i_users);
        let permissions = response.data.permissions;
        permissions=[...roles];
       //if(response.data.permissions) setUserRoles(response.data.permissions);
      // else
       setUserRoles(permissions);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
  }, [])
  

  const navigate = useNavigate();

  const removeFromUserTypes = (e, key) => {
    console.log(key);
    let oldValues = [...userTypes];
    oldValues = oldValues.filter((user) => user != key);
    setUsersTypes(oldValues);
  };


  const cancelAddProductSubCategory = () => {
    navigate("/tenant/userRoles");
  };

  const editIndustry = (e) => {
    e.preventDefault();
    if (indusrtyName.length > 0) {
      // Hit the Api for adding product category



var data = JSON.stringify({
  name: indusrtyName,
  permissions: userRoles
  
});

var config = {
  method: 'put',
  url: `http://127.0.0.1:3003/api/userPermission/${industryId}`,
  headers: { 
    'slug': tenant, 
    'Content-Type': 'application/json'
  },
  data : data
};


      
      axios(config)
      .then(function (response) {
        console.log((response.data));
        navigate("/tenant/userRoles");
      })
      .catch(function (error) {
        console.log(error);
      });

    } else {
      // add logic to display the error
    }
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Role</h4>

              <form className="cmxform" id="signupForm" method="get" action="#">
                <div className="form-group row">
                  <div className="col-md-12 mt-3">
                    <label for="name">Role Name </label>
                    <input
                      id="name"
                      className="form-control"
                      value={indusrtyName}
                      onChange={(e) => {
                        setIndusrtyName(e.target.value);
                      }}
                      type="text"
                    />
                  </div>

                  <div className="col-md-12 my-3">
                  <div className="my-5">Permissions</div>
                  {
                    userRoles.map((role,idxMain) => <span>
                    <label>
                    <input
                      type="checkbox"
                      value={role.name}
                      checked={role.allowed ? "checked" : ""}
                      onChange={(e) => handleProgramSelection(e, idxMain)}
                    />
                    <span className="px-2 mx-2">{role.name}</span>
      
                    <div className="ml-3 mt-1">
                      {
                        role.options.map((e, idx) => (
                       
                          <div key={idx}>
                            <input
                              type="checkbox"
                              value={e.name}
                              checked={e.allowed? "checked" : ""
                           //     checkUserPresent(e, "SupplyBeam") ? "checked" : ""
                              }
                             onChange={(e) => handleSubOptionChange(e,idxMain,idx)}
                            />
                            <span className="px-2 mx-2">{e.name}</span>
                          </div>
                        ))}
                    </div>
                  </label>
                    
                    
                    </span>)
                  }
       
                 
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={(e)=>editIndustry(e)}
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-md-2 mt-3">
                    <button
                      type="cancel"
                      className="btn btn-outline-danger mr-2 w-100"
                      onClick={cancelAddProductSubCategory}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
