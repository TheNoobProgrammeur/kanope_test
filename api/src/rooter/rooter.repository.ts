import {Model} from "mongoose";

import {MongooseService} from "../services/mongoose.service";

import {rooterSchema} from "./rooter.schema";
import {Rooter, UpdateRooter} from "./rooter.model";

export class RooterRepository {
    mongooseSingleton = MongooseService.getInstance();
    model: Model<Rooter>;
    public constructor() {
        this.model = this.mongooseSingleton.addModel("rooter", rooterSchema)
    }

    saveNewRooter = async (rooter: Rooter): Promise<void> => {
        const newSensor = new this.model({...rooter})
        newSensor.save((err) => {
            if (err)
                console.error("Error on rooter save", err.message);
        });
    }

    checkRooterByImei = async (imei: string): Promise<number> =>  this.model.countDocuments({imei: imei});

    checkSensorInSensorTable = async (imei: string, macAddress: string): Promise<number> => this.model.countDocuments({
        imei: imei,
        "sensorTable.macAddress": macAddress
    })

    addSensorInSensorTable = async (imei: string, macAddress: string, rssi: number) => {
        await this.model.updateOne({
            imei: imei
        },{
            $push: {
                sensorTable: {
                    macAddress: macAddress,
                    sensorHistoryTrace: [{
                        rssi: rssi
                    }]
                }
            }
        }).exec()
    }

    addSensorTrace = async (imei: string, macAddress: string, rssi: number) => {
        await this.model.updateOne({
            imei: imei,
            "sensorTable.macAddress": macAddress
        },{
            $push: {
                "sensorTable.$.sensorHistoryTrace": {
                    rssi: rssi
                }
            }
        })
    }

    updateNameRooter = async (updateInfos: UpdateRooter) => {
        await this.model.updateOne({
            imei: updateInfos.imei
        }, {
            name: updateInfos.newName
        })
    }

    findAll = async (): Promise<Rooter[]> =>  await this.model.find({}, {__v: 0}).exec();
}