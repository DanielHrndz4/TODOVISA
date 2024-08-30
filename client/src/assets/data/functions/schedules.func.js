import URI from "../admin/uri.api";

export const horarios = async (date) => {
  try {
    const response = await fetch(`${URI}/show_schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date: date})
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availableSchedules
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

export const saveDataAppointment = async (infoUser) => {
  try {
    const response = await fetch(`${URI}/save_schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: infoUser.name, email: infoUser.email, tel: infoUser.tel, message: infoUser.messagge, date: infoUser.date, schedule: infoUser.schedule})
    });
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    if(data.appointmentsNotValid){
      return false
    }
    return data
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}