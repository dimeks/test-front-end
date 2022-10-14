export default interface ILocalStorage<T> {
    key: Readonly<string>;
    data: T;
    schema: Readonly<T>;
    method: Storage;
    set(value: T): T;
    get(key?: string): T;
    clear(): void;
    exists(): boolean;
}

export default class LocalStorage<T> implements ILocalStorage<T> {
    data: T;
    key: Readonly<string>;
    schema: Readonly<T>;

    constructor(key: string, data: T, method?: Storage) {
        this.key = key;
        this.data = data;
        this.schema = Object.freeze({ ...data });
        this.method = method || localStorage;

        if (!this.exists()) {
            this.set(data);
        }
    }

    public set(value: T): T {
        const nextState = {
            ...this.data,
            ...value,
        };

        this.method.setItem(this.key, JSON.stringify(nextState));
        this.data = nextState;

        return nextState;
    }

    public get(key?: string): T {
        const data = this.method.getItem(this.key);
        if (data) {
            this.data = JSON.parse(data);
        }
        const d: any = this.data;
        return key ? d[key] : d;
    }

    public clear() {
        this.set(this.schema);
    }

    public remove() {
        this.method.removeItem(this.key);
    }

    public exists() {
        return this.method.getItem(this.key) !== null;
    }
}