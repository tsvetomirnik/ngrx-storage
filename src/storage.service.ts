import { Injectable } from '@angular/core';
import { Collection } from './';
import { StorageType } from './core/enums/StorageType';
import { IDocument } from './core/interfaces/IDocument';

@Injectable()
export class StorageService {

    private collectionInstances: { [key: string]: Collection<any> } = {};

    public collection<T extends IDocument>(name: string, type?: StorageType): Collection<T> {
        if (this.collectionInstances[name]) {
            return this.collectionInstances[name];
        }

        let collection = new Collection<T>(name, type);
        this.collectionInstances[name] = collection;
        return collection;
    }
}
