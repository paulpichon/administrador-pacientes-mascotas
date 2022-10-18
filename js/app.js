//variables
//inputs formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//formulario
const formulario = document.querySelector('#nueva-cita');
//variable que representa donde se iran renderizando las citas
const contenedorCitas = document.querySelector('#citas');


//eventListeners
eventListeners();
function eventListeners() {
    //listener a input nombre mascota
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
}
//creamos un objeto con la informacion de la cita
//estos son los NAME en el HTML de los input
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
//funcion para leer datos del input nombre mascota
//agrega datos al objeto de cita
function datosCita( e ) {
    //accedemos a las propiedades del objeto
    citaObj[ e.target.name ] = e.target.value;
    console.log( citaObj );
}