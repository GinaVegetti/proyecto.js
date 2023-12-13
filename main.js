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
    if (horariosDisponibles.includes(horaSeleccionada)) {
        // Reservar el turno
        horariosDisponibles = horariosDisponibles.filter(hora => hora !== horaSeleccionada);
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
