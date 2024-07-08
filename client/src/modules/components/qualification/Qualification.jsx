import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Qualification() {
    const user = Cookies.get('user');
    const userData = JSON.parse(user);
    const email = userData.email;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userResponseData, setUserResponseData] = useState([]);
    const [formResponseData, setFormResponseData] = useState([]);
    const [correctCountDP, setCorrectCountDP] = useState(0);
    const [correctCountAFF, setCorrectCountAFF] = useState(0);
    const [correctCountHV, setCorrectCountHV] = useState(0);
    const [correctCountHD, setCorrectCountHD] = useState(0);
    const [incorrectCountDP, setIncorrectCountDP] = useState(0);
    const [incorrectCountAFF, setIncorrectCountAFF] = useState(0);
    const [incorrectCountHV, setIncorrectCountHV] = useState(0);
    const [incorrectCountHD, setIncorrectCountHD] = useState(0);
    const [qualification, setQualification] = useState(0);

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
                    const userResponse = data.responseFormUser;
                    const formResponse = data.responseForm;
                    setUserResponseData(userResponse.questions || []);
                    setFormResponseData(formResponse.questions || []);
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
    }, [email]);

    useEffect(() => {
        let correctDPCount = 0;
        let correctAFFCount = 0;
        let correctHVCount = 0;
        let correctHDCount = 0;
        let incorrectDPCount = 0;
        let incorrectAFFCount = 0;
        let incorrectHVCount = 0;
        let incorrectHDCount = 0;

        userResponseData.forEach((userQuestion, index) => {
            const correctResponses = formResponseData[index]?.response || [];
            const userResponse = userQuestion.user_response.toUpperCase(); // Asegurar que la respuesta del usuario esté en mayúsculas

            if (correctResponses.includes("") || !correctResponses.includes(userResponse)) {
                switch (userQuestion.category) {
                    case "DATOS PERSONALES":
                        incorrectDPCount += 1;
                        break;
                    case "ARRAIGOS FAMILIARES Y FINANCIEROS":
                        incorrectAFFCount += 1;
                        break;
                    case "HISTORIAL DE VIAJES":
                        incorrectHVCount += 1;
                        break;
                    case "HISTORIAL DELICTIVO":
                        incorrectHDCount += 1;
                        break;
                    default:
                        break;
                }
            } else {
                switch (userQuestion.category) {
                    case "DATOS PERSONALES":
                        correctDPCount += 1;
                        break;
                    case "ARRAIGOS FAMILIARES Y FINANCIEROS":
                        correctAFFCount += 1;
                        break;
                    case "HISTORIAL DE VIAJES":
                        correctHVCount += 1;
                        break;
                    case "HISTORIAL DELICTIVO":
                        correctHDCount += 1;
                        break;
                    default:
                        break;
                }
            }
        });

        setCorrectCountDP(correctDPCount);
        setCorrectCountAFF(correctAFFCount);
        setCorrectCountHV(correctHVCount);
        setCorrectCountHD(correctHDCount);
        setIncorrectCountDP(incorrectDPCount);
        setIncorrectCountAFF(incorrectAFFCount);
        setIncorrectCountHV(incorrectHVCount);
        setIncorrectCountHD(incorrectHDCount);

        const totalCorrect = correctDPCount + correctAFFCount + correctHVCount + correctHDCount;
        setQualification(totalCorrect * 2.6);
    }, [userResponseData, formResponseData]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="h-screen w-full bg-TVBlue">
            <h1>Formulario de calificación</h1>
            <main className="h-screen w-full bg-TVBlue">
                <h1 className="text-white text-2xl font-bold p-4">Formulario de calificación</h1>

                <div className="p-4">
                    <h2 className="text-white text-xl font-bold mb-2">Resultados por categoría</h2>

                    <div className="mb-4">
                        <h3 className="text-white text-lg font-bold">DATOS PERSONALES</h3>
                        <p className="text-white">Respuestas correctas: {correctCountDP}</p>
                        <p className="text-white">Respuestas incorrectas: {incorrectCountDP}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-white text-lg font-bold">ARRAIGOS FAMILIARES Y FINANCIEROS</h3>
                        <p className="text-white">Respuestas correctas: {correctCountAFF}</p>
                        <p className="text-white">Respuestas incorrectas: {incorrectCountAFF}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-white text-lg font-bold">HISTORIAL DE VIAJES</h3>
                        <p className="text-white">Respuestas correctas: {correctCountHV}</p>
                        <p className="text-white">Respuestas incorrectas: {incorrectCountHV}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-white text-lg font-bold">HISTORIAL DELICTIVO</h3>
                        <p className="text-white">Respuestas correctas: {correctCountHD}</p>
                        <p className="text-white">Respuestas incorrectas: {incorrectCountHD}</p>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-white text-xl font-bold">Resultados generales</h2>
                    <p className="text-white">Calificación total: {qualification}</p>
                </div>
            </main>
        </main>
    );
}
