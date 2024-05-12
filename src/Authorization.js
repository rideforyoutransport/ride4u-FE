import axios from 'axios';
import React, {  useEffect } from 'react';
import { tenant } from './utils/tenant';



const Authorization = () => {
  useEffect(() => {
    const validateSession = async () => {
      const data = await axios.get(`http://127.0.0.1:3003/api/admin/validate`, {
        withCredentials: true,
        headers:{
            slug:tenant
        }
      },)
      console.log(data);
      if (!data.data.not_verified) {
        localStorage.setItem('is_verified', true);
      } else {
        if (localStorage.getItem('is_verified')) {
          localStorage.removeItem('is_verified');
        }
        window.location.href = `http://localhost:3000`
      }
    }
    validateSession();
  }, []);
  return (
    <></>
  );
}

export default Authorization;