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

                const fetchData = async () => {
                    try {
                        const response = await fetch(
                            "https://todovisa.onrender.com/api/vipro",
                            {
                                method: 'POST',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            }
                        );

                        if (response.ok) {
                            console.log(response);
                            const createForm = async (email, questions, selectedValue) => {
                                try {
                                    const response = await fetch('https://todovisa.onrender.com/api/vipro-eeuu', {
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
                                    window.location.href = '/';
                                }
                            };
                            
                            createForm(email, questions, selectedValue)
                        } else {
                            console.log(response);
                            window.location.href = `/`;
                        }
                    } catch (err) {
                        console.error(err);
                        window.location.href = `/`;
                    }
                };

                fetchData(); // Llama a fetchData directamente
            }
        }
    });
};

export default handleClickPopUpPay;