import Swal from 'sweetalert2';
import questions from '../../../assets/data/viproLang.data';
import Cookies from 'js-cookie';
import fetchData from '../../../assets/data/validation/token.validation';
import URI from '../../../assets/data/admin/uri.api';
import CryptoJS from 'crypto-js';
import { Button } from '@material-tailwind/react';
import { paymentDataForm } from '../../../assets/data/admin/payment.n1co';

function encodeBase64(value) {
    return btoa(value); // btoa() codifica una cadena en Base64
}

const handleClickPopUpPay = (html, btn, cancelButton) => {
    Swal.fire({
        html: html,
        showConfirmButton: true,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A',
        showCancelButton: cancelButton.show,
        cancelButtonColor: cancelButton.color,
        cancelButtonText: cancelButton.text
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            //<a href="/payment/${selectedValue}/${id}" target="_blank"></a>
            const swalPopup = (id, selectedValue) => {
                const callbackURL = `https://todovisa.com/payment/${selectedValue}/${id}`;
                Swal.fire({
                    width: 'auto',
                    html: `
                      <h1 class="pt-4 pb-6" style="font-size: 1.5rem; font-weight: 600;" className="font-semibold">Selecciona tu método de pago</h1>
                      <div class="w-full flex flex-col sm:flex-row justify-around gap-8 m-auto items-center">
                        <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
                          <p class="min-h-[100px] text-start max-w-full w-full mb-4">Perfecto para pagos con tarjetas Visa y MasterCard. Pagos rápidos y seguros.</p>
                          <a href="https://pay.n1co.shop/pl/${paymentDataForm.linkCode}?amount=${paymentDataForm.amount.form}&stay=${paymentDataForm.stay}&callbackurl=${encodeURIComponent(callbackURL)}" target="_blank">
                          <button class="shadowbtn bg-black w-[160px] py-3 px-2 rounded-md text-white hover:bg-gray-800 transition duration-300">N1CO</button>
                          </a>
                          <img src="./img/payment/visamastercard.png" class="h-[35px] w-auto mt-4" alt="Visa MasterCard"/>
                        </div>
                        <div class="flex flex-col justify-center items-center max-w-[300px] w-full p-4 border border-gray-300 rounded-lg shadow-lg">
                          <p class="min-h-[100px] text-start max-w-full w-full mb-4">Ideal para pagos con tarjetas American Express. Pagos rápidos y seguros. Puedes ver cómo realizar una compra con América Central 
                            <a href="/steps" target="_blank" class="text-TVred hover:cursor-pointer hover:underline">aquí</a>.
                          </p>
                          <a href="https://checkout.baccredomatic.com/YTc2NTA0NWU4YTgwZWQ1MDg5LjkxNzYxNzIxNjY1NDQ1" target="_blank">
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
            if (selectedOption) {
                const selectedValue = selectedOption.value;
                const user = Cookies.get('user');
                const userData = JSON.parse(user);
                const email = userData.email;
                const cookieJWT = Cookies.get('jwt');
                const validateJWT = async () => {
                    if (cookieJWT) {
                        const validation = await fetchData(cookieJWT);
                        if (validation) {
                            const createForm = async (email, questions, selectedValue) => {
                                try {
                                    const response = await fetch(`${URI}/vipro-eeuu`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ email, country: selectedValue, questions }),
                                    });

                                    if (!response.ok) {
                                        throw new Error('Error al guardar el formulario');
                                    }

                                    const data = await response.json();
                                    if (data.message === 'El usuario tiene un formulario pendiente por realizar') {
                                        window.location.href = `/vipro/${selectedValue}`;
                                    } else if (data.message === 'El usuario tiene un formulario terminado') {
                                        swalPopup(encodeBase64(data.id), encodeBase64(selectedValue));
                                    } else {
                                        swalPopup(encodeBase64(data.id), encodeBase64(selectedValue));
                                    }
                                } catch (error) {
                                    console.error('Error en la solicitud para guardar el formulario:', error);
                                    window.location.href = `/`;
                                }
                            };
                            createForm(email, questions, selectedValue);
                        } else {
                            window.location.href = `/`;
                        }
                    } else {
                        window.location.href = `/`;
                    }
                };
                validateJWT();
            }
        }
    });
};

export default handleClickPopUpPay;
