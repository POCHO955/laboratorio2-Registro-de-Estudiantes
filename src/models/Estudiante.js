export class Estudiante {
    constructor(id, codigo, nombre, carrera) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.carrera = carrera;
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