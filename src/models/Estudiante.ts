export interface IEstudiante {
  id: string;
  codigo: string;
  nombre: string;
  carrera: string;
}

export class Estudiante implements IEstudiante {
  constructor(
    public id: string,
    public codigo: string,
    public nombre: string,
    public carrera: string
  ) {}

  public static validar(codigo: string, nombre: string, carrera: string): string | null {
    if (!codigo.trim() || !nombre.trim() || !carrera.trim()) {
      return "Todos los campos son obligatorios.";
    }
    if (codigo.trim().length < 3) {
      return "El código debe tener al menos 3 caracteres.";
    }
    return null;
  }
}