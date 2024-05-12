import React, { useState } from "react";

export default function Product({
  p_name,
  p_description,
  id,
  changeTheProduct,
}) {
  const [productName, setProductName] = useState(p_name);
  const [productDescription, setProductDescription] = useState(p_description);

  const handleChange = (e, bool) => {
    e.preventDefault();

    if (bool) {
      setProductName(e.target.value);
    } else {
      setProductDescription(e.targer.value);
    }
  };

  return (
    <div className="flex justify-between px-5 py-2 my-2 text-white w-400">
      <div className="flex-1 mx-1">
        <input
          className="text-black rounded-sm p-2"
          value={productName}
          onChange={(e) => handleChange(e, true)}
          placeholder={p_name}
        />
        {/*     {p_name}*/}{" "}
      </div>
      <div className="flex-1 mx-1">
        <input
          className="text-black rounded-sm p-2"
          value={productDescription}
          onChange={(e) => handleChange(e, false)}
          placeholder={p_name}
        />

        {/* {p_description}*/}
      </div>
      <div
        className="flex-1 text-md p-2  text-white bg-cyan-400 rounded-md "
        onClick={() => {
          changeTheProduct(id, productName, productDescription);
        }}
      >
        {" "}
        <button>Save</button>
      </div>
    </div>
  );
}
