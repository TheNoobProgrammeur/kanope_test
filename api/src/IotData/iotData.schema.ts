import { Schema } from 'mongoose';
import {IotData} from "./iotData.model";

export const iotSchema = new Schema<IotData>({
    time: {
        type: Date,
        default: Date.now
    },
    imei: String,
    devices: {
        type: Map,
        of: {
            rssi: Number,
            data: String,
        }
    },
});
