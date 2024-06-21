import Swal from 'sweetalert2';

const handleClickPopUpSaveForm = (html, email, questions) => {
    Swal.fire({
        icon: 'warning',
        html: html,
        confirmButtonText: 'Aceptar!',
        confirmButtonColor: '#B6122A'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Guardando formulario',
                html: 'Por favor espera...',
                showConfirmButton: false,  
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });
            const saveForm = async (email, questions) =>{
                try {
                    const response = await fetch('http://localhost:3366/api/update-form-eeuu', {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ email, questions }),
                    });
              
                    if (!response.ok) {
                      throw new Error('Error al actualizar el formulario');
                    }
              
                    const responseData = await response.json();
                    console.log('Formulario actualizado:', responseData);
                    window.location.href = '/';
                  } catch (error) {
                    console.error('Error en la solicitud:', error);
                  }
            }
            saveForm(email, questions);
        }
    });
};

export default handleClickPopUpSaveForm;
