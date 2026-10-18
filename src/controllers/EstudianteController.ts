import { EstudianteModel } from "../models/Estudiante.js";
import type { IEstudiante } from "../models/Estudiante.js";
import { EstudianteView } from "../views/EstudianteView.js";
import { StorageService } from "../services/StorageService.js";

export class EstudianteController {
  private model: EstudianteModel;
  private storage: StorageService<IEstudiante>;

  constructor(private view: EstudianteView) {
    this.storage = new StorageService<IEstudiante>("estudiantes_db_p2");
    this.model = new EstudianteModel(this.storage.cargar());
    this.inicializar();
  }

  private inicializar(): void {
    this.actualizarVista();

    this.view.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.guardarEstudiante();
    });

    this.view.btnCancelar.addEventListener("click", () => {
      this.view.resetForm();
    });

    this.view.inputBuscar.addEventListener("input", () => this.aplicarFiltros());
    this.view.filtroCarrera.addEventListener("change", () => this.aplicarFiltros());
    this.view.ordenSelector.addEventListener("change", () => this.aplicarFiltros());
    this.view.btnExportar.addEventListener("click", () => this.handleExport());
  }

  private guardarEstudiante(): void {
    const id = this.view.inputId.value;
    const codigo = this.view.inputCodigo.value.trim();
    const nombre = this.view.inputNombre.value.trim();
    const email = this.view.inputEmail.value.trim();
    const carrera = this.view.selectCarrera.value;
    const anioIngreso = Number.parseInt(this.view.inputAnio.value, 10);

    const errorFormato = EstudianteModel.validarDatos(codigo, nombre, email, carrera, anioIngreso);
    if (errorFormato) {
      this.view.mostrarMensaje(errorFormato, "error");
      return;
    }

    const errorDuplicado = this.model.validarDuplicados(codigo, email, id ? id : undefined);
    if (errorDuplicado) {
      this.view.mostrarMensaje(errorDuplicado, "error");
      return;
    }

    if (id) {
      this.handleUpdate({ id, codigo, nombre, email, carrera, anioIngreso });
    } else {
      const nuevoEstudiante: IEstudiante = {
        id: Date.now().toString(),
        codigo,
        nombre,
        email,
        carrera,
        anioIngreso
      };
      this.model.addEstudiante(nuevoEstudiante);
      this.view.mostrarMensaje("Estudiante matriculado con éxito.", "success");
    }

    this.storage.guardar(this.model.getEstudiantes());
    this.view.resetForm();
    this.actualizarVista();
  }

  public handleUpdate(estudiante: IEstudiante): void {
    const exito = this.model.updateEstudiante(estudiante);
    if (exito) {
      this.view.mostrarMensaje("Expediente del estudiante actualizado.", "success");
    } else {
      this.view.mostrarMensaje("No se pudo localizar el expediente a actualizar.", "error");
    }
  }

  public handleDelete(id: string): void {
    const confirmacion = confirm("¿Está seguro de que desea eliminar este registro académico? Esta acción no se puede deshacer.");
    if (!confirmacion) return;

    const eliminado = this.model.deleteEstudiante(id);
    if (eliminado) {
      this.storage.guardar(this.model.getEstudiantes());
      this.actualizarVista();
      this.view.mostrarMensaje("Registro eliminado correctamente.", "success");
    }
  }

  public handleExport(): void {
    const estudiantes = this.model.getEstudiantes();
    if (estudiantes.length === 0) {
      this.view.mostrarMensaje("No existen registros para exportar.", "error");
      return;
    }

    const encabezados = ["ID", "Carnet", "Nombre Completo", "Correo Electronico", "Carrera", "Anio de Ingreso"];
    const filas = estudiantes.map((e) => [
      `"${e.id}"`,
      `"${e.codigo}"`,
      `"${e.nombre}"`,
      `"${e.email}"`,
      `"${e.carrera}"`,
      e.anioIngreso
    ]);

    const contenidoCSV = [encabezados.join(","), ...filas.map((f) => f.join(","))].join("\r\n");

    const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `estudiantes_matriculados_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.view.mostrarMensaje("Archivo CSV descargado exitosamente.", "success");
  }

  private aplicarFiltros(): void {
    const termino = this.view.inputBuscar.value;
    const carrera = this.view.filtroCarrera.value;
    const criterio = (this.view.ordenSelector.value as "nombre" | "codigo") || "nombre";

    const filtrados = this.model.filtrarYOrdenar(termino, carrera, criterio);

    this.view.renderTabla(
      filtrados,
      (est) => this.view.llenarForm(est),
      (id) => this.handleDelete(id),
      (est) => this.view.mostrarCredencialQR(est)
    );
  }

  private actualizarVista(): void {
    this.aplicarFiltros();
    const conteo = this.model.getContadorPorCarrera();
    this.view.renderContador(conteo, this.model.getEstudiantes().length);
  }
}