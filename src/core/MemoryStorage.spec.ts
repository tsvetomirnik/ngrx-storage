/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { MemoryStorage } from './MemoryStorage';

describe('MemoryStorage', () => {

    let storage: MemoryStorage;

    beforeEach(() => {
        storage = new MemoryStorage();
    });

    describe('setItem method', () => {

        it('should insert the exact number value', () => {
            const key = 'key';
            const value = 1;

            storage.setItem(key, value);
            let actualValue = storage[key];

            expect(actualValue).toBe(value);
            expect(typeof actualValue).toBe('number');
        });

        it('should insert the exact string value', () => {
            const key = 'key';
            const value = 'string';

            storage.setItem(key, value);
            let actualValue = storage[key];

            expect(actualValue).toBe(value);
            expect(typeof actualValue).toBe('string');
        });

        it('should insert the exact boolean value', () => {
            const key = 'key';
            const value = true;

            storage.setItem(key, value);
            let actualValue = storage[key];

            expect(actualValue).toBe(value);
            expect(typeof actualValue).toBe('boolean');
        });

        it('should insert the exact object value', () => {
            const key = 'key';
            const value = { prop: 1 };

            storage.setItem(key, value);
            let actualValue = storage[key];

            expect(actualValue).toBe(value);
            expect(typeof actualValue).toBe('object');
        });

        it('should insert a null value', () => {
            const key = 'key';
            const value = null;

            storage.setItem(key, value);
            let actualValue = storage[key];

            expect(actualValue).toBe(value);
        });

        it('should change th value of existing item', () => {
            const key = 'key';
            const expectedValue = 2;

            storage.setItem(key, 1);
            storage.setItem(key, expectedValue);
            let actualValue = storage[key];

            expect(actualValue).toBe(expectedValue);
        });

    });

    describe('length property', () => {

        it('should be 0 for a new MemoryStorage instance', () => {
            expect(storage.length).toBe(0);
        });

        describe('after setItem method', () => {

            it('called with non undefined should be increased', () => {
                const key = 'key';
                const value = 1;
                storage.setItem(key, value);
                expect(storage.length).toBe(1);
            });

            it('called with undefined value should not be increased', () => {
                const key = 'key';
                const value = undefined;
                storage.setItem(key, value);
                expect(storage.length).toBe(0);
            });

            it('called with undefined for existing item should be decreased', () => {
                storage.setItem('key-1', 1);
                storage.setItem('key-2', 2);
                storage.setItem('key-3', 3);
                const initialLength = storage.length;

                storage.setItem('key-1', undefined);

                expect(storage.length).toBe(initialLength - 1);
            });

        });

    });

    describe('clear method', () => {

        it('should clear all items when there are any', () => {
            storage.setItem('key', 1);
            storage.clear();
            expect(storage.length).toBe(0);
        });

    });

});