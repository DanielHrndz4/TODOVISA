import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PieG from "../stats/PieG";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import URI from "../../../assets/data/admin/uri.api";
import lang from "../../../assets/data/lang.data";

export default function FormsComplete() {
    const [viproResult, setViproResult] = useState(false);
    const [userData, setUserData] = useState({});
    const pdfRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    const quaText = lang[0].qualification

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch(`${URI}/complete_forms_id`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id }),
                });
                if (!response.ok) {
                    throw new Error('Error al cargar los formularios');
                }
                const data = await response.json();
                setUserData(data.forms);
                setViproResult(true);
            } catch (err) {
                console.error('Error al cargar los formularios', err);
            }
        };
        fetchFormData();
    }, [id]);

    const handleDownloadPDF = () => {
        const button = document.querySelector(".download-button");
        const mainElement = document.querySelector(".mainElementPdf");
        if (button) {
            button.style.display = "none";
            mainElement.style.minWidth = "1500px";
        }
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "letter");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            const now = new Date();
            const timestamp = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`qualification_${timestamp}.pdf`);
            if (button) {
                button.style.display = "flex";
                mainElement.style.minWidth = "800px";
            }
        });
    };

    const getCountry = (country) => {
        switch (country.toLowerCase()) {
            case 'estadosunidos':
                return "Estados Unidos";
            case 'canada':
                return "Canadá";
            case 'mexico':
                return "México";
            case 'inglaterra':
                return "Inglaterra";
            case 'china':
                return "China";
            case 'australia':
                return "Australia";
            case 'india':
                return "India";
            default:
                return "";
        }
    };

    const recomendation = (correct, incorrect, selection) => {
        let totalQuestions = (correct + incorrect);
        if (selection === 'dh') {
            totalQuestions = totalQuestions - 5;
        }
        const percent = (correct / totalQuestions);
        const roundedPercent = percent.toFixed(2);
        const percentTotal = (roundedPercent * 100) / 4
        if (percentTotal <= 15 || percentTotal == 0) {
            if (selection === 'dh') {
                return (
                    <p className="text-justify">
                        <strong className="text-TVred">{quaText.personalData}: </strong>{quaText.notes.personalinformation}
                    </p>
                )
            } else if (selection === 'aff') {
                return (
                    <p className="text-justify">
                        <strong className="text-TVred">{quaText.familyAndFinancialTies}: </strong>{quaText.notes.familyfinancialties}
                    </p>
                )
            } else if (selection === 'hv') {
                return (
                    <p className="text-justify">
                        <strong className="text-TVred">{quaText.travelHistory}: </strong>{quaText.notes.travelhistory}
                    </p>
                )
            } else if (selection === 'delictivo') {
                return (
                    <p className="text-justify">
                        <strong className="text-TVred">{quaText.criminalHistory}: </strong>{quaText.notes.criminalhistory}
                    </p>
                )
            }
            return null;
        }
    }

    const calcIsValid = (correct, incorrect) => {
        const totalQuestions = correct + incorrect;
        const percent = (correct / totalQuestions);
        const roundedPercent = percent.toFixed(2);
        const percentTotal = (roundedPercent * 100) / 4
        if (percentTotal <= 15) {
            return true;
        } else {
            return false
        }
    }

    const allRecommendationsValid = () => {
        if (!userData.response || !Array.isArray(userData.response) || userData.response.length === 0) {
            return false;
        }
        const data = userData.response[0];

        const dhValid = calcIsValid(data.dh.correct, data.dh.incorrect)
        const affValid = calcIsValid(data.aff.correct, data.aff.incorrect)
        const hvValid = calcIsValid(data.hv.correct, data.hv.incorrect)
        const hdValid = calcIsValid(data.hd.correct, data.hd.incorrect)

        if (dhValid || affValid || hvValid || hdValid) {
            return false
        } else {
            return true
        }
    }

    const allValid = allRecommendationsValid();

    return (
        <>
            {viproResult ? (
                <main className="min-w-[800px] min-h-[2000px] bg-TVBlue py-10 sm:py-10">
                    <div
                        className="w-[80%] m-auto h-full pt-10 pb-10 bg-white rounded-lg mainElementPdf"
                        ref={pdfRef}
                    >
                        <div className="w-[90%] m-auto pt-10 pb-20">
                            <div className="m-auto w-full flex flex-col">
                                <div className="flex flex-col gap-1 text-center pb-16">
                                    <h1 className="text-5xl font-bold">
                                        {quaText.title}
                                    </h1>
                                    <h2 className="text-5xl font-medium pt-2">
                                        {getCountry(userData.form_country)}
                                    </h2>
                                </div>
                                <div className="gap-1">
                                    <table className="w-full border-collapse rounded-md">
                                        <thead className="border mx-4 my-2 font-bold">
                                            <tr>
                                                <th className="px-4 py-2" colSpan="4">
                                                    {quaText.applicantData}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border px-4 py-2 font-bold">{quaText.name}</td>
                                                <td className="border px-4 py-2 capitalize">
                                                    {userData.name}
                                                </td>
                                                <td className="border px-4 py-2 font-bold">
                                                    {quaText.countryOfOrigin}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {userData.user_country}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-bold">{quaText.email}</td>
                                                <td className="border px-4 py-2" colSpan="3">
                                                    {userData.email}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-bold">
                                                    {quaText.phone}
                                                </td>
                                                <td className="border px-4 py-2" colSpan="3">
                                                    {userData.tel}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-full flex flex-row gap-2 m-auto">
                                {userData.response && userData.response.length > 0 && (
                                    <>
                                        <div className="flex flex-col w-full pt-12 pb-4">
                                            <PieG correct={userData.response[0]?.dh?.correct || 0} incorrect={userData.response[0]?.dh?.incorrect || 0} category="dh" />
                                            <p className="text-center py-6">{quaText.personalData}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-12 pb-4">
                                            <PieG correct={userData.response[0]?.aff?.correct || 0} incorrect={userData.response[0]?.aff?.incorrect || 0} category="aff" />
                                            <p className="text-center py-6">{quaText.familyAndFinancialTies}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-12 pb-4">
                                            <PieG correct={userData.response[0]?.hv?.correct || 0} incorrect={userData.response[0]?.hv?.incorrect || 0} category="hv" />
                                            <p className="text-center py-6">{quaText.travelHistory}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-12 pb-4">
                                            <PieG correct={userData.response[0]?.hd?.correct || 0} incorrect={userData.response[0]?.hd?.incorrect || 0} category="hd" />
                                            <p className="text-center py-6">{quaText.criminalHistory}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="text-center">
                                <h2 className="text-black font-bold text-5xl pb-4 capitalize">
                                    {quaText.overallResults}
                                </h2>
                                <p className="text-black text-4xl">
                                    {quaText.totalScore}{" "}
                                    <strong
                                        className={`${userData.qualification >= 60 ? "text-green-600" : "text-red-400"
                                            } text-shadow`}
                                    >
                                        {userData.qualification ? userData.qualification : ''}
                                    </strong>
                                </p>
                            </div>
                            <div className="h-full w-full">
                                <div className="w-full m-auto">
                                    {userData.qualification && userData.qualification >= 60 ? (
                                        <div className="flex flex-col gap-3 py-10 text-xl text-black">
                                            <h2 className="text-center text-3xl pb-4 font-semibold">
                                                {quaText.congratulations}
                                            </h2>
                                            <p className="text-justify">
                                                {quaText.approvalMessage}{" "}
                                                <strong>{userData.qualification}</strong>. {quaText.approvalMessage2}
                                            </p>
                                            <p className="text-justify">
                                                {quaText.nextStep}<strong><a href={quaText.whatsappLink} className="text-TVBlue hover:cursor-pointer">{quaText.whatsappText}</a></strong>{quaText.guideMessage}
                                            </p>
                                            <p className="text-justify">{quaText.guideConclusion}<strong><a href={quaText.whatsappLink} className="text-TVBlue hover:cursor-pointer">{quaText.whatsappText}</a></strong>{quaText.team}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3 py-10 text-xl text-black">
                                            <h2 className="text-center text-3xl pb-2 font-semibold">
                                                {quaText.notApprovedTitle}
                                            </h2>
                                            <p className="text-justify">
                                                {quaText.notApprovedMessage}{" "}
                                                {userData.qualification ? userData.qualification : ''}
                                                , {quaText.notApprovedMessage2}
                                            </p>
                                            <p>
                                                {quaText.dontGetDiscouraged}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {/* Muestra el texto si todas las recomendaciones son válidas */}
                                    {allValid ? (
                                        <p>Todo está correcto.</p>
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-3 pb-10 text-xl text-black">
                                                <h1 className="text-2xl font-bold">{quaText.notes.improvement}</h1>
                                                {recomendation(userData.response[0]?.dh?.correct, userData.response[0]?.dh?.incorrect, 'dh')}
                                                {recomendation(userData.response[0]?.aff?.correct, userData.response[0]?.aff?.incorrect, 'aff')}
                                                {recomendation(userData.response[0]?.hv?.correct, userData.response[0]?.hv?.incorrect, 'hv')}
                                                {recomendation(userData.response[0]?.hd?.correct, userData.response[0]?.hd?.incorrect, 'delictivo')}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="w-full m-auto">
                                    <div className="text-justify flex flex-col gap-5">
                                        <h1 className="text-2xl font-bold">{quaText.importantNote}</h1>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-xl">
                                                {quaText.weightingMessage}
                                            </p>
                                            <p className="text-xl">
                                                {quaText.interviewMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-auto flex justify-center items-center gap-4 download-button">
                            <Button
                                onClick={handleDownloadPDF}
                                className="bg-TVBlue shadowbtn"
                                style={{ display: "block" }} // Asegúrate de que el botón esté visible por defecto
                            >
                                {quaText.downloadCertificate}
                            </Button>
                            <Button
                                onClick={() => navigate("/")}
                                className="bg-TVred shadowbtn"
                                style={{ display: "block" }} // Asegúrate de que el botón esté visible por defecto
                            >
                                {quaText.goBackToStart}
                            </Button>
                        </div>
                        <div
                            id="paddingButton"
                            className={`w-[80%] flex flex-row m-auto justify-center items-center gap-4 pb-4 pt-4`}
                        >
                            <img
                                src="/img/logo/todovisa.png"
                                className="w-[60px] h-[60px]"
                                alt="TODOVISA S.A DE C.V"
                            />
                            <h2 className="font-semibold">© 2024 TodoVisa S.A de C.V</h2>
                        </div>
                    </div>
                </main>
            ) : (
                navigate("/")
            )}
        </>
    );
}
