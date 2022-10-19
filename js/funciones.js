import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import { mascotaInput, 
        propietarioInput, 
        telefonoInput, 
        fechaInput, 
        horaInput, 
        sintomasInput, 
        formulario } 
        from "./selectores.js";

//instanciar UI
const ui = new UI();
//instancias Citas
const administrarCitas = new Citas();


//variable para cuando se este en el modo EDICION
let editando;

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
export function datosCita( e ) {
    //accedemos a las propiedades del objeto
    citaObj[ e.target.name ] = e.target.value;
}


//funcion para validar y agregar una nueva cita a la clase de citas
export function nuevaCita( e ) {
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

    //editando
    if ( editando ) {
        //mensaje de editado correctamente
        ui.imprimirAlerta('EDITADO CORRECTAMENTE');
        
        //pasar el objeto de la cita a edicion
        //se pasa una copia de citaObj
        administrarCitas.editarCita( { ...citaObj } );

        //cambiar el texto a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        //deshabilitar el modo edicion
        editando = false;

    }else{
        //cuando es una nueva cita
        //crear un ID unico para cada cita
        citaObj.id = Date.now();
        //agregar una nueva  cita
        //pasamos una copia del objeto citaObj
        //si pasamos citaObj directamente nos crearias duplicados a la hora de agregar cita
        administrarCitas.agregarCita({ ...citaObj });
        //mensaje de agregado correectamente
        ui.imprimirAlerta('SE AGREGO CORRECTAMENTE');
    }

    
    //reinicar el objeto para la validacin
    reiniciarObjeto();
    //resetear el formulario
    formulario.reset();

    //imprimir citas
    //mostrar el HTML de las citas
    ui.imprimirCitas( administrarCitas );
    
}
//funcion para reiniciar citaObj
export function reiniciarObjeto() {
    //reiniciar las propiedades del objeto
    citaObj.mascota =  '';
    citaObj.propietario =  '';
    citaObj.telefono =  '';
    citaObj.fecha =  '';
    citaObj.hora =  '';
    citaObj.sintomas =  '';
}
//funcion para eliminar citas
export function eliminarCita( id ) {
    //eliminar la cita
    administrarCitas.eliminarCitas( id );

    //muestre un mensaje
    //AL SER UN MENSAJE DE EXITO NO ES NECESARIO MANDAR EL SEGUNDO ARGUMENTO
    ui.imprimirAlerta('CITA ELIMINADA CON EXITO');

    //refrescar las citas
    ui.imprimirCitas( administrarCitas );

}
//carga los datos y el modo edicion
export function cargarEdicion( cita ) {
    //destructuring de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //llnear los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    //poner como booleano a let editando;
    editando = true;
}