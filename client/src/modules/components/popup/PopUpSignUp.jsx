import Swal from 'sweetalert2';

const handleClickPopUpSignUp = (icon, html,btn) => {
    Swal.fire({
        icon: icon,
        html: html,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A' 
    });
};

export default handleClickPopUpSignUp;
