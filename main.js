let boton = document.getElementById("boton");
boton.addEventListener("click", mostrarDoctoresEnDOM);

let doctores = [
    {
        id: 1,
        nombre: "Dr. Perez",
        especialidad: "Clínica General",
        descripcion: "Médico con amplia experiencia en atención general.",
        imagen: "./img/perez.jpg"
    },
    {
        id: 2,
        nombre: "Dra. Gomez",
        especialidad: "Pediatría",
        descripcion: "Especialista en cuidado infantil.",
        imagen: "./img/gomez.jpg"
    },
];

let horariosDisponibles = [10, 11, 12, 13, 14];
const resultadosElement = document.getElementById("resultados");
let doctorSeleccionado = null;

function mostrarHorariosDisponiblesEnDOM() {
    resultadosElement.innerHTML = "Horarios disponibles: " + horariosDisponibles.join(", ");
}

function mostrarDoctoresEnDOM() {
    boton.style.display = 'none';

    doctores.forEach(doctor => {
        resultadosElement.innerHTML += `
            <div class="ficha-doctor">
                <img src="${doctor.imagen}" alt="${doctor.nombre}">
                <h3>${doctor.nombre}</h3>
                <p>${doctor.especialidad}</p>
                <p>${doctor.descripcion}</p>
                <button onclick="elegirDoctor(${doctor.id})">Seleccionar ${doctor.nombre}</button>
            </div>
        `;
    });
}

function mostrarResultadoEnDOM(resultado) {
    resultadosElement.innerHTML = resultado;
}

function elegirDoctor(doctorId) {
    doctorSeleccionado = doctores.find(doctor => doctor.id === doctorId);

    mostrarHorariosDisponiblesEnDOM();

    resultadosElement.innerHTML += `<br>Seleccione un horario: <select id="selectHorario"></select>`;
    const selectHorario = document.getElementById("selectHorario");

    horariosDisponibles.forEach(horario => {
        const option = document.createElement("option");
        option.value = horario;
        option.textContent = `${horario}:00 horas`;
        selectHorario.appendChild(option);
    });

    resultadosElement.innerHTML += `<br><button onclick="reservarTurnoEnDOM()">Reservar Turno</button>`;
}

function reservarTurnoEnDOM() {
    const selectHorario = document.getElementById("selectHorario");
    const horaSeleccionada = parseInt(selectHorario.value);

    if (doctorSeleccionado) {
        const doctorSeleccionadoIndex = doctores.findIndex(doctor => doctor.id === doctorSeleccionado.id);
        doctores.splice(doctorSeleccionadoIndex, 1);

        const horarioIndex = horariosDisponibles.indexOf(horaSeleccionada);
        horariosDisponibles.splice(horarioIndex, 1);

        const mensaje = `Turno reservado para las ${horaSeleccionada}:00 horas, con ${doctorSeleccionado.nombre}`;

        Swal.fire({
            title: '¡Reserva Confirmada!',
            text: mensaje,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ir a reservas',
            cancelButtonText: 'Seguir reservando'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./pages/reservas.html";
            } else {

            }
        });

        mostrarHorariosDisponiblesEnDOM();

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({ doctor: doctorSeleccionado.nombre, hora: horaSeleccionada });
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        mostrarResultadoEnDOM("Error: Seleccione un doctor antes de reservar.");
    }
}

function realizarReserva() {
    mostrarDoctoresEnDOM();

    window.location.href = "./pages/reservas.html";
}