// reservaTurnos.js
function mostrarHorariosDisponibles(horarios) {
    console.log("Horarios disponibles: " + horarios.join(", "));
}

function reservarTurno(horariosDisponibles) {
    let seleccion = prompt("Ingrese la hora que desea reservar (ejemplo: 10):");
    
    // Validar la entrada
    if (!seleccion) {
        alert("Ingresó un valor no válido. La reserva ha sido cancelada.");
        return;
    }

    let horaSeleccionada = parseInt(seleccion);

    // Verificar si la hora está disponible
    let indice = -1;
    for (let i = 0; i < horariosDisponibles.length; i++) {
        if (horariosDisponibles[i] === horaSeleccionada) {
            indice = i;
            break;
        }
    }

    if (indice !== -1) {
        // Reservar el turno
        horariosDisponibles.splice(indice, 1);
        alert(`Turno reservado para las ${horaSeleccionada}:00 horas.`);
    } else {
        alert(`La ${horaSeleccionada}:00 horas no está disponible.`);
    }

    // Mostrar horarios actualizados
    mostrarHorariosDisponibles(horariosDisponibles);
}

function realizarReserva() {
    // Horarios disponibles inicialmente
    let horariosDisponibles = [10, 11, 12, 13, 14];

    // Mostrar horarios disponibles al inicio
    mostrarHorariosDisponibles(horariosDisponibles);

    // Realizar reserva
    reservarTurno(horariosDisponibles);
}
