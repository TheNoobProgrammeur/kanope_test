import {IotData} from "./iotData.model";
import {callbackProcessing, findAll} from "./iotData.service";

export class IotDataRoot {

    async find(): Promise<IotData[]> {
        return findAll()
    }

    async create (data: IotData): Promise<{message: string}> {
        await callbackProcessing(data)
        return {"message": "data save"};
    }
}