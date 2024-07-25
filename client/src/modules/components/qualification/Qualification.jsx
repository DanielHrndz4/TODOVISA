import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PieG from "../stats/PieG";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import URI from "../../../assets/data/admin/uri.api";
import lang from "../../../assets/data/lang.data";

export default function Qualification() {
  const user = Cookies.get("user");
  const userData = JSON.parse(user);
  const email = userData.email;
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResponse, setUserResponse] = useState([]);
  const [userResponseData, setUserResponseData] = useState([]);
  const [formResponseData, setFormResponseData] = useState([]);
  const [correctCountDP, setCorrectCountDP] = useState(null);
  const [correctCountAFF, setCorrectCountAFF] = useState(null);
  const [correctCountHV, setCorrectCountHV] = useState(null);
  const [correctCountHD, setCorrectCountHD] = useState(null);
  const [incorrectCountDP, setIncorrectCountDP] = useState(null);
  const [incorrectCountAFF, setIncorrectCountAFF] = useState(null);
  const [incorrectCountHV, setIncorrectCountHV] = useState(null);
  const [incorrectCountHD, setIncorrectCountHD] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [countryForm, setCountryForm] = useState("");
  const [dataQualifications, setDataQualifications] = useState();
  const quaText = lang[0].qualification;
  const pdfRef = useRef();

  useEffect(() => {
    const allowedReferers = [
      "http://localhost:5173/vipro/estadosunidos",
      "http://localhost:5173/vipro/canada",
      "http://localhost:5173/",
    ];

    const referer = document.referrer;

    if (!allowedReferers.includes(referer)) {
      navigateTo("/"); // Redirige a la página de inicio u otra página de tu elección
    }
  }, [history]);
  useEffect(() => {
    const qualificationData = async () => {
      try {
        const response = await fetch(`${URI}/form_response_eeuu`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        if (response.ok) {
          const data = await response.json();
          const userResponse = data.responseFormUser;
          const formResponse = data.responseForm;
          const userInfo = data.user;
          setUserResponse(userInfo);
          setUserResponseData(userResponse.questions || []);
          setFormResponseData(formResponse.questions || []);
          setCountryForm(userResponse.country);

          //saveQualification();
        } else {
          navigateTo("/");
          throw new Error("Error en la respuesta de la API");
        }
      } catch (err) {
        setError(err.message || "Hubo un problema al obtener los datos.");
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

      if (
        correctResponses.includes("") ||
        !correctResponses.includes(userResponse)
      ) {
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
    const totalCorrect =
      correctDPCount + correctAFFCount + correctHVCount + correctHDCount;
    setQualification(totalCorrect * 2.6);
  }, [userResponseData, formResponseData]);

  const getCountry = (country) => {
    switch (country.toLowerCase()) {
      case "estadosunidos":
        return "Estados Unidos";
      case "canada":
        return "Canadá";
      case "mexico":
        return "México";
      case "inglaterra":
        return "Inglaterra";
      case "china":
        return "China";
      case "australia":
        return "Australia";
      case "india":
        return "India";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!loading) {
      const saveQualification = async () => {
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

          if (
            correctResponses.includes("") ||
            !correctResponses.includes(userResponse)
          ) {
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

        const lastname =
          userResponse.lastname !== undefined ? userResponse.lastname : "";
        const resultDataQualification = {
          name: userResponse.name + " " + lastname,
          email: userResponse.email,
          tel: userResponse.tel,
          user_country: userResponse.country,
          form_country: countryForm,
          response: [
            {
              dh: {
                correct: correctDPCount,
                incorrect: incorrectDPCount,
              },
              aff: {
                correct: correctAFFCount,
                incorrect: incorrectAFFCount,
              },
              hv: {
                correct: correctHVCount,
                incorrect: incorrectHVCount,
              },
              hd: {
                correct: correctHDCount,
                incorrect: incorrectHDCount,
              },
            },
          ],
          qualification: (correctDPCount+correctAFFCount+correctHVCount+correctHDCount) * 2.6, // asegúrate de enviar la calificación como string
        };

        console.log(resultDataQualification)

        try {
          const response = await fetch(`${URI}/save_qualification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              resultData: resultDataQualification,
              email: email,
              country: countryForm
            }),
          });

          const data = await response.json();
          console.log("Response from server:", data); // revisa la respuesta del servidor en la consola

          if (!data.success) {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Error al guardar la calificación: ", error);
        }
      };
      saveQualification();
    }
  }, [loading]);

  if (loading) return <div></div>;
  if (error) return <div></div>;

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

  const viproResult = userResponse.vipro;

  const recomendation = (correct, incorrect, selection) => {
    const totalQuestions = correct + incorrect;
    const percent = (correct / totalQuestions);
    const roundedPercent = percent.toFixed(2);
    const percentTotal = (roundedPercent * 100) / 4
    const percentForCategory = 25 * 0.60
    console.log(percentForCategory, percentTotal)
    if (percentTotal <= percentForCategory) {
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
      } else {
        return (
          <p className="text-justify">
            <strong className="text-TVred">{quaText.criminalHistory}: </strong>{quaText.notes.criminalhistory}
          </p>
        )
      }
    }
  }

  const allRecommendationsValid = () => {
    if (!userData.response || !Array.isArray(userData.response) || userData.response.length === 0) {
      return false;
    }

    const dhValid = recomendation(correctCountDP, incorrectCountDP, 'dh');
    const affValid = recomendation(correctCountAFF, incorrectCountAFF, 'aff');
    const hvValid = recomendation(correctCountHV, incorrectCountHV, 'hv');
    const hdValid = recomendation(correctCountHD, incorrectCountHD, 'hd');

    // Verifica si todas las recomendaciones son válidas
    return dhValid && affValid && hvValid && hdValid;
  }

  const allValid = allRecommendationsValid()

  return (
    <>
      {!viproResult ? (
        <main className="min-w-[800px] min-h-[2000px] bg-TVBlue py-10 sm:py-10">
          <div
            className="w-[80%] m-auto h-full pt-10 pb-10 bg-white rounded-lg mainElementPdf"
            ref={pdfRef}
          >
            <div className="w-[90%] m-auto pt-10 pb-20">
              <div className="m-auto w-full flex flex-col">
                <div className="flex flex-col gap-1 text-center pb-16">
                  <h1 className="text-5xl font-bold">{quaText.title}</h1>
                  <h2 className="text-5xl font-medium">
                    {getCountry(countryForm)}
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
                        <td className="border px-4 py-2 font-bold">Nombre:</td>
                        <td className="border px-4 py-2 capitalize">
                          {userResponse.name} {userResponse.lastname}
                        </td>
                        <td className="border px-4 py-2 font-bold">
                          {quaText.countryOfOrigin}
                        </td>
                        <td className="border px-4 py-2">
                          {userResponse.country}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          {quaText.email}
                        </td>
                        <td className="border px-4 py-2" colSpan="3">
                          {userResponse.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          {quaText.phone}
                        </td>
                        <td className="border px-4 py-2" colSpan="3">
                          {userResponse.tel}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full flex flex-row gap-2 m-auto">
                <div className="flex flex-col w-full pt-12 pb-4">
                  <PieG correct={correctCountDP} incorrect={incorrectCountDP} />
                  <p className="text-center py-6">{quaText.personalData}</p>
                </div>
                <div className="flex flex-col w-full pt-12 pb-4">
                  <PieG
                    correct={correctCountAFF}
                    incorrect={incorrectCountAFF}
                  />
                  <p className="text-center py-6">
                    {quaText.familyAndFinancialTies}
                  </p>
                </div>
                <div className="flex flex-col w-full pt-12 pb-4">
                  <PieG correct={correctCountHV} incorrect={incorrectCountHV} />
                  <p className="text-center py-6">{quaText.travelHistory}</p>
                </div>
                <div className="flex flex-col w-full pt-12 pb-4">
                  <PieG correct={correctCountHD} incorrect={incorrectCountHD} />
                  <p className="text-center py-6">{quaText.criminalHistory}</p>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-black font-bold text-5xl pb-4 capitalize">
                  {quaText.overallResults}
                </h2>
                <p className="text-black text-4xl">
                  {quaText.totalScore}{" "}
                  <strong
                    className={`${qualification >= 60 ? "text-green-600" : "text-red-400"
                      } text-shadow`}
                  >
                    {qualification.toFixed(1)}
                  </strong>
                </p>
              </div>
              <div className="h-full w-full">
                <div className="w-full m-auto">
                  {qualification >= 60 ? (
                    <div className="flex flex-col gap-3 py-10 text-xl text-black">
                      <h2 className="text-center text-3xl pb-4 font-semibold">
                        {quaText.congratulations}
                      </h2>
                      <p className="text-justify">
                        {quaText.approvalMessage}{" "}
                        <strong>{qualification.toFixed(1)}</strong>.{" "}
                        {quaText.approvalMessage2}
                      </p>
                      <p className="text-justify">
                        {quaText.nextStep}
                        <strong>
                          <a
                            href={quaText.whatsappLink}
                            className="text-TVBlue hover:cursor-pointer"
                          >
                            {quaText.whatsappText}
                          </a>
                        </strong>
                        {quaText.guideMessage}
                      </p>
                      <p className="text-justify">
                        {quaText.guideConclusion}
                        <strong>
                          <a
                            href={quaText.whatsappLink}
                            className="text-TVBlue hover:cursor-pointer"
                          >
                            {quaText.whatsappText}
                          </a>
                        </strong>
                        {quaText.team}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-10 text-xl text-black">
                      <h2 className="text-center text-3xl pb-2 font-semibold">
                        {quaText.notApprovedTitle}
                      </h2>
                      <p className="text-justify">
                        {quaText.notApprovedMessage}{" "}
                        {qualification.toFixed(1)}, {quaText.notApprovedMessage2}
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
                        {recomendation(correctCountDP, incorrectCountDP, 'dh')}
                        {recomendation(correctCountAFF, incorrectCountAFF, 'aff')}
                        {recomendation(correctCountHV, incorrectCountHV, 'hv')}
                        {recomendation(correctCountHD, incorrectCountHD, 'hd')}
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
                onClick={() => navigateTo("/")}
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
        navigateTo("/")
      )}
    </>
  );
}
