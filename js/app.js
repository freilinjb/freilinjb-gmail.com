//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?',55);
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gastos');

//Classes
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);

    }
    //Metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= cantidad;
    }
}

//Clase interfaz maneja todo los relacionado al HTML
class Interfaz {
    insertarPresupuesto(cantidad) {

    const presupuestoSpan = document.querySelector('span#total');
    const restanteSpan = document.querySelector('span#restante');

    //Insertar al HTML
    presupuestoSpan.innerHTML = `RD$ ${cantidad}`;
    restanteSpan.innerHTML = `RD$ ${cantidad}`;

        
    }
}

//EventListener
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //Instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
});


formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //Leer del formulario de Gastos
    const gastoGasto = document.querySelector('#gastos').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    const ui = new Interfaz();

    if(gastoGasto === '' || cantidadGasto === '') {
        console.log('Hubo un error');
        
    } else {
        console.log('El gasto se agrego');
        
    }
    
});