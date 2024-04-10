const form = document.getElementById('auditionForm');

form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/participants/register', {
        method: 'POST',
        body: data
    });
    if (response.ok) {
        window.location.replace('/finish')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'El email ingresado ya existe en otro participante. En el caso de que quieras modificar tus datos. Comunicate con nosotros en nuestras redes.'
        });
    };
});