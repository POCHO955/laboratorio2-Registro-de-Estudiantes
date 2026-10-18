import type { IEstudiante } from "../models/Estudiante.js";
import { EstudianteView } from "../views/EstudianteView.js";
export declare class EstudianteController {
    private view;
    private model;
    private storage;
    constructor(view: EstudianteView);
    private inicializar;
    private guardarEstudiante;
    handleUpdate(estudiante: IEstudiante): void;
    handleDelete(id: string): void;
    handleExport(): void;
    private aplicarFiltros;
    private actualizarVista;
}
//# sourceMappingURL=EstudianteController.d.ts.map