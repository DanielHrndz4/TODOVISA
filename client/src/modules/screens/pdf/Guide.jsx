import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import fetchData from "../../../assets/data/validation/token.validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import lang from "../../../assets/data/lang.data";
import Loading from "../../components/loader/Loading";
import { Fade } from "react-awesome-reveal";

const Guide = () => {
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para el loading
  const navigateTo = useNavigate();
  const textButton = lang[0].guide.button;

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetchData(Cookies.get("jwt"));
      if (response) {
        setIsValidate(true);
      } else {
        navigateTo("/");
      }

      // Muestra el spinner de carga por 3 segundos antes de cambiar el estado
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    checkToken();
  }, [navigateTo]);

  return (
    <>
      {loading ? (
        <Loading></Loading> // Muestra el componente de carga mientras se valida el token
      ) : (
        <>
          {isValidate ? (
            <Fade triggerOnce>
              <div className="relative">
                <div className="fixed bottom-0 right-0 text-black px-4 py-4 w-full text-center">
                  <div>
                    <Button
                      className="py-4 px-6 rounded-md shadowbtn bg-TVred"
                      onClick={() =>
                        window.open(
                          "https://checkout.baccredomatic.com/Njc4My45NjMyZTg2OTQ2NzNmMTA0N2UxNzIxNjY1NzY3",
                          "_blank" // Corregido a "_blank" para abrir en una nueva pestaña
                        )
                      }
                    >
                      {textButton}
                    </Button>
                  </div>
                </div>
                <LoginUserNavbar />
                <div className="w-full h-full pt-[120px] lg:pt-[130px] bg-[#fafafa]">
                  <div className="flex flex-col justify-center items-center">
                    <p className="py-1 my-3 px-4 rounded-md bg-gray-400 font-medium">
                      <strong>1</strong>/32
                    </p>
                    <img
                      src="./img/pdf/portada.jpg"
                      alt="Portada"
                      className="max-w-[816px] w-full max-h-[1056px] h-full mb-3 shadowbtn"
                    />
                    <img
                      src="./img/pdf/page.jpg"
                      alt="Página"
                      className="max-w-[816px] w-full max-h-[1056px] h-full my-3 shadowbtn"
                    />
                  </div>
                </div>
              </div>
            </Fade>
          ) : null}
        </>
      )}
    </>
  );
};

export default Guide;
