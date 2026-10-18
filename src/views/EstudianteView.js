export class EstudianteView {
    constructor() {
        this.form = document.getElementById("estudiante-form");
        this.inputId = document.getElementById("estudiante-id");
        this.inputCodigo = document.getElementById("codigo");
        this.inputNombre = document.getElementById("nombre");
        this.inputEmail = document.getElementById("email");
        this.selectCarrera = document.getElementById("carrera");
        this.inputAnio = document.getElementById("anioIngreso");
        this.btnSubmit = document.getElementById("btn-submit");
        this.btnCancelar = document.getElementById("btn-cancelar");
        this.inputBuscar = document.getElementById("buscar");
        this.filtroCarrera = document.getElementById("filtro-carrera");
        this.ordenSelector = document.getElementById("orden-criterio");
        this.btnExportar = document.getElementById("btn-exportar");
        this.tablaBody = document.getElementById("tabla-estudiantes-body");
        this.contenedorContador = document.getElementById("contador-carreras");
        this.mensajeBox = document.getElementById("mensaje-feedback");
        this.modalQR = document.getElementById("modal-qr");
        this.btnCerrarQR = document.getElementById("btn-cerrar-qr");
        this.qrImage = document.getElementById("qr-image");
        this.qrNombre = document.getElementById("qr-nombre");
        this.qrCarnet = document.getElementById("qr-carnet");
        this.qrCarrera = document.getElementById("qr-carrera");
        this.btnCerrarQR.addEventListener("click", () => this.cerrarCredencialQR());
    }
    renderTabla(estudiantes, onEditar, onEliminar, onVerQR) {
        this.tablaBody.innerHTML = "";
        if (estudiantes.length === 0) {
            this.tablaBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No se encontraron estudiantes registrados con los criterios seleccionados.</td>
        </tr>`;
            return;
        }
        estudiantes.forEach((est) => {
            var _a, _b, _c;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td><strong>${est.codigo}</strong></td>
        <td>${est.nombre}</td>
        <td>${est.email}</td>
        <td>${est.carrera}</td>
        <td>${est.anioIngreso}</td>
        <td class="acciones">
          <button class="boton-accion btn-qr" title="Credencial QR">🪪 QR</button>
          <button class="boton-accion btn-edit" title="Editar">✏️</button>
          <button class="boton-accion btn-delete" title="Eliminar">🗑️</button>
        </td>
      `;
            (_a = row.querySelector(".btn-qr")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => onVerQR(est));
            (_b = row.querySelector(".btn-edit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => onEditar(est));
            (_c = row.querySelector(".btn-delete")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => onEliminar(est.id));
            this.tablaBody.appendChild(row);
        });
    }
    renderContador(conteo, totalEstudiantes) {
        this.contenedorContador.innerHTML = "";
        const tarjetaTotal = document.createElement("div");
        tarjetaTotal.className = "tarjeta-contador total";
        tarjetaTotal.innerHTML = `<span>Total Registrados</span><strong>${totalEstudiantes}</strong>`;
        this.contenedorContador.appendChild(tarjetaTotal);
        for (const [carrera, cantidad] of Object.entries(conteo)) {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-contador";
            tarjeta.innerHTML = `<span>${carrera}</span><strong>${cantidad}</strong>`;
            this.contenedorContador.appendChild(tarjeta);
        }
    }
    llenarForm(estudiante) {
        this.inputId.value = estudiante.id;
        this.inputCodigo.value = estudiante.codigo;
        this.inputNombre.value = estudiante.nombre;
        this.inputEmail.value = estudiante.email;
        this.selectCarrera.value = estudiante.carrera;
        this.inputAnio.value = estudiante.anioIngreso.toString();
        this.btnSubmit.textContent = "Actualizar Estudiante";
        this.btnSubmit.classList.add("btn-warning");
        this.btnCancelar.style.display = "inline-block";
    }
    resetForm() {
        this.form.reset();
        this.inputId.value = "";
        this.btnSubmit.textContent = "Guardar Estudiante";
        this.btnSubmit.classList.remove("btn-warning");
        this.btnCancelar.style.display = "none";
    }
    mostrarCredencialQR(estudiante) {
        const payload = `ESTUDIANTE:${estudiante.nombre}|CARNET:${estudiante.codigo}|CARRERA:${estudiante.carrera}|INGRESO:${estudiante.anioIngreso}`;
        const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(payload)}`;
        this.qrImage.src = urlQR;
        this.qrNombre.textContent = estudiante.nombre;
        this.qrCarnet.textContent = estudiante.codigo;
        this.qrCarrera.textContent = estudiante.carrera;
        this.modalQR.style.display = "flex";
    }
    cerrarCredencialQR() {
        this.modalQR.style.display = "none";
    }
    mostrarMensaje(texto, tipo) {
        this.mensajeBox.textContent = texto;
        this.mensajeBox.className = `alerta ${tipo}`;
        this.mensajeBox.style.display = "block";
        setTimeout(() => {
            this.mensajeBox.style.display = "none";
        }, 3500);
    }
}
//# sourceMappingURL=EstudianteView.js.map