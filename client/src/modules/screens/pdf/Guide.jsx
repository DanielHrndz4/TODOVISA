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

const Guide = () => {
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para el loading
  const navigateTo = useNavigate();
  const textButton = lang[0].guide.button;
  const user = Cookies.get('user');
  const userData = JSON.parse(user)
  const email = userData.email

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
    Swal.fire({
        width: 'auto',
        html: `
          <h1 class="pt-4 pb-6" style="font-size: 1.5rem; font-weight: 600;" className="font-semibold">Selecciona tu método de pago</h1>
          <div class="w-full flex flex-col sm:flex-row justify-around gap-8 m-auto items-center">
            <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
              <p class="min-h-[100px] text-start max-w-full w-full mb-4">Perfecto para pagos con tarjetas Visa y MasterCard. Pagos rápidos y seguros.</p>
              <a href="/payment/guide/${email}" target="_blank">
              <button class="shadowbtn bg-black w-[160px] py-3 px-2 rounded-md text-white hover:bg-gray-800 transition duration-300">N1CO</button>
              </a>
              <img src="./img/payment/visamastercard.png" class="h-[35px] w-auto mt-4" alt="Visa MasterCard"/>
            </div>
            <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
              <p class="min-h-[100px] text-start max-w-full w-full mb-4">Ideal para pagos con tarjetas American Express. Pagos rápidos y seguros. Puedes ver cómo realizar una compra con América Central 
                <a href="/steps" target="_blank" class="text-TVred hover:cursor-pointer hover:underline">aquí</a>.
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
        cancelButtonText: "Cancelar"
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
