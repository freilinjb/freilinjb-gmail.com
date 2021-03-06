//Variables globales
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

    //Inserta los gastos a la lista
    agrgarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');

        //Creando LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill">  $ ${cantidad}</span>
        `;

        //Insertar al HTML
        gastosListado.appendChild(li); 
    }
    //Comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        // console.log(`Cantidad presupuesto: ${cantidad}`);
        const restante = document.querySelector('span#restante ');
        
        //Leemos el presupuesto restante

        const presupuestoRestante = cantidadPresupuesto.presupuestoRestante(cantidad);

        // console.log(`presupuesto Restante: ${presupuestoRestante}`);
        restante.innerHTML = `${presupuestoRestante}`;
 
        this.comprobarPresupueso();
        
     }

     comprobarPresupueso() {
        //  console.log(cantidadPresupuesto);
         const presupuestoTotal = cantidadPresupuesto.presupuesto;
         const presupuestoRestante = cantidadPresupuesto.restante;

         //Comprobar el 25% del gasto
        if((presupuestoTotal/4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');

        } else  if((presupuestoTotal/2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-warning');
        }
     }
     ///Cambiar de color el presupuesto restante
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
    const gastoGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    const ui = new Interfaz();

    if(gastoGasto === '' || cantidadGasto === '') {
        // 2 marametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error','error');
        
    } else {

        // ui.imprimirMensaje('Correcto','correcto');
        ui.agrgarGastoListado(gastoGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
        
    }
    
});