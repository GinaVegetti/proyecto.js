document.addEventListener("DOMContentLoaded", () => {
    mostrarCarritoEnDOM();
});

function mostrarCarritoEnDOM() {
    const resultadosElement = document.getElementById("resultados-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        resultadosElement.innerHTML = "<h3>Turnos Seleccionados:</h3>";

        carrito.forEach(item => {
            resultadosElement.innerHTML += `<p>${item.doctor} a las ${item.hora}:00 horas</p>`;
        });
    } else {
        resultadosElement.innerHTML = "<p>No hay turnos seleccionados en el carrito.</p>";
    }
}