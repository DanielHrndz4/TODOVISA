import Swal from "sweetalert2";
import FRONT_URI from "../../../assets/data/admin/uri.front";
import { saveDataAppointment } from "../../../assets/data/functions/schedules.func";
import lang from "../../../assets/data/lang.data";

// Obtener los textos de la sección de citas
const ap = lang[0].appointment;

const handleClickSendAppointment = (html, icon, boolean, btn, infoUser) => {
  Swal.fire({
    html: html,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: btn,
    confirmButtonColor: "#B6122A",
  }).then(async (res) => {
    if (res.isConfirmed) {
      if (boolean) {
        const userAppointment = await saveDataAppointment(infoUser);
        if (!userAppointment) {
          Swal.fire({
            title: ap.noMoreAppointmentsTitle, // Actualiza el texto aquí
            text: ap.noMoreAppointmentsText,  // Actualiza el texto aquí
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: ap.acceptButton, // Actualiza el texto aquí
            confirmButtonColor: "#B6122A",
          });
        } else {
          localStorage.setItem("showPopupAfterReload", "true");
          localStorage.removeItem("userInformation");
          window.location.reload();
        }
      } else {
        window.location.href = FRONT_URI + "/signin";
      }
    }
  });
};

const checkAndShowPopup = () => {
  const showPopup = localStorage.getItem("showPopupAfterReload");
  if (showPopup === "true") {
    Swal.fire({
      position: "center",
      icon: "success",
      title: ap.alertSuccessMessage, // Actualiza el texto aquí
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.removeItem("showPopupAfterReload");
  }
};

checkAndShowPopup();

export default handleClickSendAppointment;
