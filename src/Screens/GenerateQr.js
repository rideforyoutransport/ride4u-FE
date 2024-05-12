import React, { useEffect, useState } from "react";
import axios from "axios";
import { tenant } from "../utils/tenant";
export default function GenerateQr() {
  const [prodList, setProdList] = useState([]);
  const [selectedProd, setSelectedProd] = useState("");
  const [noOfQr, setNoOfQr] = useState(0);
  const [batchNo, setBatchNo] = useState("");
  //const [productId, setProductId] = useState(0);



useEffect(() => {
  var config = {
    method: "get",
    url: "http://127.0.0.1:3003/api/product/",
    headers: {
      "Content-Type": "application/json",
      "slug":tenant
    },
  };

  axios(config)
    .then(function (response) {
      //console.log(response.data);
      setProdList(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  
}, [])


  const handleChange = (event) => {
    setSelectedProd(event.target.value);
    console.log(event.target.value);
    
  };

  const generateQrs = () => {
    var data = JSON.stringify({
      b_name: batchNo,
      qr_count: parseInt(noOfQr),
      p_id: parseInt(selectedProd),
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:3003/api/batch/",
      headers: {
        "Content-Type": "application/json",
        'slug': tenant
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex h-screen justify-center items-center drop-shadows-xl">
        <select value={selectedProd} onChange={handleChange}>
          {prodList.map((prod) => (
            <option key={prod.id} value={prod.id} onSelect={(e)=>console.log(e.target.option)}>
              {prod.p_name}
            </option>
          ))}
        </select>
        <input className="border mx-2" value={batchNo} onChange={(e)=>setBatchNo(e.target.value)} placeholder="add Batch Code " />
        <input className="border mx-2 " value = {noOfQr} onChange={(e)=>setNoOfQr(e.target.value)} type="number" min="0" placeholder="add No of QR " />
        <button className="bg-cyan-400 rounded-md mx-5 text-white p-2" onClick={generateQrs}>Generate QR</button>
      </div>
    </div>
  );
}
