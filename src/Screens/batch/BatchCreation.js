import React, { useState } from 'react'
import axios from 'axios';
import { tenant } from '../../utils/tenant';
import { useNavigate } from 'react-router-dom';

export default function BatchCreation() {

  const [batchName, setBatchName] = useState("");
  const navigate = useNavigate();

  const createBatch = () =>{
    // create a batch creation API 

var data = JSON.stringify({
  "b_name": batchName
});

var config = {
  method: 'post',
  url: 'http://127.0.0.1:3003/api/batch/',
  headers: { 
    'Content-Type': 'application/json',
    'slug':tenant
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
  navigate("/tenant");
})
.catch(function (error) {
  console.log(error);
});

  }
  return (

    <div className="page-content">
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Batch</h4>
            
            <div className="cmxform" id="signupForm" >
              <div className="form-group row">
                
                <div className="col-md-6">
                  <label>Batch </label>
                  <input
                    id="name"
                    className="form-control"
                    name="p_box"
                    type="text"
                    value={batchName}
                    onChange={(e)=>{setBatchName(e.target.value)}}
                  />
                </div>
                <div className="col-md-3 mt-8">
                <button type="submit" className="btn btn-outline-primary mr-2 w-100" onClick={createBatch}>Create Batch</button>
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}
