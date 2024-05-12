import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userTypesArr = [
  
];

export default function EditIndustry() {
  const [indusrtyName, setIndusrtyName] = useState("");
  const [newUserValue, setNewUserValue] = useState("");
  const [userTypes, setUsersTypes] = useState(userTypesArr);
  const [industryId, setIndustryId] = useState(0)



  useEffect(() => {
    console.log(window.location.search.split("=")[1]);
    setIndustryId(() =>
       window.location.search.split("=")[1] ? window.location.search.split("=")[1] : 0
    );
    const indId=window.location.search.split("=")[1];
    if(indId!==0){
      var config = {
        method: 'get',
        url: `http://127.0.0.1:3003/admin/industry/${indId}`,
        headers: { 
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 
        }
      };
      
      axios(config)
      .then(function (response) {

        console.log((response.data));
        setIndusrtyName(response.data.i_name);
        setUsersTypes(response.data.i_users);
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
    navigate("/industryMaster");
  };

  const editIndustry = (e) => {
    e.preventDefault();
    if (indusrtyName.length > 0) {
      // Hit the Api for adding product category


      var data = JSON.stringify({
        i_name: indusrtyName,
        i_users: userTypes,
      });

      
      var config = {
        method: 'put',
        url: `http://127.0.0.1:3003/admin/industry/${industryId}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log((response.data));
        navigate("/industryMaster");
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
              <h4 className="card-title">Edit Industry</h4>

              <form className="cmxform" id="signupForm" method="get" action="#">
                <div className="form-group row">
                  <div className="col-md-12 mt-3">
                    <label for="name">Industry Name </label>
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
                    <div>
                      <label className="text-capitalize font-weight-bold">
                        {" "}
                        Users
                      </label>
                    </div>
                    {userTypes.map((key) => (
                      <label key={key}>
                        <span
                          className="px-2 mx-2 btn btn-outline-danger"
                          onClick={(e) => removeFromUserTypes(e, key)}
                        >
                          {key}
                        </span>
                      </label>
                    ))}

                    <label>
                      <input
                        type="text"
                        className="border p-1"
                        placeholder="Add new UserType"
                        value={newUserValue}
                        onChange={(e) => setNewUserValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            console.log(newUserValue);
                            let oldUserTypes = [...userTypes];
                            oldUserTypes.push(newUserValue);
                            setUsersTypes(oldUserTypes);
                            console.log(userTypes);
                            setNewUserValue("");
                          }
                        }}
                      />
                    </label>
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
