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
    console.log(data.availableSchedules);
    return data.availableSchedules
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
