import React, { useEffect, useState } from "react";
import fetchData from "../../../assets/data/validation/token.validation";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export default function ConfirmPayment() {
  const [tokenValidation, setTokenValidation] = useState(false);
  const user = Cookies.get('user')
  const userData = JSON.parse(user)
  const email = userData.email
  useEffect(() => {
    const tokenV = async () => {
      const response = await fetchData(Cookies.get("jwt"));
      if (response) {
        setTokenValidation(true);
      }
    };
    tokenV()
  });

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const country = pathSegments[2]
  const id = pathSegments[3]

  return <>{tokenValidation && <div>{country}/{id}/{email}</div>}</>;
}
