import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import fetchData from "../../../assets/data/validation/token.validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import lang from "../../../assets/data/lang.data";
import Loading from "../../components/loader/Loading";
import { Fade } from "react-awesome-reveal";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import { paymentDataGuide } from "../../../assets/data/admin/payment.n1co";

const Guide = () => {
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para el loading
  const navigateTo = useNavigate();
  const textButton = lang[0].guide.button;
  const user = Cookies.get('user');
  const userData = JSON.parse(user)
  const email = userData.email
  const langPay = lang[0].payBtn

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

  function encodeBase64(value) {
    return btoa(value); // btoa() codifica una cadena en Base64
  }

  const swalPopup = (email) => {
    const callbackURL = `https://todovisa.com/payment/guide/${email}`;
    Swal.fire({
      width: 'auto',
      html: `
          <h1 class="pt-4 pb-6" style="font-size: 1.5rem; font-weight: 600;" className="font-semibold">${langPay.payMethod}</h1>
          <div class="w-full flex flex-col sm:flex-row justify-around gap-8 m-auto items-center">
            <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
              <p class="min-h-[130px] text-start max-w-full w-full mb-4">${langPay.payN1co}</p>
              <a href="https://pay.n1co.shop/pl/${paymentDataGuide.linkCode}?amount=${paymentDataGuide.amount}&stay=${paymentDataGuide.stay}&callbackurl=${encodeURIComponent(callbackURL)}" target="_blank">
              <button class="shadowbtn bg-black w-[160px] py-3 px-2 rounded-md text-white hover:bg-gray-800 transition duration-300">N1CO</button>
              </a>
              <img src="./img/payment/visamastercard.png" class="h-[35px] w-auto mt-4" alt="Visa MasterCard"/>
            </div>
            <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
              <p class="min-h-[130px] text-start max-w-full w-full mb-4">${langPay.payAMC}
                <a href="/steps" target="_blank" class="text-TVred hover:cursor-pointer hover:underline">${langPay
          .paySteps
        }</a>.
              </p>
              <a href="https://checkout.baccredomatic.com/Njc4My45NjMyZTg2OTQ2NzNmMTA0N2UxNzIxNjY1NzY3" target="_blank">
              <button class="shadowbtn bg-TVred w-[160px] py-3 px-2 rounded-md text-white hover:bg-red-600 transition duration-300">América Central</button>
              </a>
              <div class="flex flex-row mt-4 space-x-2">
                <img src="./img/payment/visamastercard.png" class="h-[35px] w-auto" alt="Visa MasterCard"/>
                <img src="./img/payment/amexpress.png" class="h-[35px] w-auto" alt="American Express"/>
              </div>
            </div>
          </div>`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#113e5f',
      cancelButtonText: langPay.button
    });
  }

  return (
    <>
      {loading ? (
        <Loading></Loading> // Muestra el componente de carga mientras se valida el token
      ) : (
        <>
          {isValidate ? (
            <Fade triggerOnce>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Todovisa - Guía Completa para Obtener tu Visa</title>
                <meta name="description" content="Descubre nuestra guía completa en Todovisa para obtener tu visa. Explora pasos detallados, consejos útiles y recursos exclusivos para facilitar tu proceso de solicitud de visa." />
                <meta name="keywords" content="guía de visa, Todovisa, obtener visa, solicitud de visa, pasos para visa, consejos de visa, recursos de visa" />
                <meta property="og:title" content="Todovisa - Guía Completa para Obtener tu Visa" />
                <meta property="og:description" content="Descubre nuestra guía completa en Todovisa para obtener tu visa. Explora pasos detallados, consejos útiles y recursos exclusivos para facilitar tu proceso de solicitud de visa." />
                <meta property="og:image" content="https://todovisa.com/img/logo/todovisaLogo.jpg" />
                <meta property="og:url" content="https://todovisa.com/guide" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Todovisa - Guía Completa para Obtener tu Visa" />
                <meta name="twitter:description" content="Descubre nuestra guía completa en Todovisa para obtener tu visa. Explora pasos detallados, consejos útiles y recursos exclusivos para facilitar tu proceso de solicitud de visa." />
                <meta name="twitter:image" content="https://todovisa.com/img/logo/todovisaLogo.jpg" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://todovisa.com/guide" />
              </Helmet>
              <div className="relative">
                <div className="fixed bottom-0 right-0 text-black px-4 py-4 w-full text-center">
                  <div>
                    <Button
                      className="py-4 px-6 rounded-md shadowbtn bg-TVred"
                      onClick={() => swalPopup(encodeBase64(email))}
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
