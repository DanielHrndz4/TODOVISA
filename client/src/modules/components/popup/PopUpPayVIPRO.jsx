import Swal from 'sweetalert2';
import langVIPRO from '../../../assets/data/viproLang.data';
import Cookies from 'js-cookie';

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

                const fetchData = async () => {
                    try {
                        const response = await fetch(
                            "https://todovisa.onrender.com/api/vipro",
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Error al procesar la solicitud');
                        }

                        // Si llegamos aquí, la primera solicitud fue exitosa
                        console.log('Respuesta del servidor:', response);

                        const responseData = await response.json();

                        // Crear el formulario y redireccionar
                        const createForm = async (email, langVIPRO, selectedValue) => {
                            try {
                                const response = await fetch('https://todovisa.onrender.com/api/vipro-eeuu', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ email, langVIPRO }),
                                });

                                if (!response.ok) {
                                    throw new Error('Error al guardar el formulario');
                                }

                                console.log('Respuesta del servidor al guardar el formulario:', response);

                                // Redireccionar solo si se completó correctamente el formulario
                                window.location.href = `vipro/${selectedValue}`;
                            } catch (error) {
                                console.error('Error en la solicitud para guardar el formulario:', error);
                                window.location.href = `/`;
                            }
                        };

                        createForm(email, langVIPRO, selectedValue);
                    } catch (error) {
                        console.error('Error en la solicitud principal:', error);
                        window.location.href = `/`;
                    }
                };

                fetchData(); // Llama a fetchData directamente
            }
        }
    });
};

export default handleClickPopUpPay;
