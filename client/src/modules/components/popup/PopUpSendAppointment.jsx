import Swal from "sweetalert2";
import FRONT_URI from "../../../assets/data/admin/uri.front";

const handleClickSendAppointment = (html, icon, boolean, btn) => {
  Swal.fire({
    html: html,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: btn,
    confirmButtonColor: "#B6122A"
  }).then((res) => {
    if (res.isConfirmed) {
      if (boolean) {
        localStorage.setItem("showPopupAfterReload", "true");
        localStorage.removeItem("userInformation");
        window.location.reload();
      } else {
        window.location.href = 'http://localhost:5173' + "/signin";
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
