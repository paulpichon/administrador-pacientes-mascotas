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

//clase de citas
class Citas {
    constructor() {
        this.citas = [];
    }
}
//clase de UI
class UI {
    //no tiene constructor

    //metodo para imprimir alerta
    imprimirAlerta( mensaje, tipo ) {
        //crear el div
        const divMensaje = document.createElement('div');
        //clases
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        //agregar clase en base al tipo de error
        if ( tipo === 'error') {
            //clase de error
            divMensaje.classList.add('alert-danger');
        }else{
            //clase
            divMensaje.classList.add('success');
        }
        //agregar el mensaje
        divMensaje.textContent = mensaje;
        //renderizar-agregar al DOM
        document.querySelector('#contenido').insertBefore( divMensaje, document.querySelector('.agregar-cita'));
        //quitar alerta
        setTimeout(() => {
            //quitar alerta
            divMensaje.remove();
        }, 4000);
    }
}
//instanciar UI
const ui = new UI();
//instancias Citas
const administrarCitas = new Citas();

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
    //listener a formulario
    formulario.addEventListener('submit', nuevaCita );
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
}

//funcion para validar y agregar una nueva cita a la clase de citas
function nuevaCita( e ) {
    //prevenir la accion por defecto
    e.preventDefault();
    //extraer informacion del objeto de cita
    //destructuring
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    //validar
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        //mostrar alerta
        ui.imprimirAlerta('TODOS LOS CAMPOS SON OBLIGATORIOS', 'error');
        return;
    }
}