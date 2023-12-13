
// Variables globales
let horariosDisponibles = [10, 11, 12, 13, 14]; // Ejemplo de horarios disponibles
let horariosOcupados = [];
let contador = 0;

function reservarTurno(hora) {
    // Verificar si la hora está disponible
    if (horariosDisponibles.includes(hora)) {
        // Reservar el turno
        horariosOcupados.push(hora);
        // Actualizar horarios disponibles
        horariosDisponibles = horariosDisponibles.filter(h => h !== hora);
        console.log(`Turno reservado para las ${hora} horas.`);
    } else {
        console.log(`La ${hora} horas no está disponible.`);
    }
}

function mostrarHorarios() {
    console.log("Horarios disponibles: " + horariosDisponibles.join(", "));
    console.log("Horarios ocupados: " + horariosOcupados.join(", "));
}

// Simular reservas
reservarTurno(11);
reservarTurno(13);
reservarTurno(14);

// Mostrar horarios después de las reservas
mostrarHorarios();
