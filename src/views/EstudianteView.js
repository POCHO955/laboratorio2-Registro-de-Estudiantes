import { Estudiante } from "../models/Estudiante.js";
export class EstudianteView {
    constructor() {
        this.form = document.getElementById("estudiante-form");
        this.inputId = document.getElementById("estudiante-id");
        this.inputCodigo = document.getElementById("codigo");
        this.inputNombre = document.getElementById("nombre");
        this.inputCarrera = document.getElementById("carrera");
        this.inputBuscar = document.getElementById("buscar");
        this.btnCancelar = document.getElementById("btn-cancelar");
        this.btnSubmit = document.getElementById("btn-submit");
        this.tablaBody = document.getElementById("tabla-estudiantes-body");
        this.mensajeBox = document.getElementById("mensaje-feedback");
    }
    renderTabla(estudiantes, onEditar, onEliminar) {
        this.tablaBody.innerHTML = "";
        if (estudiantes.length === 0) {
            this.tablaBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay estudiantes registrados.</td></tr>`;
            return;
        }
        estudiantes.forEach((est) => {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td><strong>${est.codigo}</strong></td>
        <td>${est.nombre}</td>
        <td>${est.carrera}</td>
        <td class="acciones">
          <button class="btn-edit" data-id="${est.id}">Editar</button>
          <button class="btn-delete" data-id="${est.id}">Eliminar</button>
        </td>
      `;
            (_a = row.querySelector(".btn-edit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => onEditar(est));
            (_b = row.querySelector(".btn-delete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => onEliminar(est.id));
            this.tablaBody.appendChild(row);
        });
    }
    resetForm() {
        this.form.reset();
        this.inputId.value = "";
        this.btnSubmit.textContent = "Guardar Estudiante";
        this.btnCancelar.style.display = "none";
    }
    llenarForm(estudiante) {
        this.inputId.value = estudiante.id;
        this.inputCodigo.value = estudiante.codigo;
        this.inputNombre.value = estudiante.nombre;
        this.inputCarrera.value = estudiante.carrera;
        this.btnSubmit.textContent = "Actualizar Estudiante";
        this.btnCancelar.style.display = "inline-block";
    }
    mostrarMensaje(texto, tipo) {
        this.mensajeBox.textContent = texto;
        this.mensajeBox.className = `mensaje ${tipo}`;
        this.mensajeBox.style.display = "block";
        setTimeout(() => {
            this.mensajeBox.style.display = "none";
        }, 3000);
    }
}
//# sourceMappingURL=EstudianteView.js.map