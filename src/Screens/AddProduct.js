import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./product/Product";
import { tenant } from "../utils/tenant";
console.log({tenant});

export default function AddProduct() {
  const [showProductList, setShowProductList] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productNameError, setSetProductNameError] = useState("");
  const [productDescriptionErrror, setSetProductDescriptionErrror] = useState("");
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [productPoints, setProductPoints] = useState(0);

  const changeTheProduct = (id, prod_name, prod_description) => {
    // add the logic to Edit the Product

    var data = JSON.stringify({
      p_name: prod_name,
      p_description: prod_description,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:3003/api/product/${id}`,
      headers: {
        "Content-Type": "application/json",
        'slug': tenant
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTriggerEffect(!triggerEffect);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // fetch the list of products here and store it in setProductList

    var config = {
      method: "get",
      url: "http://127.0.0.1:3003/api/product/",
      headers: {
        "Content-Type": "application/json",
        'slug': tenant
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [triggerEffect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName === "") {
      setSetProductNameError("Product name cannot be empty");
    } else {
      setSetProductNameError("");
    }
    if (productDescription === "") {
      setSetProductDescriptionErrror("Product Description cannot be empty ");
    } else {
      setSetProductDescriptionErrror("");
    }
    if (
      productDescriptionErrror === "" &&
      productNameError === "" &&
      productDescription.length > 0 &&
      productName.length > 0
    ) {
      var data = JSON.stringify({
        p_name: productName,
        p_description: productDescription,
      });
      let config = {
        method: "post",
        url: "http://127.0.0.1:3003/api/product/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setProductName("");
          setProductDescription("");
          console.log(JSON.stringify(response.data));
          setTriggerEffect(!triggerEffect);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center my-5 ">
        <button
          className=" bg-cyan-400 rounded-md text-white px-5 py-2"
          onClick={() => {
            setShowProductList(!showProductList);
          }}
        >
          {showProductList ? "Add Product" : " See Products "}
        </button>
      </div>
      {!showProductList && (
        <div className="flex h-screen justify-center items-center drop-shadows-xl">
          <form className="border border-gray-300 rounded-md p-5 bg-gray-100">
            <div>
              <label className=" py-5 mx-2 my-3">Product Name :</label>
              <br />
              <input
                placeholder="Mobile"
                className="border border-gray-400 rounded-md mx-2 my-5 px-5 py-2"
                onChange={(e) => {
                  if (productName.length > 0) {
                    setSetProductNameError("");
                  } else {
                    setSetProductNameError("Please Enter a Name");
                  }
                  setProductName(e.target.value);
                }}
              />
              <p className="text-red-500 font-bold text-sm">
                {" "}
                {productNameError}
              </p>
            </div>
            <div>
              <label className=" py-5 mx-2 my-3">Product Description :</label>
              <br />
              <input
                placeholder="Apple iPhone 13 Pro Max 256"
                className="border border-gray-400 rounded-md mx-2 my-5 px-5 py-2"
                onChange={(e) => {
                  if (productDescription.length > 0) {
                    setSetProductDescriptionErrror("");
                  } else {
                    setSetProductDescriptionErrror("Please Enter Description");
                  }
                  setProductDescription(e.target.value);
                }}
              />
              <p className="text-red-500 font-bold text-sm">
                {" "}
                {productDescriptionErrror}
              </p>
            </div>

            <button
              className=" rounded-md bg-cyan-500 p-2 m-2 text-white"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {showProductList && (
        <div className="grid h-screen place-items-center">
          {productList.map((prod) => (
            <div
              className="flex px-5 py-2 my-2 bg-gray-200 rounded-md"
              key={prod.id}
            >
              <Product
                className="flex-1"
                p_name={prod.p_name}
                p_description={prod.p_description}
                id={prod.id}
                changeTheProduct={changeTheProduct}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
