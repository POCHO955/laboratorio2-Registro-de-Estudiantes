export class StorageService<T> {
    constructor(private key: string) {}

    public guardar(datos: T[]): void {
        localStorage.setItem(this.key, JSON.stringify(datos));
    }

    public cargar(): T[] {
        const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
    }
}