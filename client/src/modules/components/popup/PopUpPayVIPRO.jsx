import Swal from 'sweetalert2';
import questions from '../../../assets/data/viproLang.data';
import Cookies from 'js-cookie';
import fetchData from '../../../assets/data/validation/token.validation';
import URI from '../../../assets/data/admin/uri.api';

const handleClickPopUpPay = (html, btn) => {
    Swal.fire({
        html: html,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A'
    }).then((result) => {
        if (result.isConfirmed) {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                const selectedValue = selectedOption.value;
                const user = Cookies.get('user');
                const userData = JSON.parse(user);
                const email = userData.email;
                const cookieJWT = Cookies.get('jwt')
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

                                    console.log('Respuesta del servidor al guardar el formulario:', response);
                                    window.location.href = `vipro/${selectedValue}`;
                                } catch (error) {
                                    console.error('Error en la solicitud para guardar el formulario:', error);
                                    window.location.href = `/`;
                                }
                            };
                            createForm(email, questions, selectedValue);
                        } else {
                            window.location.href = `/`;
                        }
                    }else{
                        window.location.href = `/`;
                    }
                };
                validateJWT();
            }
        }
    });
};

export default handleClickPopUpPay;
