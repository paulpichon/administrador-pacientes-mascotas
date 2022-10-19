import { datosCita, nuevaCita } from "../funciones.js";
import { mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario } 
    from "../selectores.js";

class App {

    constructor() {
        this.initApp(); 
    }
    initApp() {
        //listener a input nombre mascota
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);
        //listener a formulario para nuevas citas
        formulario.addEventListener('submit', nuevaCita );
    }
}
export default App;