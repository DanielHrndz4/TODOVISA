import Swal from 'sweetalert2';

const handleClickPopUpContact = (html, icon, btn) => {
    Swal.fire({
        html: html,
        icon: icon,
        confirmButtonText: btn,
        confirmButtonColor: '#B6122A'
    });
};

export default handleClickPopUpContact;
