export interface IEstudiante {
    id: string;
    codigo: string;
    nombre: string;
    email: string;
    carrera: string;
    anioIngreso: number;
}
export declare class EstudianteModel {
    private estudiantes;
    constructor(datosIniciales?: IEstudiante[]);
    getEstudiantes(): IEstudiante[];
    setEstudiantes(estudiantes: IEstudiante[]): void;
    addEstudiante(estudiante: IEstudiante): void;
    updateEstudiante(estudianteActualizado: IEstudiante): boolean;
    deleteEstudiante(id: string): boolean;
    static validarDatos(codigo: string, nombre: string, email: string, carrera: string, anioIngreso: number): string | null;
    validarDuplicados(codigo: string, email: string, idActual?: string): string | null;
    filtrarYOrdenar(terminoBusqueda: string, carreraFiltro: string, criterioOrden: "nombre" | "codigo"): IEstudiante[];
    getContadorPorCarrera(): Record<string, number>;
}
export declare class Estudiante implements IEstudiante {
    id: string;
    codigo: string;
    nombre: string;
    email: string;
    carrera: string;
    anioIngreso: number;
    constructor(id: string, codigo: string, nombre: string, email: string, carrera: string, anioIngreso: number);
    static validar(codigo: string, nombre: string, carrera: string): string | null;
}
//# sourceMappingURL=Estudiante.d.ts.map