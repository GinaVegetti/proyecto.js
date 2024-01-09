// Variables
let doctores = [
    { id: 1, nombre: "Perez" },
    { id: 2, nombre: "Gomez" },
];
// Funciones relacionadas con doctores
function mostrarDoctores() {
    console.log("Listado de Doctores:");
    doctores.forEach(doctor => {
        console.log(`ID: ${doctor.id}, Nombre: ${doctor.nombre}`);
    });
}

function buscarDoctorPorNombre(nombre) {
    return doctores.find(doctor => doctor.nombre.toLowerCase() === nombre);
}

const nombreDoctorSeleccionado = prompt("Ingrese el apellido del doctor para confirmar seleccion:");
const doctorSeleccionado = buscarDoctorPorNombre(nombreDoctorSeleccionado);

if (doctorSeleccionado) {
    alert(`Doctor seleccionado: ${doctorSeleccionado.nombre}`);
} else {
    alert("Doctor no seleccionado");
}

// Funciones relacionadas con la reserva de turnos
function mostrarHorariosDisponibles(horarios) {
    alert("Horarios disponibles: " + horarios.join(", "));
}

function reservarTurno(horariosDisponibles) {
    let seleccion = prompt("Ingrese la hora que desea reservar (ejemplo: 10):");

    // Validar la entrada
    if (!seleccion) {
        alert("Ingresó un valor no válido. La reserva ha sido cancelada.");
        return;
    }

    let horaSeleccionada = parseInt(seleccion);

    // Validar que la hora ingresada sea un número y esté dentro del rango de horas disponibles
    if (isNaN(horaSeleccionada) || horaSeleccionada < 10 || horaSeleccionada > 14) {
        alert("La hora ingresada no es válida. La reserva ha sido cancelada.");
        return;
    }

    // Verificar si la hora está disponible
    let indice = horariosDisponibles.indexOf(horaSeleccionada);
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