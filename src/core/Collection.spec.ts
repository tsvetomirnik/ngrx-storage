/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { Collection } from './Collection';
import { StorageType } from './enums/StorageType';
import { Toy } from '../../test/Toy';

describe('Collection', () => {

    let toysCollection;

    beforeEach(() => {
        toysCollection = new Collection<Toy>('toys', StorageType.Memory);
    });

    it('should has 0 items when created', () => {
        expect(toysCollection.getCount()).toBe(0);
    });

    it('should insert successfully one item', () => {
        const toy = new Toy('test');
        toysCollection.insert(toy);
        expect(toysCollection.getCount()).toBe(1);
    });

    it('should notify when new item is inserted', () => {
        const toy = new Toy('test');
        const spy = jasmine.createSpy('spy');

        toysCollection.$insert.subscribe((data) => {
            spy(data);
        });

        toysCollection.insert(toy);
        expect(spy).toHaveBeenCalledWith([toy]);
    });

    describe('exists method', () => {

        it('should return false if the item is not stored', () => {
            const toy1 = new Toy('test-1');
            const toy2 = new Toy('test-2');
            toysCollection.insert(toy2);

            expect(toysCollection.exists(toy1._id)).toBe(false);
        });

        it('should return true if the item is already stored', () => {
            const toy = new Toy('test');
            toysCollection.insert(toy);

            const toy2 = new Toy('test');
            toysCollection.insert(toy2);

            expect(toysCollection.exists(toy._id)).toBe(true);
        });

    });

});