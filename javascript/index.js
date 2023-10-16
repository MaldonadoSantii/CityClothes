function validarNombre() {
    const storedName = localStorage.getItem("nombre");

    if (storedName) {
        swal("¡Bienvenido/a de nuevo, " + storedName + "!", "", "success");
    } else {
        swal({
            text: "Ingrese su nombre:",
            content: "input",
            button: {
                text: "Aceptar",
                closeModal: false,
            },
        }).then((nombre) => {
            if (nombre && nombre.match(/^[A-Za-z]+$/)) {
                localStorage.setItem("nombre", nombre);
                swal("¡Bienvenido/a, " + nombre + "!", "", "success");
            } else {
                swal({
                    title: "Error",
                    text: "Ingrese un nombre válido.",
                    icon: "error",
                    closeOnClickOutside: false,
                }).then(() => {
                    validarNombre();
                });
            }
        });
    }
}

window.onload = function () {
    validarNombre();
};