import {Model} from "mongoose";

import {MongooseService} from "../services/mongoose.service";
import {DataDecoding} from "../IotData/iotData.model";

import {Sensor, UpdateSensor} from "./sensor.model";
import {SensorSchema} from "./sensor.schema";

export class SensorRepository {
    mongooseSingleton = MongooseService.getInstance();
    model: Model<Sensor>;
    public constructor() {
        this.model = this.mongooseSingleton.addModel("sensor", SensorSchema)
    }

    public async saveNewSensor(sensor: Sensor){
        const newSensor = new this.model({...sensor})
        await newSensor.save((err) => {
            if (err) console.error("Error on newSensor save", err.message);
        });
    }

    public async checkSensorByMacAddress(macAddress: string){
        return this.model.countDocuments({macAddress: macAddress})
    }

    public async addDataOnSensor(macAddress: string, data: DataDecoding){
        await this.model.updateOne(
            {
                macAddress: macAddress
            },
            {
                $push: {
                    dataStatements: {
                        data: {...data}
                    }
                }
            }).exec()
    }

    public async updateNameRooter(updateInfos: UpdateSensor){
        await this.model.updateOne({
            macAddress: updateInfos.macAddress
        }, {
            name: updateInfos.newName
        })
    }

    findAll = async (): Promise<Sensor[]> =>  await this.model.find({}, {__v: 0}).exec()

}