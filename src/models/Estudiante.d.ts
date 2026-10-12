export interface IEstudiante {
    id: string;
    codigo: string;
    nombre: string;
    carrera: string;
}
export declare class Estudiante implements IEstudiante {
    id: string;
    codigo: string;
    nombre: string;
    carrera: string;
    constructor(id: string, codigo: string, nombre: string, carrera: string);
    static validar(codigo: string, nombre: string, carrera: string): string | null;
}
//# sourceMappingURL=Estudiante.d.ts.map