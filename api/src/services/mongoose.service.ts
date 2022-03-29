import {Model, Schema} from 'mongoose';

export class MongooseService {
    private static instance: MongooseService;
    private mongoose;

    private constructor() {
        this.mongoose = require('mongoose');
    }

    public static getInstance(): MongooseService {
        if (!MongooseService.instance) {
            MongooseService.instance = new MongooseService();
        }
        return MongooseService.instance;
    }

    public async connection() {
        await this.mongoose.connect('mongodb://localhost:27017/testKanope')
            .catch((error: any) => console.error(error));
    }

    public addModel(key: string, schema: Schema): Model<any> {
        return this.mongoose.model(key, schema)
    }
}