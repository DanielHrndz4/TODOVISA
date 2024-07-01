import Swal from 'sweetalert2';
import questions from '../../../assets/data/viproLang.data';
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
                        console.log(localStorage.getItem('lang'))
                        console.log(questions)
                        const createForm = async (email, questions, selectedValue) => {
                            try {
                                const response = await fetch('https://todovisa.onrender.com/api/vipro-eeuu', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ email, questions }),
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
                    } catch (error) {
                        console.error('Error en la solicitud principal:', error);
                        window.location.href = `/`;
                    }
                };

                fetchData(); 
            }
        }
    });
};

export default handleClickPopUpPay;
