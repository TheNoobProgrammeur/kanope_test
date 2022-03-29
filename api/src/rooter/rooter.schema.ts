import {Schema} from "mongoose";
import {Rooter, SensorHistoryTrace, Trace} from "./rooter.model";

export const traceSchema = new Schema<Trace>({
    time: {
        type: Date,
        default: Date.now
    },
    rssi: Number
})

export const sensorInfoSchema = new Schema<SensorHistoryTrace>({
    macAddress: {
      type: String,
      index: true,
    },
    sensorHistoryTrace: [traceSchema]
})

export const rooterSchema = new Schema<Rooter>({
    name: {
        type:String,
        default: "UNDEFINED"
    },
    imei: {
        type: String,
        required: true
    },
    sensorTable: {
        type: [sensorInfoSchema],
        default: []
    }
})