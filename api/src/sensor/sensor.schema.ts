import { Schema } from 'mongoose';

import {DataStatement, Sensor} from "./sensor.model";

export const DataStatementSchema = new Schema<DataStatement>({
    date: {
        type: Date,
        default: Date.now
    },
    data: {
        tempOne: Number,
        tempTwo: Number,
        humidity: Number,
        airPressure: Number,
    }
})

export const SensorSchema = new Schema<Sensor>({
    name: {
        type:String,
        default: "UNDEFINED"
    },
    macAddress: String,
    dataStatements: {
        type: [DataStatementSchema],
        default: []
    }

})
