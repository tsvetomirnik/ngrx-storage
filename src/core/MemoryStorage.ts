export class MemoryStorage implements Storage {
    [key: string]: any;

    constructor(items?: Array<any>) {
        // Set initial state
        if (items) {
            Object.keys(items).forEach((key) => {
                this[key] = items[key];
            });
        }
    }

    public get length(): number {
        return this.getAll().length;
    }

    public key(index: number): string {
        return Object.keys(this)[index] || null;
    }

    public getItem(key: string): any {
        return this[key] || null;
    }

    public getAll(): Array<any> {
        return Object.keys(this)
            .map((key) => this[key])
            .filter((value) => value !== undefined)
    }

    public setItem(key: string, data: any): void {
        this[key] = data;
    }

    public removeItem(key: string): void {
        this[key] = undefined;
    }

    public clear(): void {
        Object.keys(this).forEach((key) => {
            this[key] = undefined;
        });
    }
}