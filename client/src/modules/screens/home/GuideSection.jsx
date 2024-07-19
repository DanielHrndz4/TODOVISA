import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import URI from "../../../assets/data/admin/uri.api";
import { Fade, Slide } from "react-awesome-reveal";
import fetchData from "../../../assets/data/validation/token.validation";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data";

const GuideSection = () => {
  const texts = lang[0].guide_section;
  const [isValidateDownload, setIsValidateDownload] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetchData(Cookies.get("jwt"));
      if (response) {
        setButtonActive(true);
      }
    };
    checkToken();
  }, []);

  const handleClickPopUpButton = () => {
    const popupWithoutLogin = texts.popupWithoutLogin;
    const html = `
        <div id="popupContainer" class="popup-container">
            <div class="w-full">
                <h2 class="pt-2 pb-2" style="font-size: 3rem; font-weight: 600;" className="font-semibold">${popupWithoutLogin.title}</h2>
                <p class="text-center pt-2">${popupWithoutLogin.description}</p>
            </div>
        </div>
    `;
    const btn = popupWithoutLogin.button;
    handleClickPopUpSignUp("error", html, btn);
  };

  useEffect(() => {
    const validatePDF = async () => {
      if (Cookies.get("jwt")) {
        const userEmail = Cookies.get("user");
        const userDataEmail = JSON.parse(userEmail);
        const email = userDataEmail.email;
        try {
          const response = await fetch(`${URI}/validate_pdf`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (response.ok) {
            setIsValidateDownload(true);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    validatePDF();
  }, []);

  const downloadPdf = () => {
    const pdfPath = texts.pdfPath
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "GUIA_TODOVISA.pdf";
    link.click();
  };

  return (
    <div
      className="relative text-center w-full m-auto py-8 bg-white shadowbtn"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 z-0"></div>
      <div className="relative z-10 text-center xl:w-[85%] w-full lg:px-14 sm:px-20 px-6 m-auto">
        <Fade>
          <h2 className="text-xl lg:text-lg xl:text-2xl text-TVBlue">
            {texts.header}
          </h2>
          <p className="text-justify lg:text-md xl:text-lg text-black pt-6">
            {texts.description}
          </p>
        </Fade>
        <img src="/img/VIPRO/theline.png" alt="" className="py-5" />
        <div className="flex justify-center items-center">
          {buttonActive ? (
            isValidateDownload ? (
              <Slide>
                <Button
                  className="py-4 px-6 rounded-sm shadowbtn bg-TVred"
                  onClick={downloadPdf}
                >
                  {texts.downloadPdfButton}
                </Button>
              </Slide>
            ) : (
              <Slide>
                <Button
                  className="py-4 px-10 rounded-sm shadowbtn bg-TVred"
                  onClick={() => window.open("/guide", "_black")}
                >
                  {texts.viewPdfButton}
                </Button>
              </Slide>
            )
          ) : (
            <Slide>
              <Button
                className="py-4 px-10 rounded-sm shadowbtn bg-TVred"
                onClick={handleClickPopUpButton}
              >
                {texts.viewPdfButton}
              </Button>
            </Slide>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideSection;
