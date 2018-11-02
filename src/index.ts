
interface Istoryh<T> {
    capacity: number
    // resize(newCapacity: number): void
    top(): T | null
    at(position: number): T | null
    list(count: number): T[]

    push(value: T): void;
}


class IstoryhImpl<T> implements Istoryh<T> {
    private currentPosition: number = 0;
    private store: Store<T> 

    private istoId: string
    private key(pos: number): string {
        let actualPos = (this.currentPosition - pos) % this.capacity
        if (pos > this.currentPosition) {
            actualPos += this.capacity
        }
        return `istory-item-${this.istoId}-${actualPos}`
    } 

    private next(): number {
        return (this.currentPosition + 1) % this.capacity;
    }
    
    capacity: number;
    
    constructor(capacity: number, istoId?: string, store: Store<T> = new LocalStorageStore<T>()) {
        this.capacity = capacity;
        this.store = store;
        this.istoId = istoId || Math.floor(Math.random() * 1000000).toString()
    }
    top(): T | null {
        return this.store.get(this.key(0))
    }
    at(position: number): T | null {
        return this.store.get(this.key(position))
    }
    list(count: number): T[] {
        if (count > this.capacity) {
            count = this.capacity;
        }
        let iter = 0;
        let elems: T[] = [];
        for (let iter = 0; iter < count; iter ++) {
            const it = this.at(iter);
            if (it != null) {
               elems.push(it);
            } else {
                break;
            }
        }
        return elems;
    }

    push(value: T): void {
        this.currentPosition = this.next();
        this.store.set(this.key(0), value)
    }

}


interface Store<T> {
    get(key: string): T | null
    set(key: string, value: T): void
}

class ObjectStore<T> implements Store<T>{
    private data: { [key: string]: T } = {}

    get(key: string): T | null {
        return this.data[key]
    }    
    set(key: string, value: T): void {
        this.data[key] = value
    }
}

class LocalStorageStore<T> implements Store<T> {
    get(key: string): T | null {
        const result = localStorage.getItem(key)
        if (result == null) {
            return null
        }
        return JSON.parse(result);
    }    
    set(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export function isto<T>(capacity: number = 10, id?: string, store: Store<T>= new LocalStorageStore()): Istoryh<T> {
    return new IstoryhImpl(capacity, id, store);
}

export function objstore<T>(): Store<T> {
    return new ObjectStore;
}