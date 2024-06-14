import Swal from 'sweetalert2';

const handleClickPopUpPay = (html, btn) => {
    Swal.fire({
        html: html,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A' 
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener el valor del radio button marcado
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                const selectedValue = selectedOption.value;
                window.location.href = `vipro/${selectedValue}`;
                
            }
        }
    });
};

export default handleClickPopUpPay;
