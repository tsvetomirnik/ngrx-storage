/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { TestBed, inject, async } from '@angular/core/testing';
import { StorageModule, StorageService, Collection } from './';

describe('StorageService', () => {
    var storageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: StorageService,
                    deps: [],
                    useFactory: () => {
                        return new StorageService()
                    }
                }
            ],
            imports: [
                StorageModule
            ]
        });
    });

    beforeEach(inject([StorageService], (storageService: StorageService) => {
        this.storageService = storageService;
    }));

    it('should inject', inject([StorageService], (service: StorageService) => {
        expect(service).toBeTruthy();
    }));

    describe('collection method', () => {

        it('should return a collection instance', () => {
            let collection = this.storageService.collection('key');
            expect(collection instanceof Collection).toBe(true);
        });

        it('called twice with the same key should return the same collection instance', () => {
            let collection = this.storageService.collection('key');
            let collection2 = this.storageService.collection('key');
            expect(collection).toBe(collection2);
        });

    });

});