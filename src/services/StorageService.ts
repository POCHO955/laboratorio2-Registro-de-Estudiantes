export class StorageService<T> {
  constructor(private key: string) {}

  public guardar(datos: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(datos));
  }

  public cargar(): T[] {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return [];
    }

    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}