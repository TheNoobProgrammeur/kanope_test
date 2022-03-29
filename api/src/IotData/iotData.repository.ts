import {Model} from "mongoose";

import {MongooseService} from "../services/mongoose.service";

import {iotSchema} from "./iotData.schema";
import {IotData} from "./iotData.model";

export class IotDataRepository {
    mongooseSingleton = MongooseService.getInstance();
    model: Model<IotData>;
    public constructor() {
        this.model = this.mongooseSingleton.addModel("iotData", iotSchema)
    }
    public async save(data: IotData){
        const newIotData = new this.model({...data});
        newIotData.save((err) => {
            if (err) console.error("Error on IotData save", err.message);
        });
    }

    public async findAll(): Promise<IotData[]> {
        return await this.model.find({}, { __v: 0}).exec();
    }

}