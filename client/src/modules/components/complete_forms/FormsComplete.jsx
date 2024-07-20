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
            mainElement.style.minWidth = "1400px";
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

    return (
        <>
            {viproResult ? (
                <main className="min-w-[800px] min-h-[2000px] bg-TVBlue py-40 sm:py-10">
                    <div
                        className="w-[80%] m-auto h-full pt-24 pb-16 bg-white rounded-lg mainElementPdf"
                        ref={pdfRef}
                    >
                        <div className="w-[80%] m-auto pt-10 pb-20">
                            <div className="m-auto w-full flex flex-col">
                                <div className="flex flex-col gap-1 text-center pb-16">
                                    <h1 className="text-5xl font-bold">
                                        {quaText.title}
                                    </h1>
                                    <h2 className="text-5xl font-medium">
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
                                        <div className="flex flex-col w-full pt-20 pb-12">
                                            <PieG correct={userData.response[0]?.dh?.correct || 0} incorrect={userData.response[0]?.dh?.incorrect || 0} />
                                            <p className="text-center py-6">{quaText.personalData}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-20 pb-12">
                                            <PieG correct={userData.response[0]?.aff?.correct || 0} incorrect={userData.response[0]?.aff?.incorrect || 0} />
                                            <p className="text-center py-6">{quaText.familyAndFinancialTies}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-20 pb-12">
                                            <PieG correct={userData.response[0]?.hv?.correct || 0} incorrect={userData.response[0]?.hv?.incorrect || 0} />
                                            <p className="text-center py-6">{quaText.travelHistory}</p>
                                        </div>
                                        <div className="flex flex-col w-full pt-20 pb-12">
                                            <PieG correct={userData.response[0]?.hd?.correct || 0} incorrect={userData.response[0]?.hd?.incorrect || 0} />
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
                            className={`w-[80%] flex flex-row m-auto justify-center items-center gap-4 pb-4 pt-24`}
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
