export class StorageService {
    constructor(key) {
        this.key = key;
    }
    guardar(datos) {
        localStorage.setItem(this.key, JSON.stringify(datos));
    }
    cargar() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }
}
//# sourceMappingURL=StorageService.js.map