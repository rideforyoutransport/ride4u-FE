import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tenant } from "../../utils/tenant";

const userTypesArr = [
  "Customer",
  "Distributor",
  "Retailers",
  "Channel Partner",
  "CEO",
  "WareHouse",
  "Vendor",
];

export default function AddIndustry() {
  const [indusrtyName, setIndusrtyName] = useState("");
  const [newUserValue, setNewUserValue] = useState("");
  const [userTypes, setUsersTypes] = useState(userTypesArr);

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
  const handleUserTypeSelection = (e, type) => {
    console.log(type);
    let copiedValue = [...userTypes];
    copiedValue[type] = copiedValue[type] ? false : true;
    setUsersTypes(copiedValue);
    //console.log(productsAvailing);
  };

  const addIndustry = () => {
    if (indusrtyName.length > 0) {
      // Hit the Api for adding product category

      var data = JSON.stringify({
        i_name: indusrtyName,
        i_users: userTypes,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3003/admin/industry/add",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

        },
        data: data,
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
              <h4 className="card-title">Add Product Subcategory</h4>

              <div className="cmxform" id="signupForm" >
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
                      onClick={addIndustry}
                    >
                      Add Industry
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
