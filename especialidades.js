document.addEventListener("DOMContentLoaded", function() {
    var especialidad = document.querySelector("h1").textContent.trim();
    mostrarFichasMedicas(especialidad);
});

function mostrarFichasMedicas(especialidad) {
    fetch('/profecionales.js') 
        .then(response => response.json())
        .then(data => {
            var doctoresEspecialidad = data.doctores.filter(doctor => doctor.especialidad.toLowerCase() === especialidad.toLowerCase());

            var fichasMedicasContainer = document.getElementById("fichas-medicas");
            fichasMedicasContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas fichas

            doctoresEspecialidad.forEach(doctor => {
                var fichaMedica = document.createElement("div");
                fichaMedica.innerHTML = `
                    <img src="${doctor.imagen}" alt="${doctor.nombre}">
                    <h3>${doctor.nombre}</h3>
                    <p>${doctor.especialidad}</p>
                    <p>${doctor.descripcion}</p>
                `;
                fichasMedicasContainer.appendChild(fichaMedica);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos de los doctores:', error);
        });
}