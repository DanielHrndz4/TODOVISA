import Swal from 'sweetalert2';
import lang from '../../../assets/data/lang.data';

const popupReferrer = lang[0].popupReferrer

const handleClickPopUpReferrer = () => {
    Swal.fire({
        icon: "info",
        title: popupReferrer.title,
        text: popupReferrer.text,
        confirmButtonText: popupReferrer.button,
        confirmButtonColor: '#B6122A'
    });
};

export default handleClickPopUpReferrer;
