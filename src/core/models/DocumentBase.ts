import { IDocument } from '../interfaces/IDocument';
import { ObjectId } from '../types/ObjectId';
import { ObjectIdGenerator } from '../helpers/ObjectIdGenerator';

export class DocumentBase implements IDocument {
    public _id: ObjectId;

    constructor() {
        this._id = ObjectIdGenerator.generate();
    }
}
