import type { IEstudiante } from "../models/Estudiante.js";

export class EstudianteView {
  public form = document.getElementById("estudiante-form") as HTMLFormElement;
  public inputId = document.getElementById("estudiante-id") as HTMLInputElement;
  public inputCodigo = document.getElementById("codigo") as HTMLInputElement;
  public inputNombre = document.getElementById("nombre") as HTMLInputElement;
  public inputEmail = document.getElementById("email") as HTMLInputElement;
  public selectCarrera = document.getElementById("carrera") as HTMLSelectElement;
  public inputAnio = document.getElementById("anioIngreso") as HTMLInputElement;

  public btnSubmit = document.getElementById("btn-submit") as HTMLButtonElement;
  public btnCancelar = document.getElementById("btn-cancelar") as HTMLButtonElement;

  public inputBuscar = document.getElementById("buscar") as HTMLInputElement;
  public filtroCarrera = document.getElementById("filtro-carrera") as HTMLSelectElement;
  public ordenSelector = document.getElementById("orden-criterio") as HTMLSelectElement;
  public btnExportar = document.getElementById("btn-exportar") as HTMLButtonElement;

  private tablaBody = document.getElementById("tabla-estudiantes-body") as HTMLTableSectionElement;
  private contenedorContador = document.getElementById("contador-carreras") as HTMLDivElement;
  private mensajeBox = document.getElementById("mensaje-feedback") as HTMLDivElement;

  private modalQR = document.getElementById("modal-qr") as HTMLDivElement;
  private btnCerrarQR = document.getElementById("btn-cerrar-qr") as HTMLButtonElement;
  private qrImage = document.getElementById("qr-image") as HTMLImageElement;
  private qrNombre = document.getElementById("qr-nombre") as HTMLElement;
  private qrCarnet = document.getElementById("qr-carnet") as HTMLElement;
  private qrCarrera = document.getElementById("qr-carrera") as HTMLElement;

  constructor() {
    this.btnCerrarQR.addEventListener("click", () => this.cerrarCredencialQR());
  }

  public renderTabla(
    estudiantes: IEstudiante[],
    onEditar: (estudiante: IEstudiante) => void,
    onEliminar: (id: string) => void,
    onVerQR: (estudiante: IEstudiante) => void
  ): void {
    this.tablaBody.innerHTML = "";

    if (estudiantes.length === 0) {
      this.tablaBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No se encontraron estudiantes registrados con los criterios seleccionados.</td>
        </tr>`;
      return;
    }

    estudiantes.forEach((est) => {
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

      row.querySelector(".btn-qr")?.addEventListener("click", () => onVerQR(est));
      row.querySelector(".btn-edit")?.addEventListener("click", () => onEditar(est));
      row.querySelector(".btn-delete")?.addEventListener("click", () => onEliminar(est.id));

      this.tablaBody.appendChild(row);
    });
  }

  public renderContador(conteo: Record<string, number>, totalEstudiantes: number): void {
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

  public llenarForm(estudiante: IEstudiante): void {
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

  public resetForm(): void {
    this.form.reset();
    this.inputId.value = "";
    this.btnSubmit.textContent = "Guardar Estudiante";
    this.btnSubmit.classList.remove("btn-warning");
    this.btnCancelar.style.display = "none";
  }

  public mostrarCredencialQR(estudiante: IEstudiante): void {
    const payload = `ESTUDIANTE:${estudiante.nombre}|CARNET:${estudiante.codigo}|CARRERA:${estudiante.carrera}|INGRESO:${estudiante.anioIngreso}`;
    const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(payload)}`;

    this.qrImage.src = urlQR;
    this.qrNombre.textContent = estudiante.nombre;
    this.qrCarnet.textContent = estudiante.codigo;
    this.qrCarrera.textContent = estudiante.carrera;

    this.modalQR.style.display = "flex";
  }

  public cerrarCredencialQR(): void {
    this.modalQR.style.display = "none";
  }

  public mostrarMensaje(texto: string, tipo: "success" | "error"): void {
    this.mensajeBox.textContent = texto;
    this.mensajeBox.className = `alerta ${tipo}`;
    this.mensajeBox.style.display = "block";
    setTimeout(() => {
      this.mensajeBox.style.display = "none";
    }, 3500);
  }
}