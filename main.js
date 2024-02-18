let boton = document.getElementById("boton");
boton.addEventListener("click", cargarDoctores);

let horariosDisponibles = [10, 11, 12, 13, 14, 15];
const resultadosElement = document.getElementById("resultados");
let doctorSeleccionado = null;
let doctores = null;

function mostrarHorariosDisponiblesEnDOM() {
    resultadosElement.innerHTML = "Horarios disponibles: " + horariosDisponibles.join(", ");
}

function cargarDoctores() {
    fetch('profecionales.js') 
        .then(response => response.json())
        .then(data => {
            doctores = data.doctores; 
            mostrarDoctoresEnDOM(doctores); 
        })
        .catch(error => {
            console.error('Error al cargar los datos de los doctores:', error);
        });
}

function mostrarDoctoresEnDOM(doctores) {
    boton.style.display = 'none';
    resultadosElement.innerHTML = '';

    doctores.forEach(doctor => {
        const divDoctor = document.createElement('div');
        divDoctor.className = 'ficha-doctor';

        divDoctor.innerHTML = `
            <img src="${doctor.imagen}" alt="${doctor.nombre}">
            <h3>${doctor.nombre}</h3>
            <p>${doctor.especialidad}</p>
            <p>${doctor.descripcion}</p>
            <button class="seleccionar-doctor" data-id="${doctor.id}">Seleccionar ${doctor.nombre}</button>
            <div class="horarios-reserva" style="display: none;">
                <br>Seleccione un horario: <select class="selectHorario"></select>
                <br><button class="reservarButton">Reservar Turno</button>
            </div>
        `;

        resultadosElement.appendChild(divDoctor);
    });

    const botonesSeleccionarDoctor = document.querySelectorAll('.seleccionar-doctor');
    botonesSeleccionarDoctor.forEach(boton => {
        boton.addEventListener('click', function() {
            const doctorId = parseInt(boton.getAttribute('data-id'));
            elegirDoctor(doctorId);
        });
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

function reservarTurnoEnDOM(doctorId) {
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
    window.location.href = "./pages/reservas.html";
}