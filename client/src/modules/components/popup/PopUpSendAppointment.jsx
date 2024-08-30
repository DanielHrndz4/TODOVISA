import Swal from "sweetalert2";
import FRONT_URI from "../../../assets/data/admin/uri.front";
import { saveDataAppointment } from "../../../assets/data/functions/schedules.func";

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
            title: "No puedes agendar mas citas",
            text: "Ya tienes dos citas activas, elimina una cita para agregar otra nueva",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
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
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.removeItem("showPopupAfterReload");
  }
};

checkAndShowPopup();

export default handleClickSendAppointment;
