import { Estudiante } from "../models/Estudiante.js";
import { EstudianteView } from "../views/EstudianteView.js";
import { StorageService } from "../services/StorageService.js";
export class EstudianteController {
    constructor(view) {
        this.view = view;
        this.estudiantes = [];
        this.storage = new StorageService("estudiantes_db");
        this.inicializar();
    }
    inicializar() {
        this.estudiantes = this.storage.cargar();
        this.actualizarVista();
        // Evento Formulario (Crear / Actualizar)
        this.view.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.guardarEstudiante();
        });
        // Evento Búsqueda en vivo
        this.view.inputBuscar.addEventListener("input", () => {
            this.buscarEstudiantes();
        });
        // Evento Cancelar edición
        this.view.btnCancelar.addEventListener("click", () => {
            this.view.resetForm();
        });
    }
    guardarEstudiante() {
        const id = this.view.inputId.value;
        const codigo = this.view.inputCodigo.value.trim();
        const nombre = this.view.inputNombre.value.trim();
        const carrera = this.view.inputCarrera.value.trim();
        // Validación básica de campos
        const errorValidacion = Estudiante.validar(codigo, nombre, carrera);
        if (errorValidacion) {
            this.view.mostrarMensaje(errorValidacion, "error");
            return;
        }
        // Validación de códigos duplicados (excluyendo el actual si estamos editando)
        const codigoExiste = this.estudiantes.some((e) => e.codigo.toLowerCase() === codigo.toLowerCase() && e.id !== id);
        if (codigoExiste) {
            this.view.mostrarMensaje(`El código "${codigo}" ya se encuentra registrado.`, "error");
            return;
        }
        if (id) {
            // Modo Edición
            const indice = this.estudiantes.findIndex((e) => e.id === id);
            if (indice !== -1) {
                this.estudiantes[indice] = { id, codigo, nombre, carrera };
                this.view.mostrarMensaje("Estudiante actualizado correctamente.", "success");
            }
        }
        else {
            // Modo Registro Nuevo
            const nuevoEstudiante = new Estudiante(Date.now().toString(), codigo, nombre, carrera);
            this.estudiantes.push(nuevoEstudiante);
            this.view.mostrarMensaje("Estudiante agregado exitosamente.", "success");
        }
        this.storage.guardar(this.estudiantes);
        this.view.resetForm();
        this.actualizarVista();
    }
    eliminarEstudiante(id) {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar a este estudiante?");
        if (!confirmar)
            return;
        this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
        this.storage.guardar(this.estudiantes);
        this.actualizarVista();
        this.view.mostrarMensaje("Estudiante eliminado.", "success");
    }
    editarEstudiante(estudiante) {
        this.view.llenarForm(estudiante);
    }
    buscarEstudiantes() {
        const termino = this.view.inputBuscar.value.trim().toLowerCase();
        const filtrados = this.estudiantes.filter((e) => e.codigo.toLowerCase().includes(termino) ||
            e.nombre.toLowerCase().includes(termino));
        this.view.renderTabla(filtrados, (est) => this.editarEstudiante(est), (id) => this.eliminarEstudiante(id));
    }
    actualizarVista() {
        this.view.renderTabla(this.estudiantes, (est) => this.editarEstudiante(est), (id) => this.eliminarEstudiante(id));
    }
}
//# sourceMappingURL=EstudianteController.js.map