import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/observer';
import { ObjectId } from './types/ObjectId';
import { IDocument } from './interfaces/IDocument';
import { StorageType } from './enums/StorageType';
import { MemoryStorage } from './MemoryStorage';

export class Collection<T extends IDocument> {

    public $insert: Observable<T[]>;
    public $update: Observable<T[]>;
    public $remove: Observable<T[]>;

    private storageKey: string;
    private storage: Storage;
    private insertObserver: Observer<T[]>;
    private updateObserver: Observer<T[]>;
    private removeObserver: Observer<T[]>;

    constructor(storageKey: string, type: StorageType = StorageType.Local) {
        this.storageKey = storageKey;

        // Set storage by type
        if (type === StorageType.Session) {
            this.storage = sessionStorage;
        } else if (type === StorageType.Memory) {
            this.storage = new MemoryStorage();
        } else {
            this.storage = localStorage;
        }

        this.$insert = Observable.create(observer => {
            this.insertObserver = observer;
        });

        this.$update = Observable.create(observer => {
            this.updateObserver = observer;
        });

        this.$remove = Observable.create(observer => {
            this.removeObserver = observer;
        });
    }

    getById(id: ObjectId): T {
        let collectionStorage = this.getCollectionStorage();
        return collectionStorage.getItem(id.toString());
    }

    getAll(): T[] {
        let collectionStorage = this.getCollectionStorage();
        return collectionStorage.getAll();
    }

    exists(id: ObjectId): Boolean {
        return this.getById(id) !== null;
    }

    findOne(callbackfn: (value: T, index: number, array: T[]) => any): T {
        return this.getAll().filter(callbackfn)[0];
    }

    filter(callbackfn: (value: T, index: number, array: T[]) => any): T[] {
        return this.getAll().filter(callbackfn);
    }

    insert(item: T): void {
        this.insertMany([item]);
    }

    insertMany(items: T[]): void {
        let collectionStorage = this.getCollectionStorage();
        let itemIds = items.map((item) => item._id);

        // Prevent Duplicates in the new items
        let hasDuplicateItems = items.some((item) => {
            let idsCount = itemIds.reduce((accumulator: number, currentValue) => {
                if (itemIds.indexOf(item._id) >= 0) {
                    return accumulator++;
                }
            }, 0);
            return idsCount > 1;
        });

        if (hasDuplicateItems) {
            throw new Error('The insert collection contains duplicate items.');
        }

        // Prevent Inserted Items
        let hasAlreadyInserted = items.some((item) => {
            return collectionStorage.getItem(item._id.toString());
        });

        if (hasAlreadyInserted) {
            throw new Error('Item with this id already exist.');
        }

        // Insert
        items.forEach((item) => {
            collectionStorage.setItem(item._id.toString(), item);
        });

        // Store
        this.storage.setItem(this.storageKey, JSON.stringify(collectionStorage));

        // Notify
        this.notifyInserted(items);
    }

    update(item: T): void {
        let collectionStorage = this.getCollectionStorage();

        // Get Item
        let storedItem = collectionStorage.getItem(item._id.toString());
        if (!storedItem) {
            throw new Error('Unable to update not existing item.');
        }

        collectionStorage.setItem(item._id.toString(), item);

        // Notify
        this.notifyUpdated([item]);
    }

    removeMany(ids: ObjectId[]): void {
        let collectionStorage = this.getCollectionStorage();

        // Get Item
        let itemsToRemove = ids.map((id) => {
            return collectionStorage.getItem(id.toString());
        });

        if (!itemsToRemove.length) {
            return;
        }

        // Remove
        ids.forEach((id) => {
            collectionStorage.removeItem(id.toString());
        });

        // Store
        this.storage.setItem(this.storageKey, JSON.stringify(collectionStorage));

        // Notify
        this.notifyRemoved(itemsToRemove);
    }

    removeById(id: ObjectId): void {
        this.removeMany([id]);
    }

    removeAll(): void {
        let collectionStorage = this.getCollectionStorage();
        let itemsToRemove = collectionStorage.getAll();

        // Remove All
        this.storage.setItem(this.storageKey, JSON.stringify({}));

        // Notify
        this.notifyRemoved(itemsToRemove);
    }

    getCount(): number {
        return this.getAll().length;
    }

    private getCollectionStorage() {
        let storageItem = this.storage.getItem(this.storageKey);
        let collectionStorage = new MemoryStorage(JSON.parse(storageItem));
        return collectionStorage;
    }

    /* Notifiers */

    private notifyInserted(items: T[]) {
        if (this.insertObserver) {
            this.insertObserver.next(items);
        }
    }

    private notifyUpdated(items: T[]) {
        if (this.removeObserver) {
            this.removeObserver.next(items);
        }
    }

    private notifyRemoved(items: T[]) {
        if (this.removeObserver) {
            this.removeObserver.next(items);
        }
    }
}
