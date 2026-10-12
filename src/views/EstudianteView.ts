import { Estudiante } from "../models/Estudiante.js";

export class EstudianteView {
  public form = document.getElementById("estudiante-form") as HTMLFormElement;
  public inputId = document.getElementById("estudiante-id") as HTMLInputElement;
  public inputCodigo = document.getElementById("codigo") as HTMLInputElement;
  public inputNombre = document.getElementById("nombre") as HTMLInputElement;
  public inputCarrera = document.getElementById("carrera") as HTMLInputElement;
  public inputBuscar = document.getElementById("buscar") as HTMLInputElement;
  public btnCancelar = document.getElementById("btn-cancelar") as HTMLButtonElement;
  public btnSubmit = document.getElementById("btn-submit") as HTMLButtonElement;

  private tablaBody = document.getElementById("tabla-estudiantes-body") as HTMLTableSectionElement;
  private mensajeBox = document.getElementById("mensaje-feedback") as HTMLDivElement;

  public renderTabla(
    estudiantes: Estudiante[],
    onEditar: (estudiante: Estudiante) => void,
    onEliminar: (id: string) => void
  ): void {
    this.tablaBody.innerHTML = "";

    if (estudiantes.length === 0) {
      this.tablaBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay estudiantes registrados.</td></tr>`;
      return;
    }

    estudiantes.forEach((est) => {
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

      row.querySelector(".btn-edit")?.addEventListener("click", () => onEditar(est));
      row.querySelector(".btn-delete")?.addEventListener("click", () => onEliminar(est.id));

      this.tablaBody.appendChild(row);
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.inputId.value = "";
    this.btnSubmit.textContent = "Guardar Estudiante";
    this.btnCancelar.style.display = "none";
  }

  public llenarForm(estudiante: Estudiante): void {
    this.inputId.value = estudiante.id;
    this.inputCodigo.value = estudiante.codigo;
    this.inputNombre.value = estudiante.nombre;
    this.inputCarrera.value = estudiante.carrera;
    this.btnSubmit.textContent = "Actualizar Estudiante";
    this.btnCancelar.style.display = "inline-block";
  }

  public mostrarMensaje(texto: string, tipo: "success" | "error"): void {
    this.mensajeBox.textContent = texto;
    this.mensajeBox.className = `mensaje ${tipo}`;
    this.mensajeBox.style.display = "block";
    setTimeout(() => {
      this.mensajeBox.style.display = "none";
    }, 3000);
  }
}   