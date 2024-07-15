import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PieG from "../stats/PieG";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import URI from "../../../assets/data/admin/uri.api";

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
  const [correctCountDP, setCorrectCountDP] = useState(0);
  const [correctCountAFF, setCorrectCountAFF] = useState(0);
  const [correctCountHV, setCorrectCountHV] = useState(0);
  const [correctCountHD, setCorrectCountHD] = useState(0);
  const [incorrectCountDP, setIncorrectCountDP] = useState(0);
  const [incorrectCountAFF, setIncorrectCountAFF] = useState(0);
  const [incorrectCountHV, setIncorrectCountHV] = useState(0);
  const [incorrectCountHD, setIncorrectCountHD] = useState(0);
  const [qualification, setQualification] = useState(0);
  const [countryForm, setCountryForm] = useState("");
  const [dataQualifications, setDataQualifications] = useState();

  const pdfRef = useRef();

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
          setCountryForm(formResponse.country);
          setUserResponse(userInfo);
          setUserResponseData(userResponse.questions || []);
          setFormResponseData(formResponse.questions || []);

          //saveQualification();
        } else {
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

  const saveQualification = async () => {
    const lastname = userResponse.lastname !== undefined ? userResponse.lastname : "";
    const resultDataQualification = {
      name: userResponse.name + " " + lastname,
      email: userResponse.email,
      tel: userResponse.tel,
      user_country: userResponse.country,
      form_country: countryForm,
      response: [
        {
          dh: {
            correct: 0,
            incorrect: 0,
          },
          aff: {
            correct: 0,
            incorrect: 0,
          },
          hv: {
            correct: 0,
            incorrect: 0,
          },
          hd: {
            correct: 0,
            incorrect: 0,
          },
        },
      ],
      qualification: '90', // asegúrate de enviar la calificación como string
    };
  
    try {
      const response = await fetch(`${URI}/save_qualification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resultData: resultDataQualification, email: email })
      });
  
      const data = await response.json();
      console.log('Response from server:', data); // revisa la respuesta del servidor en la consola
  
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error al guardar la calificación: ', error);
    }
  };
  
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

  useEffect(() => {
    if (!loading) {
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
      mainElement.style.minWidth = "1700px";
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

  return (
    <>
      {!viproResult ? (
        <main className="min-w-[800px] min-h-[2000px] bg-TVBlue py-40 sm:py-10">
          <div
            className="w-[80%] m-auto h-full pt-24 pb-16 bg-white rounded-lg mainElementPdf"
            ref={pdfRef}
          >
            <div className="w-[80%] m-auto pt-10 pb-20">
              <div className="m-auto w-full flex flex-col">
                <div className="flex flex-col gap-1 text-center pb-16">
                  <h1 className="text-5xl font-bold">
                    Formulario de aprobación de Visa
                  </h1>
                  <h2 className="text-5xl font-medium">
                    {getCountry(countryForm)}
                  </h2>
                </div>
                <div className="gap-1">
                  <table className="w-full border-collapse rounded-md">
                    <thead className="border mx-4 my-2 font-bold">
                      <tr>
                        <th className="px-4 py-2" colSpan="4">
                          Datos del aplicante
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
                          País de origen:
                        </td>
                        <td className="border px-4 py-2">
                          {userResponse.country}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Correo:</td>
                        <td className="border px-4 py-2" colSpan="3">
                          {userResponse.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          Teléfono:
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
                <div className="flex flex-col w-full pt-20 pb-12">
                  <PieG correct={correctCountDP} incorrect={incorrectCountDP} />
                  <p className="text-center py-6">DATOS PERSONALES</p>
                </div>
                <div className="flex flex-col w-full pt-20 pb-12">
                  <PieG
                    correct={correctCountAFF}
                    incorrect={incorrectCountAFF}
                  />
                  <p className="text-center py-6">ARRAIGOS FAM. Y FINAN.</p>
                </div>
                <div className="flex flex-col w-full pt-20 pb-12">
                  <PieG correct={correctCountHV} incorrect={incorrectCountHV} />
                  <p className="text-center py-6">HISTORIAL DE VIAJES</p>
                </div>
                <div className="flex flex-col w-full pt-20 pb-12">
                  <PieG correct={correctCountHD} incorrect={incorrectCountHD} />
                  <p className="text-center py-6">HISTORIAL DELICTIVO</p>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-black font-bold text-5xl pb-4 capitalize">
                  Resultados generales
                </h2>
                <p className="text-black text-4xl">
                  Calificación total:{" "}
                  <strong
                    className={`${
                      qualification >= 60 ? "text-green-600" : "text-red-400"
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
                      <h2 className="text-center text-3xl pb-2 font-semibold">
                        ¡Felicidades!
                      </h2>
                      <p className="text-justify">
                        Has aprobado el formulario con una calificación total de{" "}
                        {qualification.toFixed(1)}. Todas tus respuestas han
                        sido evaluadas como correctas e incorrectas, lo que
                        determina tu puntaje para la prueba de visa.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-10 text-xl text-black">
                      <h2 className="text-center text-3xl pb-2 font-semibold">
                        No has aprobado esta vez
                      </h2>
                      <p className="text-justify">
                        El resultado total de tu formulario es{" "}
                        {qualification.toFixed(1)}, lo cual indica que no has
                        aprobado el formulario en esta ocasión. Las respuestas
                        correctas e incorrectas se utilizan para cuantificar tu
                        puntaje, determinando si pasas la prueba de visa o no.
                      </p>
                      <p>
                        ¡No te desanimes! Cada intento es una oportunidad para
                        aprender y mejorar.
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full m-auto">
                  <div className="text-justify flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Nota importante</h1>
                    <div className="flex flex-col gap-3">
                      <p className="text-xl">
                        Cada pregunta en el formulario tiene asignada una
                        ponderación específica, lo que implica que no todas las
                        respuestas tienen el mismo impacto en tu calificación
                        final. Es fundamental tener en cuenta esta variabilidad
                        al evaluar tus respuestas, ya que cada una contribuye de
                        manera única al puntaje global. Esta calificación final
                        es un criterio importante para determinar si cumples con
                        los requisitos necesarios para aprobar la prueba y
                        avanzar en el proceso de visa.
                      </p>
                      <p className="text-xl">
                        Es esencial recordar que, aunque esta calificación es
                        significativa, no garantiza automáticamente el éxito en
                        la entrevista oficial que forma parte del procedimiento
                        de visa. La entrevista evaluará aspectos adicionales,
                        como la veracidad de la información proporcionada, tu
                        capacidad para comunicarte eficazmente en el idioma
                        requerido, y otros criterios específicos según las
                        regulaciones del país solicitante.
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
                Descargar Comprobante
              </Button>
              <Button
                onClick={() => navigateTo("/")}
                className="bg-TVred shadowbtn"
                style={{ display: "block" }} // Asegúrate de que el botón esté visible por defecto
              >
                Regresar al inicio
              </Button>
            </div>
            <div
              id="paddingButton"
              className={`w-[80%] flex flex-row m-auto justify-center items-center gap-4 pb-4 pt-40`}
            >
              <img
                src="/img/logo/todovisa.png"
                className="w-[60px] h-[45px]"
                alt=""
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
