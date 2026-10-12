import { Estudiante } from "../models/Estudiante.js";
export declare class EstudianteView {
    form: HTMLFormElement;
    inputId: HTMLInputElement;
    inputCodigo: HTMLInputElement;
    inputNombre: HTMLInputElement;
    inputCarrera: HTMLInputElement;
    inputBuscar: HTMLInputElement;
    btnCancelar: HTMLButtonElement;
    btnSubmit: HTMLButtonElement;
    private tablaBody;
    private mensajeBox;
    renderTabla(estudiantes: Estudiante[], onEditar: (estudiante: Estudiante) => void, onEliminar: (id: string) => void): void;
    resetForm(): void;
    llenarForm(estudiante: Estudiante): void;
    mostrarMensaje(texto: string, tipo: "success" | "error"): void;
}
//# sourceMappingURL=EstudianteView.d.ts.map