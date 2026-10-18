export class StorageService {
    constructor(key) {
        this.key = key;
    }
    guardar(datos) {
        localStorage.setItem(this.key, JSON.stringify(datos));
    }
    cargar() {
        const data = localStorage.getItem(this.key);
        if (!data) {
            return [];
        }
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch (_a) {
            return [];
        }
    }
}
//# sourceMappingURL=StorageService.js.map