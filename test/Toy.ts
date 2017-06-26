import { DocumentBase } from '../src/core/models/DocumentBase';

export class Toy extends DocumentBase {
    public name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
}