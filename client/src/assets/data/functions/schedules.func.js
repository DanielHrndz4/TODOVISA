import Swal from "sweetalert2";
import URI from "../admin/uri.api";
import FRONT_URI from "../admin/uri.front";

export const horarios = async (date, dateNotValid) => {
  try {
    const response = await fetch(`${URI}/show_schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date }),
    });

    if (dateNotValid == "Sunday") {
      return ["No se encontraron horarios disponibles"];
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availableSchedules;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export const saveDataAppointment = async (infoUser) => {
  try {
    const response = await fetch(`${URI}/save_schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: infoUser.name,
        email: infoUser.email,
        tel: infoUser.tel,
        message: infoUser.messagge,
        date: infoUser.date,
        schedule: infoUser.schedule,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    if (data.appointmentsNotValid) {
      return false;
    }
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export const showSchedule = async (email) => {
  try {
    const response = await fetch(`${URI}/show_schedule_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!data.showData) {
      return { message: data.message, showData: false };
    }

    return { data: data.findUserSchedule, showData: true };
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return {
      message: "Ocurrió un error al obtener el horario.",
      showData: false,
    };
  }
};

export const deleteSchedule = async (id) => {
  console.log(id);
  try {
    Swal.fire({
      title: "Eliminar cita",
      text: "Seguro que quieres eliminar tu cita?",
      icon: "warning",
      confirmButtonColor: "#113E5F",
      cancelButtonColor: "#B6122A",
      confirmButtonText: "Borrar",
      showConfirmButton: true,
      cancelButtonText: "Cancelar",
      showCancelButton:true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const response = await fetch(`${URI}/delete_schedule`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();

        if (!data.deleteItem) {
          return false;
        }

        return window.location.href = FRONT_URI;
      }
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false; // Devuelve false en caso de error
  }
};
