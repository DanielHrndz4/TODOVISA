import Swal from 'sweetalert2';

const handleClickPopUp = () => {
    Swal.fire({
        title: '<h1 class="text-Black">Términos y condiciones</h1>',
        html: '<div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae maiores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae maiores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.</div><p class="pt-4 font-bold w-full text-left">(Texto opcional)</p>',
        confirmButtonText: '¡Entendido!',
        confirmButtonColor: '#B6122A' 
    });
};

export default handleClickPopUp;
