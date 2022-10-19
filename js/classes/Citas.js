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

//export default
export default Citas;