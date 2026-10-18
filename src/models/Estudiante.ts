export interface IEstudiante {
  id: string;
  codigo: string;
  nombre: string;
  email: string;
  carrera: string;
  anioIngreso: number;
}

export class EstudianteModel {
  private estudiantes: IEstudiante[];

  constructor(datosIniciales: IEstudiante[] = []) {
    this.estudiantes = datosIniciales;
  }

  public getEstudiantes(): IEstudiante[] {
    return [...this.estudiantes];
  }

  public setEstudiantes(estudiantes: IEstudiante[]): void {
    this.estudiantes = estudiantes;
  }

  public addEstudiante(estudiante: IEstudiante): void {
    this.estudiantes.push(estudiante);
  }

  public updateEstudiante(estudianteActualizado: IEstudiante): boolean {
    const index = this.estudiantes.findIndex((e) => e.id === estudianteActualizado.id);
    if (index !== -1) {
      this.estudiantes[index] = estudianteActualizado;
      return true;
    }
    return false;
  }

  public deleteEstudiante(id: string): boolean {
    const longitudInicial = this.estudiantes.length;
    this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
    return this.estudiantes.length < longitudInicial;
  }

  public static validarDatos(
    codigo: string,
    nombre: string,
    email: string,
    carrera: string,
    anioIngreso: number
  ): string | null {
    if (!codigo.trim() || !nombre.trim() || !email.trim() || !carrera.trim()) {
      return "Todos los campos de texto son requeridos.";
    }

    if (codigo.trim().length < 4) {
      return "El código/carnet debe tener al menos 4 caracteres.";
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.trim())) {
      return "El correo electrónico no tiene un formato válido.";
    }

    const anioActual = new Date().getFullYear();
    if (Number.isNaN(anioIngreso) || anioIngreso < 1980 || anioIngreso > anioActual) {
      return `El año de ingreso debe estar entre 1980 y ${anioActual}.`;
    }

    return null;
  }

  public validarDuplicados(codigo: string, email: string, idActual?: string): string | null {
    const codigoExiste = this.estudiantes.some(
      (e) => e.codigo.trim().toLowerCase() === codigo.trim().toLowerCase() && e.id !== idActual
    );
    if (codigoExiste) {
      return `El código "${codigo}" ya está registrado en el sistema.`;
    }

    const emailExiste = this.estudiantes.some(
      (e) => e.email.trim().toLowerCase() === email.trim().toLowerCase() && e.id !== idActual
    );
    if (emailExiste) {
      return `El correo "${email}" ya pertenece a otro estudiante.`;
    }

    return null;
  }

  public filtrarYOrdenar(
    terminoBusqueda: string,
    carreraFiltro: string,
    criterioOrden: "nombre" | "codigo"
  ): IEstudiante[] {
    const query = terminoBusqueda.trim().toLowerCase();

    const resultado = this.estudiantes.filter((est) => {
      const coincideBusqueda =
        est.codigo.toLowerCase().includes(query) ||
        est.nombre.toLowerCase().includes(query) ||
        est.email.toLowerCase().includes(query);

      const coincideCarrera = carreraFiltro === "" || est.carrera === carreraFiltro;
      return coincideBusqueda && coincideCarrera;
    });

    resultado.sort((a, b) => {
      if (criterioOrden === "codigo") {
        return a.codigo.localeCompare(b.codigo);
      }
      return a.nombre.localeCompare(b.nombre);
    });

    return resultado;
  }

  public getContadorPorCarrera(): Record<string, number> {
    const conteo: Record<string, number> = {};

    this.estudiantes.forEach((est) => {
      conteo[est.carrera] = (conteo[est.carrera] || 0) + 1;
    });

    return conteo;
  }
}

export class Estudiante implements IEstudiante {
  constructor(
    public id: string,
    public codigo: string,
    public nombre: string,
    public email: string,
    public carrera: string,
    public anioIngreso: number
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