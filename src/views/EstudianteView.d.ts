import type { IEstudiante } from "../models/Estudiante.js";
export declare class EstudianteView {
    form: HTMLFormElement;
    inputId: HTMLInputElement;
    inputCodigo: HTMLInputElement;
    inputNombre: HTMLInputElement;
    inputEmail: HTMLInputElement;
    selectCarrera: HTMLSelectElement;
    inputAnio: HTMLInputElement;
    btnSubmit: HTMLButtonElement;
    btnCancelar: HTMLButtonElement;
    inputBuscar: HTMLInputElement;
    filtroCarrera: HTMLSelectElement;
    ordenSelector: HTMLSelectElement;
    btnExportar: HTMLButtonElement;
    private tablaBody;
    private contenedorContador;
    private mensajeBox;
    private modalQR;
    private btnCerrarQR;
    private qrImage;
    private qrNombre;
    private qrCarnet;
    private qrCarrera;
    constructor();
    renderTabla(estudiantes: IEstudiante[], onEditar: (estudiante: IEstudiante) => void, onEliminar: (id: string) => void, onVerQR: (estudiante: IEstudiante) => void): void;
    renderContador(conteo: Record<string, number>, totalEstudiantes: number): void;
    llenarForm(estudiante: IEstudiante): void;
    resetForm(): void;
    mostrarCredencialQR(estudiante: IEstudiante): void;
    cerrarCredencialQR(): void;
    mostrarMensaje(texto: string, tipo: "success" | "error"): void;
}
//# sourceMappingURL=EstudianteView.d.ts.map