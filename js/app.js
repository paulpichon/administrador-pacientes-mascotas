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

//variable para cuando se este en el modo EDICION
let editando;

//clase de citas
class Citas {
    constructor() {
        this.citas = [];
    }

    //Agregar cita
    agregarCita( cita ) {
        //creamos una copia de ...this.cita y le añadimos la cita
        this.citas = [ ...this.citas, cita ];
        
        //console.log( this.citas );
    }
    //eliminar citas
    eliminarCitas( id ) {
        this.citas = this.citas.filter( cita => cita.id !== id );
        //console.log( this.citas );
    }
    //editar cita
    editarCita( citaActualizada ) {
        //en caso de que si haya coincidencia con algun id el nuevo arreglo seria citaActualizada de lo contrario seria cita
        //  citaActualizada || cita
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
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
            divMensaje.classList.add('alert-success');
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

    //mostrar citas en el html
    //hacemos destructuring desde el parametro del metodo
    imprimirCitas( {citas} ) {
        //limpiar el html anterior
        this.limpiarHTML();
        //recorremos el arreglo
        citas.forEach( cita => {
            //destructuring
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            //crear el html
            const divCita = document.createElement('div');
            //agregar clases
            divCita.classList.add('cita', 'p-3');
            //agregar atributo ID 
            divCita.dataset.uid = id;

            //scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            //clases
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            //texcontent
            mascotaParrafo.textContent = mascota;

            //scripting propietario
            const propietarioParrafo = document.createElement('p');
            //texcontent
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>  ${propietario}
            `;

            //scripting telefono
            const telefonoParrafo = document.createElement('p');
            //texcontent
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span>  ${telefono}
            `;
            
            //scripting fecha
            const fechaParrafo = document.createElement('p');
            //texcontent
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>  ${fecha}
            `;
            
            //scripting hora
            const horaParrafo = document.createElement('p');
            //texcontent
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>  ${hora}
            `;
            //scripting sintomas
            const sintomasParrafo = document.createElement('p');
            //texcontent
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span>  ${sintomas}
            `;

            ///boton para eliminar cita
            const btnEliminar = document.createElement('button');
            //classes
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            //innerhtml
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `;
            //añadir un boton para editar un boton
            const btnEditar = document.createElement('button');
            //añadir clase
            btnEditar.classList.add('btn', 'btn-info');
            //innerhtml
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            `;
            //onclick
            btnEditar.onclick = () => {
                //editar
                cargarEdicion( cita );
            }
            

            //funcion para borrar cita al hacer click
            btnEliminar.onclick = () => eliminarCita( id );

            //agregar los parrafos al divCita: mascota
            divCita.appendChild( mascotaParrafo );
            //agregar los parrafos al divCita: propietario
            divCita.appendChild( propietarioParrafo );
            //agregar los parrafos al divCita: telefono
            divCita.appendChild( telefonoParrafo );
            //agregar los parrafos al divCita: fecha
            divCita.appendChild( fechaParrafo );
            //agregar los parrafos al divCita: hora
            divCita.appendChild( horaParrafo );
            //agregar los parrafos al divCita: sintomas
            divCita.appendChild( sintomasParrafo );

            //agregar el boton para eliminar cita a divCita
            divCita.appendChild( btnEliminar );
            
            //agregar el boton para editar cita a divCita
            divCita.appendChild( btnEditar );


            //renderizar-agregar las citas al HTML
            contenedorCitas.appendChild( divCita );

        });
    }
    //limpiar el html anterior
    limpiarHTML() {
        while ( contenedorCitas.firstChild ) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }
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
function reiniciarObjeto() {
    //reiniciar las propiedades del objeto
    citaObj.mascota =  '';
    citaObj.propietario =  '';
    citaObj.telefono =  '';
    citaObj.fecha =  '';
    citaObj.hora =  '';
    citaObj.sintomas =  '';
}
//funcion para eliminar citas
function eliminarCita( id ) {
    //eliminar la cita
    administrarCitas.eliminarCitas( id );

    //muestre un mensaje
    //AL SER UN MENSAJE DE EXITO NO ES NECESARIO MANDAR EL SEGUNDO ARGUMENTO
    ui.imprimirAlerta('CITA ELIMINADA CON EXITO');

    //refrescar las citas
    ui.imprimirCitas( administrarCitas );

}
//carga los datos y el modo edicion
function cargarEdicion( cita ) {
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