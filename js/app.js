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

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        // crea un div y le agrerga el mensaje 
        divMensaje.appendChild(document.createTextNode(mensaje));
        
        //Insertar en el DOM         ELEMENTOS QUE VAS A INSERTAR Y Y EL SEGUNDO ANTES DE DONDE 
        document.querySelector('.primario').insertBefore(divMensaje, formulario);


        //Quitar el alert despues de 3 segundos
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);

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
        // 2 marametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error','error');
        
    } else {
        ui.imprimirMensaje('Todo correcto','correcto');
        
    }
    
});