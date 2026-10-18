export class EstudianteModel {
    constructor(datosIniciales = []) {
        this.estudiantes = datosIniciales;
    }
    getEstudiantes() {
        return [...this.estudiantes];
    }
    setEstudiantes(estudiantes) {
        this.estudiantes = estudiantes;
    }
    addEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }
    updateEstudiante(estudianteActualizado) {
        const index = this.estudiantes.findIndex((e) => e.id === estudianteActualizado.id);
        if (index !== -1) {
            this.estudiantes[index] = estudianteActualizado;
            return true;
        }
        return false;
    }
    deleteEstudiante(id) {
        const longitudInicial = this.estudiantes.length;
        this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
        return this.estudiantes.length < longitudInicial;
    }
    static validarDatos(codigo, nombre, email, carrera, anioIngreso) {
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
    validarDuplicados(codigo, email, idActual) {
        const codigoExiste = this.estudiantes.some((e) => e.codigo.trim().toLowerCase() === codigo.trim().toLowerCase() && e.id !== idActual);
        if (codigoExiste) {
            return `El código "${codigo}" ya está registrado en el sistema.`;
        }
        const emailExiste = this.estudiantes.some((e) => e.email.trim().toLowerCase() === email.trim().toLowerCase() && e.id !== idActual);
        if (emailExiste) {
            return `El correo "${email}" ya pertenece a otro estudiante.`;
        }
        return null;
    }
    filtrarYOrdenar(terminoBusqueda, carreraFiltro, criterioOrden) {
        const query = terminoBusqueda.trim().toLowerCase();
        const resultado = this.estudiantes.filter((est) => {
            const coincideBusqueda = est.codigo.toLowerCase().includes(query) ||
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
    getContadorPorCarrera() {
        const conteo = {};
        this.estudiantes.forEach((est) => {
            conteo[est.carrera] = (conteo[est.carrera] || 0) + 1;
        });
        return conteo;
    }
}
export class Estudiante {
    constructor(id, codigo, nombre, email, carrera, anioIngreso) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.email = email;
        this.carrera = carrera;
        this.anioIngreso = anioIngreso;
    }
    static validar(codigo, nombre, carrera) {
        if (!codigo.trim() || !nombre.trim() || !carrera.trim()) {
            return "Todos los campos son obligatorios.";
        }
        if (codigo.trim().length < 3) {
            return "El código debe tener al menos 3 caracteres.";
        }
        return null;
    }
}
//# sourceMappingURL=Estudiante.js.map