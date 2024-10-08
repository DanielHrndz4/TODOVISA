import Swal from "sweetalert2";
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";

const buttonText = lang[0].form;
const handleClickPopUpSaveForm = (html, email, questions, country) => {
  Swal.fire({
    icon: "warning",
    html: html,
    confirmButtonText: buttonText.button,
    confirmButtonColor: "#B6122A",
    showCancelButton: true,
    cancelButtonText: buttonText.button2,
    cancelButtonColor: "#113E5F",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: buttonText.save,
        html: buttonText.wait,
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const isFinish = false
      const saveForm = async (email, questions, country, isFinish) => {
        try {
          const response = await fetch(`${URI}/update-form-eeuu`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, questions, country, isFinish }),
          });

          if (!response.ok) {
            throw new Error("Error al actualizar el formulario");
          }

          window.location.href = "/";
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      };
      saveForm(email, questions, country, isFinish);
    }
  });
};

export default handleClickPopUpSaveForm;
