import Swal from 'sweetalert2';

const handleClickPopUp = (html,btn) => {
    Swal.fire({
        html: html,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A' 
    });
};

export default handleClickPopUp;
