import React, { useEffect, useState } from "react";
import fetchData from "../../../assets/data/validation/token.validation";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";
import URI from "../../../assets/data/admin/uri.api";
import handleClickPopUpSignUp from "../popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data";

export default function GuidePayment() {
    const [tokenValidation, setTokenValidation] = useState(null);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [showLoading, setShowLoading] = useState(true); // Estado para controlar la visualización de Loading
    const navigateTo = useNavigate();
    const langGuide = lang[0].guidePayment;

    function decodeBase64(encodedValue) {
        try {
            return atob(encodedValue);
        } catch (e) {
            return "Invalid Base64 string";
        }
    }

    useEffect(() => {
        const validateToken = async () => {
            try {
                const jwtToken = Cookies.get("jwt");
                if (!jwtToken) {
                    setTokenValidation(false);
                    return;
                }
                const response = await fetchData(jwtToken);
                setTokenValidation(response ? true : false);
            } catch (err) {
                console.error("Error during token validation:", err);
                setError("An error occurred while validating the token.");
                setTokenValidation(false);
            }
        };

        validateToken();
    }, []);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const email = pathSegments[3];

    useEffect(() => {
        const submitForm = async () => {
            try {
                const response = await fetch(`${URI}/access_pdf`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: decodeBase64(email) }),
                });

                const data = await response.json();
                setResponseData(data);

                if (response.ok) {
                    handleClickPopUpSignUp("success", `<h1 class='text-black pb-4 text-2xl font-semibold'>${langGuide.success.title}</h1><p class='text-center'>${langGuide.success.description}</p>`, langGuide.success.button);
                } else {
                    handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>${langGuide.error.title}</h1><p class='text-center'>${langGuide.error.description}</p>`, langGuide.error.button);
                }
                navigateTo('/');
            } catch (err) {
                console.error("Error during form submission:", err);
                setError("An error occurred while submitting the form.");
            }
        };

        if (tokenValidation) {
            submitForm();
        }
    }, [tokenValidation, email]);

    return (
        <>
            {tokenValidation ?
                <div>
                    <Loading />
                </div> :
                navigateTo('/')
            }
        </>
    );
}
