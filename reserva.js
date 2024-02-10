document.addEventListener("DOMContentLoaded", () => {
    mostrarCarritoEnDOM();

    const limpiarCarritoBtn = document.getElementById("limpiarCarritoBtn");
    limpiarCarritoBtn.addEventListener("click", confirmarLimpiarCarrito);
});

function mostrarCarritoEnDOM() {
    const resultadosElement = document.getElementById("resultados-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        resultadosElement.innerHTML = "<h3>Turnos Seleccionados:</h3>";

        carrito.forEach(item => {
            resultadosElement.innerHTML += `<p>${item.doctor} a las ${item.hora}:00 horas</p>`;
        });

        mostrarBotonLimpiarCarrito(true);
    } else {
        resultadosElement.innerHTML = "<p>No hay turnos seleccionados.</p>";

        mostrarBotonLimpiarCarrito(false);
    }
}

function mostrarBotonLimpiarCarrito(visible) {
    const limpiarCarritoBtn = document.getElementById("limpiarCarritoBtn");
    limpiarCarritoBtn.style.display = visible ? "block" : "none";
}

function confirmarLimpiarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todas las reservas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar reservas',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarCarrito();
        }
    });
}

function limpiarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarritoEnDOM();
}