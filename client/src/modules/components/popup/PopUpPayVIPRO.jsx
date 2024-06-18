import Swal from 'sweetalert2';

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
                            "http://localhost:3366/api/vipro",
                            {
                                method: 'POST',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            }
                        );

                        if (response.ok) {
                            console.log(response);
                            window.location.href = `vipro/${selectedValue}`;
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
