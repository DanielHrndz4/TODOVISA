import Swal from "sweetalert2";
import URI from "../admin/uri.api";
import FRONT_URI from "../admin/uri.front";
import lang from "../lang.data";

const ap = lang[0].appointment;

export const horarios = async (date, dateNotValid) => {
  try {
    const response = await fetch(`${URI}/show_schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date }),
    });

    if (dateNotValid === "Sunday") {
      return [ap.noAvailableSchedules];
    }

    if (!response.ok) {
      throw new Error(`${ap.requestError} ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availableSchedules;
  } catch (error) {
    console.error(ap.requestError, error);
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
        message: infoUser.message,
        date: infoUser.date,
        schedule: infoUser.schedule,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${ap.requestError} ${response.status}: ${response.statusText}`);
    }
    if (data.appointmentsNotValid) {
      return false;
    }
    return data;
  } catch (error) {
    console.error(ap.requestError, error);
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
    console.error(ap.requestError, error);
    return {
      message: ap.errorFetchingSchedule,
      showData: false,
    };
  }
};

export const deleteSchedule = async (id) => {
  try {
    Swal.fire({
      title: ap.deleteAppointmentTitle,
      text: ap.deleteAppointmentText,
      icon: "warning",
      confirmButtonColor: "#113E5F",
      cancelButtonColor: "#B6122A",
      confirmButtonText: ap.deleteAppointmentConfirm,
      showConfirmButton: true,
      cancelButtonText: ap.deleteAppointmentCancel,
      showCancelButton: true,
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

        return (window.location.href = FRONT_URI);
      }
    });
  } catch (error) {
    console.error(ap.requestError, error);
    return false; // Devuelve false en caso de error
  }
};
