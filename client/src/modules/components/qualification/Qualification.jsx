import React, { useEffect } from "react";
import Cookies from "js-cookie"

export default function Qualification() {
    const user = Cookies.get('user');
    const userData = JSON.parse(user);
    const email = userData.email;
    const qualificationData = async (email) => {
        try {
            const response = await fetch(
                "http://localhost:3366/api/form_response_eeuu",
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email }) // Asegúrate de enviar el correo electrónico que necesitas buscar
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log("Response data:", data);
                return true;
            } else {
                console.log("Response error:", response);
                return false;
            }
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    };

    useEffect(() => {
        qualificationData(email);
    }, []); // Agrega una dependencia vacía para que useEffect se ejecute solo una vez al montar el componente

    return (
        <>
            <h1>Response</h1>
        </>
    );
}
