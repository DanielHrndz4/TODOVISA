import moment from "moment";

export const validateDate = (dateSelectedValue) => {
  const today = moment();
  const dateSelected = moment(dateSelectedValue, "DD/MM/YYYY", true);

  if (!dateSelected.isValid()) {
    console.log("Invalid date format");
  }

  if (dateSelected.isBefore(today, "day")) {
    return false;
  }

  if (dateSelected.isAfter(today, "day")) {
    return true;
  }

  return true;
};

export const parseName = (key) => {
  switch (key) {
    case "name":
      return "Nombre".toLowerCase();
    case "email":
      return "Correo Electrónico".toLowerCase();
    case "tel":
      return "Teléfono".toLowerCase();
    case "date":
      return "Fecha".toLowerCase();
    case "schedule":
      return "Horario".toLowerCase();
    default:
      "";
  }
};

export const filteredArrayFunc = (objToArray)=>{
  return objToArray.filter(
    ([key, value]) => value === "" && key != "messagge"
  );
}

export const validateData = (infoUser) => {
  const objToArray = Object.entries(infoUser);

  const filteredArray = filteredArrayFunc(objToArray)

  const messages = filteredArray.map(([key]) => parseName(key)).join(", ");
  const completeMessage =
    messages.length > 0 ? `Los campos ${messages} son requeridos` : "";

  const messaggeResponse = completeMessage;

  return messaggeResponse;
};

export const popUpTextInfo = {
  "withSession":{
    title: "Confirmar tu Cita con Todovisa",
    paragraph: [
      "¿Estás seguro de que deseas guardar tu cita? Una vez que la confirmes, deberás asistir en la fecha y hora seleccionada.",
      "Si necesitas cancelar tu cita, por favor, comunícate con un asesor de Todovisa para asistir en el proceso de cancelación. Asegúrate de hacer esto con la mayor antelación posible para evitar inconvenientes."
    ]
  },
  "withoutSession":{
    title: "Inicia sesión para reservar tu cita con TODOVISA",
    paragraph:[
      "Para programar tu cita con Todovisa, por favor, inicia sesión en tu cuenta. Si aún no tienes una cuenta, puedes crear una fácilmente.",
      "Una vez que hayas iniciado sesión, podrás elegir la fecha y hora que más te convenga para tu cita. Asegúrate de tener toda la información necesaria a mano para completar el proceso de reserva sin inconvenientes."
    ]
  }
}

export const dataInizialization ={
  name: "",
  email: "",
  tel: "",
  messagge: "",
  date: moment().format("dddd Do MMMM YYYY"),
  schedule: "",
}