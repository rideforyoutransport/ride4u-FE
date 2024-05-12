import React, { useEffect, useState } from "react";
import axios from "axios";
import { tenant } from "../../utils/tenant";
import { useNavigate } from "react-router-dom";

export default function GenerateQrCode() {
  const [productsList, setProductsList] = useState([]);
  const [selectedProd, setSelectedProd] = useState("");
  const [batchList, setBatchList] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [qrQty, setQrQty] = useState(0);
  const navigate = useNavigate();

  const genQrCode = () => {
    var data = JSON.stringify({
      batch_id: parseInt(selectedBatch),
      qr_count: parseInt(qrQty),
      product_id: parseInt(selectedProd),
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:3003/api/qr/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        alert("Qr codes Created successfully");
        navigate("/tenant");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var configBatch = {
      method: "get",
      url: "http://127.0.0.1:3003/api/batch/",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(configBatch)
      .then(function (response) {
        setBatchList(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/product/allDetails",
      headers: {
        "Content-Type": "application/json",
        slug: tenant,
      },
    };

    axios(config)
      .then(function (response) {
        setProductsList(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleChange = (event) => {
    setSelectedProd(event.target.value);
    console.log(selectedProd);
  };
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    console.log({ selectedBatch });
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Generate QR Code</h4>

              <div className="cmxform" >
                <div className="form-group row">
                  <div className="col-md-4">
                    <label>Product Name</label>
                    <select
                      className="js-example-basic-single w-100"
                      onChange={handleChange}
                      value={selectedProd}
                    >
                      <option value="">Select Prod</option>
                      {productsList.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.p_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label>Batch</label>
                    <select
                      className="js-example-basic-single w-100"
                      onChange={handleBatchChange}
                      value={selectedBatch}
                    >
                      <option value="">Select Batch</option>

                      {batchList.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.b_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label>Enter quantity in pieces for QR code</label>
                    <input
                      className="form-control"
                      name="p_box"
                      min={0}
                      value={qrQty}
                      onChange={(e) => setQrQty(e.target.value)}
                      type="number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 mt-3">
                    <button
                      className="btn btn-outline-primary mr-2 w-100"
                      onClick={genQrCode}
                    >
                      Generate QR
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
