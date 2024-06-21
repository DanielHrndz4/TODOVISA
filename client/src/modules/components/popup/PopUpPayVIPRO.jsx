import Swal from 'sweetalert2';
import questions from '../../../assets/data/questions.data';

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
                const userFromStorage = JSON.parse(sessionStorage.getItem('user'));
                const email = userFromStorage.email;

                const createForm = async (email, questions, selectedValue) => {
                    try {
                        const response = await fetch('http://localhost:3366/api/vipro-eeuu', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, questions }),
                        });
                
                        if (!response.ok) {
                            throw new Error('Error al guardar el formulario');
                        }
                
                        const responseData = await response.json();
                        window.location.href = `vipro/${selectedValue}`;
                        console.log('Respuesta del servidor:', responseData);
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                        window.location.href = `/`;
                    }
                };
                
                createForm(email, questions, selectedValue)// Llama a fetchData directamente
            }
        }
    });
};

export default handleClickPopUpPay;
