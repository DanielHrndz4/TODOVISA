import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Qualification() {
    const user = Cookies.get('user');
    const userData = JSON.parse(user);
    const email = userData.email;

    const [responseForm, setResponseForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const qualificationData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3366/api/form_response_eeuu",
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setResponseForm(data);
                } else {
                    throw new Error('Error en la respuesta de la API');
                }
            } catch (err) {
                setError(err.message || 'Hubo un problema al obtener los datos.');
            } finally {
                setLoading(false);
            }
        };

        qualificationData();
    }, [email]); // Dependencia de useEffect para volver a cargar si cambia el correo electrónico

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <h1>Formulario de calificación</h1>
            {responseForm.questions.map((question)=>(
                <div>
                    <div>
                    {question.response.map((response)=>(
                        <h2>{response}</h2>
                    ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
